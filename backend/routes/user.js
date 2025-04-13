import express from 'express';
import {login, sendOTP, signup} from '../controllers/user.js';

const userRouter=express.Router();


userRouter.post("/signup",signup);

userRouter.post("/sendotp",sendOTP);
userRouter.post("/login",login);

export default userRouter;