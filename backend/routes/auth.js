import express from "express";
const router = express.Router();
import User from "../models/User.js";
import registrationValidator from "../validations/userRegistration.js";
import securePassword from "../utils/securePassword.js";

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

    return res.status(201).json({
      success: true,
      msg: "User registered successfully!",
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

export default router;
