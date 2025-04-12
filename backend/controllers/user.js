import otpTemplate from "../mail/emailVerification.js";
import OTP from "../model/otp.js";
import Profile from "../model/profile.js";
import User from "../model/user.js";
import bcrypt from "bcrypt";
import otpGenerator from "otp-generator";
import mailSender from "../utils/mailSender.js";

const sendOTP = async (req, res) => {
  try {
    const { email } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already registered",
      });
    }

    const otp=otpGenerator.generate(6,{
        upperCaseAlphabets:false,
        lowerCaseAlphabets:false,
        specialChars:false
    })

    const name = email.split('@')[0].split('.').map(part => part.replace(/\d+/g, '')).join(' ');
    console.log(name);

   
    await mailSender(email, 'OTP Verification Email', otpTemplate(otp, name));


    const otpBody = await OTP.create({ email, otp });




    res.status(200).json({
        success: true,
        otp,
        message: 'Otp sent successfully'
    });
}

catch (error) {
    console.log('Error while generating Otp - ', error);
    res.status(200).json({
        success: false,
        message: 'Error while generating Otp',
        error: error.mesage
    });
}
}

const signup = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      accountType,
      contactNumber,
      otp,
    } = req.body;
    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !confirmPassword ||
      !accountType ||
      !otp
    ) {
      return res.status(401).json({
        success: false,
        message: "All fields are required..!",
      });
    }

    if (password != confirmPassword) {
      return res.status(400).json({
        success: false,
        message:
          "Password and confirm password did not match , please try again",
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User registered already, please login",
      });
    }

    const recentOTP = await OTP.findOne({ email })
      .sort({ createdAt: -1 })
      .limit(1);

    if (!recentOTP || recentOTP.length == 0) {
      return res.status(400).json({
        success: false,
        message: "OTP not found in DB,please try again",
      });
    } else if (otp != recentOTP.otp) {
      return res.status(400).json({
        success: false,
        message: "Invalid otp",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const profileDetails = await Profile.create({
      gender: null,
      dateOfBirth: null,
      about: null,
      contactNumber: null,
    });

    let approved = "";
    approved === "Instructor" ? (approved = false) : (approved = true);

    const userData = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      contactNumber,
      accountType: accountType,
      approved: approved,
      additionalDetails: profileDetails._id,
      image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
    });

    res.status(200).json({
      success: true,
      userData,
      message: "User Registered Successfully",
    });
  } catch (error) {
    console.log("Error while registering user (signup)");
    console.log(error);
    res.status(401).json({
      success: false,
      error: error.message,
      messgae: "User cannot be registered , Please try again..!",
    });
  }
};

export { signup, sendOTP };
