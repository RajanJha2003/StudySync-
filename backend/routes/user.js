import express from 'express';
import {sendOTP, signup} from '../controllers/user.js';

const userRouter=express.Router();


userRouter.post("/signup",signup);

userRouter.post("/sendotp",sendOTP)

export default userRouter;