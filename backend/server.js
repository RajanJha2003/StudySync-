import express from "express";
import dotenv from "dotenv";
import connectDb from "./config/database.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

connectDb();

// Default Route
app.get('/', (req, res) => {
    // console.log('Your server is up and running..!');
    res.send(`<div>
    This is Default Route  
    <p>Everything is OK</p>
    </div>`);
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
