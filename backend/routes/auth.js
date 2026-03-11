import express from "express";
const router = express.Router();
import User from "../models/User.js";
import registrationValidator from "../validations/userRegistration.js";
import securePassword from "../utils/securePassword.js";
import sendOtp from "../utils/sendOtp.js";
import signinValidator from "../validations/userSignin.js";
import matchPassword from "../utils/matchPassword.js";

// 0-> To check session
router.get("/me", async (req, res) => {
  if(req.session.user_id){
    try{
      const user = await User.findById(req.session.user_id).select("-password");
      return res.json({
        user:{
          name:user.name,
          email:user.email,
        }
      });
    }catch(error){
      return res.json({ user: null });
    }
  }
  return res.json({ user: null });
});

// 1-> signup route at : POST /api/auth/signup
router.post("/signup", async (req, res) => {
  try {
    const { error, value } = registrationValidator.validate(req.body);

    if (error) {
      return res.status(400).json({
        success: false,
        msg: "Registration Validation failed",
        error: error.details[0].message,
      });
    }

    const { name, email, password ,phoneNumber} = value;

    const isEmailExist = await User.findOne({ email });
    if (isEmailExist) {
      return res
        .status(409)
        .json({ success: false, msg: "Email already registered" });
    }

    const isPhoneExist=await User.findOne({phoneNumber});
    if(isPhoneExist){
      return res.status(409)
      .json({success:false,msg:"Phone number already registered"})
    } 

    const securePass = await securePassword(password);
    const user = new User({
      name,
      email,
      password: securePass,
      phoneNumber,
    });

    await user.save();


    return res.status(201).json({
      success: true,
      msg: "User registered successfully!",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      msg: "Internal server error",
    });
  }
});


//2-> signin route at : POST /api/auth/signin

router.post("/signin", async (req, res) => {
  try {
    //client input validation
    const { error, value } = signinValidator.validate(req.body);

    if (error) {
      return res.status(400).json({
        success: false,
        msg: "Login validation failed",
        error: error.details[0].message,
      });
    }

    const { email, password,phoneNumber } = value;

    if(phoneNumber!==process.env.VERIFIED_PHONE_NUMBER){//this is personal number for testing
      return res.status(422).json({
        success:false,
        msg:"OTP verification is not available for free tier users"
      })
    }
    const userData = await User.findOne({ email });
    
    //case: email is wrong ie not registered email
    if (!userData) {
      return res.status(422).json({
        success: false,
        msg: "Invalid email or password",
      });
    }


    //case : phone number not registered

    if(userData.phoneNumber!==phoneNumber){
      return res.status(422)
      .json({success:false,msg:"Phone number is not registered with this user!"})
    }
    

    // password match

    const isMatch = await matchPassword({
      enteredPassword: password,
      actualPassword: userData.password,
    });

    if (!isMatch) {
      return res.status(422).json({
        success: false,
        msg: "Invalid email or password",
      });
    }


    //case : user entered all details correctly and now send otp
    const otp=await sendOtp({phoneNumber});


    //creat user session
    req.session.user_id=userData._id;
    
    //create otp session
    req.session.otp=otp;
    req.session.otpExpiry=Date.now()+1000*60*2;//2 min


    return res.status(200).json({
      success: true,
      msg: "OTP sent successfully to your entered phone number!",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      msg: "Internal server error",
    });
  }
});

//3--> verify otp at : GET /api/auth/verify-otp


router.post("/verify-otp", async (req, res) => {
  try {
  
    const {otp }=req.body;
  

    const userId=req.session.user_id;

    if (!userId) {
      return res.status(400).json({
        success: false,
        msg: "Session expired. Please login again."
      });
    }


    ///case : entered otp is wrong
    if(otp!==req.session.otp){
      return res.status(422).json({
        success:false,
        msg:"Invalid OTP"
      })
    }

    //case: expired otp
    const currTime=Date.now();
    if(currTime > req.session.otpExpiry){
      return res.status(422).json({
        success:false,
        msg:"OTP expired"
      })
    }

    //success case : entered otp is correct and not expired
    const userData=await User.findById(userId);

    await userData.save();

  
    req.session.otp=null;
    req.session.otpExpiry=null;

    req.session.user_id=userId;//restart session when user is verified


    return res.status(200).json({
      success:true,
      msg:"User verified successfully!",
      user: {
        name: userData.name,
        email: userData.email,
        _id: userData._id
      }
    })



  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success:false,
      msg:"Internal server error"
    })
  }
});




//6->  logout user at : POST /api/logout
router.post("/logout", async (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(500).json({ success: false });
    res.clearCookie("connect.sid");
    return res.json({ success: true });
  });
});


export default router;
