
import mongoose from "mongoose";

const otpSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    otp:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now(),
        expires:5*60  // the otp will automatically delete after 5 minutes of creation
    }
})




const OTP=mongoose.model("OTP",otpSchema);

export default OTP;