import express from "express";
const router = express.Router();
import User from "../models/User.js";
import registrationValidator from "../validations/userRegistration.js";
import securePassword from "../utils/securePassword.js";
import sendMail from "../utils/sendEmail.js";

// 1-> signup route at : POST /api/auth/signup
router.post("/signup", async (req, res) => {
  try {
    const { error, value } = registrationValidator.validate(req.body);

    if (error) {
      return res.status(400).json({
        success: false,
        msg: "Validation failed",
        details: error.details,
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
    sendMail({ name, email, userId: savedUserData._id });
    return res.status(201).json({
      success: true,
      msg: "User registered successfully! Check your email for verification link !",
      data: savedUserData,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      msg: "Registration error",
      error: error.message,
    });
  }
});

//2--> verify email at : PATCH /api/auth/verify-mail

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
    const isUserExist = await User.findById(id);

    if (!isUserExist) {
      return res.status(500).json({
        success: false,
        msg: "Invalid user !",
      });
    }
    //case : already verified mail
    if (isUserExist.isVerified) {
      return res.status(200).json({
        success: true,
        msg: "Email already verified !",
      });
    }
    //success: update isVerified to true
    const verifiedUser = await User.findByIdAndUpdate(
      id,
      { isVerified: true },
      { returnDocument: "after" },
    );

    return res.status(200).json({
      success: true,
      msg: "Email verified successfully !",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      msg: "Verification error",
      error,
    });
  }
});

export default router;
