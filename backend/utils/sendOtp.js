import twilioClient from "../config/twilioClient.js";
import otpGenerator from "./generateOtp.js";


const sendOtp=async({phoneNumber})=>{
    try {
    
    const otp=otpGenerator();

    await twilioClient.messages.create({
        from:process.env.TWILIO_PHONE_NUMBER,
        to:phoneNumber,
        body:`Your OTP is ${otp}`,
    })
    
    return otp;

    } catch (error) {
        console.log(error);
        throw error;
    }
}

export default sendOtp;