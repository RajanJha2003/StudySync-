
import mongoose from "mongoose";
import mailSender from "../utils/mailSender.js";

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


async function sendVerificationEmail(email,otp){
    try {
        const mailResponse=mailSender(email,"Verification Email from StudySync",otp);
        console.log("Email sent successfully")
    } catch (error) {
        console.log(`Error occured while sending mail:`,error);
        throw error;
        
    }
}

otpSchema.pre('save', async function(next) {
    if (this.isNew) {
        try {
            await sendVerificationEmail(this.email, this.otp);
            console.log("Email sent successfully");
        } catch (error) {
            console.log(`Error occurred while sending mail:`, error);
            throw error;
        }
    }
    next();
});


const OTP=mongoose.model("OTP",otpSchema);

export default OTP;