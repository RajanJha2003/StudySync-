import {toast} from 'react-hot-toast'
import { apiConnector } from '../apiConnector';
import { endpoints } from '../apis';
import { setLoading } from '../../slices/authSlice';

const {
    SENDOTP_API,
    SIGNUP_API,
    LOGIN_API,
    RESETPASSTOKEN_API,
    RESETPASSWORD_API,
  } = endpoints;



  export function sendOTP(email, navigate) {
    return async (dispatch) => {
  
      const toastId = toast.loading("Loading...");
      dispatch(setLoading(true));
  
      try {
        const response = await apiConnector("POST", SENDOTP_API, {
          email,
          checkUserPresent: true,
        })
        // console.log("SENDOTP API RESPONSE ---> ", response)
  
        // console.log(response.data.success)
        if (!response.data.success) {
          throw new Error(response.data.message);
        }
  
        navigate("/verify-email");
        toast.success("OTP Sent Successfully");
      } catch (error) {
        console.log("SENDOTP API ERROR --> ", error);
        const errorMessage =
          error.response?.data?.message || error.message || "Could not send OTP";
        toast.error(errorMessage);
      }
      
      dispatch(setLoading(false));
      toast.dismiss(toastId);
    }
  }


  export function signUp(accountType, firstName, lastName, email, password, confirmPassword, navigate) {
    return async (dispatch) => {
  
      const toastId = toast.loading("Loading...");
      dispatch(setLoading(true));
      try {
        const response = await apiConnector("POST", SIGNUP_API, {
          accountType,
          firstName,
          lastName,
          email,
          password,
          confirmPassword,
          
        })
  
        // console.log("SIGNUP API RESPONSE --> ", response);
        if (!response.data.success) {
          toast.error(response.data.message);
          throw new Error(response.data.message);
        }
  
        toast.success("Signup Successful");
        navigate("/login");
      } catch (error) {
        console.log("SIGNUP API ERROR --> ", error);
        // toast.error(error.response.data.message);
        toast.error("Invalid OTP");
        // navigate("/signup")
      }
      dispatch(setLoading(false))
      toast.dismiss(toastId)
    }
  }