import React, { useState } from "react";
import { ACCOUNT_TYPE } from "../../../utils/constants";
import Tab from "../../common/Tab";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { setSignUpData } from "../../../slices/authSlice";
import { sendOTP } from "../../../services/operations/authAPI";
const SignupForm = () => {
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const [accountType, setAccountType] = useState(ACCOUNT_TYPE.STUDENT);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { firstName, lastName, email, password, confirmPassword } = formData;

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));

    // console.log('signup form data - ', formData);
  };

  const tabData = [
    {
      id: 1,
      tabName: "Student",
      type: ACCOUNT_TYPE.STUDENT,
    },
    {
      id: 2,
      tabName: "Instructor",
      type: ACCOUNT_TYPE.INSTRUCTOR,
    },
  ];

  const handleSubmit=(e)=>{
    e.preventDefault();
    if(password!==confirmPassword){
      toast.error('Passwords do not match');
      return;
    }

    const signupData={
      ...formData,
      accountType
    }


    dispatch(setSignUpData(signupData));
    dispatch(sendOTP(formData.email,navigate));


    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    });

    setAccountType(ACCOUNT_TYPE.STUDENT);




  }
  return (
    <div>
      <Tab tabData={tabData} field={accountType} setField={setAccountType} />

      <form onSubmit={handleSubmit} className="flex w-full flex-col gap-y-4">
        <div className="flex gap-x-4">
          <label>
            <p className="mb-1 text-[0.875rem] text-richblack-5 leading-[1.375rem] ">
              First Name <sup className="text-pink-200">*</sup>
            </p>
            <input
              style={{
                boxShadow: "inset 0px -1px 0px rgba(255,255,255,0.18)",
              }}
              onChange={handleOnChange}
              className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5 outline-none"
              type="text"
              name="firstName"
              value={firstName}
              placeholder="Enter first name"
            />
          </label>
          <label>
            <p className="mb-1 text-[0.875rem] text-richblack-5 leading-[1.375rem] ">
              Last Name <sup className="text-pink-200">*</sup>
            </p>
            <input
              style={{
                boxShadow: "inset 0px -1px 0px rgba(255,255,255,0.18)",
              }}
              onChange={handleOnChange}
              className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5 outline-none"
              type="text"
              name="lastName"
              value={lastName}
              placeholder="Enter last name"
            />
          </label>
        </div>

        <label>
            <p className="mb-1 text-[0.875rem] text-richblack-5 leading-[1.375rem] ">
              Email Address <sup className="text-pink-200">*</sup>
            </p>
            <input
              style={{
                boxShadow: "inset 0px -1px 0px rgba(255,255,255,0.18)",
              }}
              onChange={handleOnChange}
              className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5 outline-none"
              type="text"
              name="email"
              value={email}
              placeholder="Enter email address"
            />
          </label>

          <div className="flex gap-x-4">
          {/* Create Password */}
          <label className="relative">
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
              Create Password <sup className="text-pink-200">*</sup>
            </p>
            <input
              required
              type={showPassword ? "text" : "password"}
              name="password"
              value={password}
              onChange={handleOnChange}
              placeholder="Enter Password"
              style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
              className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] pr-10 text-richblack-5 outline-none"
            />
            <span
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-[38px] z-[10] cursor-pointer"
            >
              {showPassword ? (
                <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
              ) : (
                <AiOutlineEye fontSize={24} fill="#AFB2BF" />
              )}
            </span>
          </label>

          {/* Confirm Password  */}
          <label className="relative">
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
              Confirm Password <sup className="text-pink-200">*</sup>
            </p>
            <input
              required
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={confirmPassword}
              onChange={handleOnChange}
              placeholder="Confirm Password"
              style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
              className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] pr-10 text-richblack-5 outline-none"
            />
            <span
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              className="absolute right-3 top-[38px] z-[10] cursor-pointer"
            >
              {showConfirmPassword ? (
                <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
              ) : (
                <AiOutlineEye fontSize={24} fill="#AFB2BF" />
              )}
            </span>
          </label>
        </div>


        <button
          type="submit"
          className="mt-6 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-medium text-richblack-900"
        >
          Create Account
        </button>
      </form>
    </div>
  );
};

export default SignupForm;
