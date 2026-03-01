import express from "express";
const router = express.Router();
import User from "../models/User.js";
import registrationValidator from "../validations/userRegistration.js";
import securePassword from "../utils/securePassword.js";
import sendMail from "../utils/sendEmail.js";
import signinValidator from "../validations/userSignin.js";
import matchPassword from "../utils/matchPassword.js";

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

    const { name, email, password } = value;

    const isEmailExist = await User.findOne({ email });
    if (isEmailExist) {
      return res
        .status(409)
        .json({ success: false, msg: "Email already registered" });
    }

    const securePass = await securePassword(password);
    const user = new User({
      name,
      email,
      password: securePass,
    });

    const savedUserData = await user.save();
    //send verification mail to registered user
    try {
      await sendMail({ name, email, userId: savedUserData._id });
    } catch (error) {
      console.error("Mail failed");
    }

    return res.status(201).json({
      success: true,
      msg: "User registered successfully! Check your email for verification link !",
      data: savedUserData,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      msg: "Internal server error",
    });
  }
});

//2--> verify email at : GET /api/auth/verify-mail

router.get("/verify-mail", async (req, res) => {
  try {
    const { id } = req.query;
    //user Id misisng
    if (!id) {
      return res.status(400).json({
        success: false,
        msg: "Invalid or missing user ID!",
      });
    }

    //id inavlid
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        msg: "Invalid user !",
      });
    }
    //case : already verified mail
    if (user.isVerified) {
      return res.status(200).json({
        success: true,
        msg: "Email already verified !",
      });
    }
    //success: update isVerified to true

    user.isVerified = true;
    await user.save();

    return res.status(200).json({
      success: true,
      msg: "Email verified successfully !",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      msg: "Internal server error",
    });
  }
});

//3-> signin route at : POST /api/auth/signin

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

    const { email, password } = value;

    const userData = await User.findOne({ email });

    //case: email is wrong ie not registered email
    if (!userData) {
      return res.status(401).json({
        success: false,
        msg: "Invalid email or password",
      });
    }

    // password match

    const isMatch = await matchPassword({
      enteredPassword: password,
      actualPassword: userData.password,
    });

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        msg: "Invalid email or password",
      });
    }

    //case : email and password are correct but not verified email
    if (!userData.isVerified) {
      return res.status(403).json({
        success: false,
        msg: "Please verify your email account first then login",
      });
    }

    //success case : email and password are correct and verified email

    req.session.user_id = userData._id; //session created

    return res.status(200).json({
      success: true,
      msg: "User logged in successfully !",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      msg: "Internal server error",
    });
  }
});

export default router;
