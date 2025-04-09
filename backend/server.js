import express from "express";
import dotenv from "dotenv";
import connectDb from "./config/database.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

connectDb();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
