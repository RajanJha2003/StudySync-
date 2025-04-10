import mongoose from "mongoose";


const profileSchema=new mongoose.Schema({
    gender:{
        type:String
    },
    dateOfBirth:{
        type:String
    },
    about:{
        tyoe:string
    },
    contactNumber:{
        type:Number
    }
})

const Profile=mongoose.model("Profile",profileSchema);


export default Profile;