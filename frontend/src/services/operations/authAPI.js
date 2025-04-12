import {toast} from 'react-hot-toast'
import { apiConnector } from '../apiConnector';
import { endpoints } from '../apis';

const {
    SENDOTP_API,
    SIGNUP_API,
    LOGIN_API,
    RESETPASSTOKEN_API,
    RESETPASSWORD_API,
  } = endpoints;



export function sendOTP(email,navigate){
    return async(dispatch)=>{
       const toastId=toast.loading("Loading...");
       dispatch(setLoading(true));

       try {
        const response=await apiConnector("POST",SENDOTP_API,{
            email,
            checkUserPresent:true,
        })

        if(!response.data.success){
            throw new Error(response.data.message)
        }

        navigate("/verify-email");
        toast.success("OTP sent successfully");
       } catch (error) {
        console.log("SENDOTP API ERROR............",error);
        toast.error("Could not send OTP");
        
       }
       dispatch(setLoading(false));
       toast.dismiss(toastId);
       
    }



}