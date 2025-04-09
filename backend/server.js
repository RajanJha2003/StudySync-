import express from "express";
import dotenv from "dotenv";
import connectDb from "./config/database.js";
import userRouter from "./routes/user.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

connectDb();


app.use("/api/v1/auth",userRouter)

app.get('/', (req, res) => {
    
    res.send(`<div>
    This is Default Route  
    <p>Everything is OK</p>
    </div>`);
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
