import Profile from "../model/profile.js";
import User from "../model/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// ======================== signup Controller ========================
const signup = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      accountType
    } = req.body;

    // Validation: Check if all fields are provided
    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !confirmPassword ||
      !accountType
    ) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required'
      });
    }

    // Password match check
    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: 'Password and Confirm Password do not match'
      });
    }

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User already registered. Please login.'
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create profile (without contactNumber)
    const profileDetails = await Profile.create({
      gender: null,
      dateOfBirth: null,
      about: null,
      contactNumber: null
    });

    // Determine approval status (Instructors need approval)
    const approved = accountType === "Instructor" ? false : true;

    // Create user
    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      accountType,
      additionalDetails: profileDetails._id,
      approved,
      image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`
    });

    res.status(200).json({
      success: true,
      message: 'User registered successfully'
    });
  } catch (error) {
    console.log('Error while registering user (signup):', error);
    res.status(500).json({
      success: false,
      message: 'User could not be registered. Please try again.',
      error: error.message
    });
  }
};

// ======================== sendOTP Controller ========================
const sendOTP = async (req, res) => {
  return res.status(410).json({
    success: false,
    message: 'OTP functionality has been removed.'
  });
};

const login=async(req,res)=>{
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).json({
          success: false,
          message: "All fields are required",
        });
      }

      let user=await User.findOne({email}).populate("additionalDetails");
      if(!user){
        return res.status(401).json({
          success:false,
          message:"User not exists"
        })
      }

      const isMatch=await bcrypt.compare(password,user.password);
      if(!isMatch){
        return res.status(401).json({
          success:false,
          messsage:"Password incorrect"
        })
      }

      const payload = { email: user.email, id: user._id, accountType: user.accountType };
      const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "24h" });

      user = user.toObject();
      user.password=undefined;
      user.token = token;
  
      // Set cookie
      res.cookie("token", token, {
        httpOnly: true,
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      });
  
      return res.status(200).json({ success: true, user, token, message: "Login successful" });

    } catch (error) {
      console.log('Error while Login user');
        console.log(error);
        res.status(500).json({
            success: false,
            error: error.message,
            messgae: 'Error while Login user'
        })
      
    }
}

export { signup, sendOTP,login };
