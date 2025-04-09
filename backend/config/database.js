import mongoose from "mongoose";

const connectDb=async()=>{
    mongoose.connect(process.env.MONGO_URI).then(()=>{
        console.log("Database connected");
    }).catch((error)=>{
        console.log(`Error while connecting server with Database`);
        console.log(error);
        process.exit(1);

    })
}

export default connectDb;