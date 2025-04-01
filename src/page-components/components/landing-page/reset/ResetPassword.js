import React, { useState } from "react";
import parchaaLogo from "../../../../images/parchaa.svg";
import useResetPassword from "./hooks/useResetPassword";

const ResetPassword = ({
  setIsLogin = () => {},
  setIsResetPassword = () => {},
}) => {
  const [formData, setFormData] = useState({ otp: "", password: "" });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const { isResetLoading, onReset } = useResetPassword({
    formData,
    setIsLogin,
    setIsResetPassword,
  });
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   console.log(formData, "formadata");
  //   setIsLogin(true);
  //   setIsResetPassword(false);
  // };

  const userDetails = {
    otpError: "",
    passwordError: "",
  };

  return (
    <div className="sm:w-8/12 w-full">
      <div className="flex mb-8">
        <img src={parchaaLogo} alt="parchaaLogo" />
        <span className="text-[#4B6AF5] flex items-end">Parchaa</span>
      </div>
      <div className="mt-8">
        <div className="text-[#111928] font-medium text-3xl">
          Reset Password
        </div>
        <div className="text-[#6B7280] font-normal text-base">
          OTP sent in your email. Please Fill the correct OTP and a new password
          to reset your password.
        </div>
      </div>
      <form onSubmit={(e) => onReset(e)}>
        <div className="my-4">
          <label className="text-[#111928] text-sm font-medium">Your OTP</label>
          <input
            type="otp"
            name="otp"
            value={formData.otp}
            onChange={handleInputChange}
            placeholder="Enter your otp"
            required
            className={
              userDetails.otpError !== ""
                ? "w-full text-sm font-normal text-[#C81E1E] p-2.5 bg-[#FDF2F2] border border-[#F05252] rounded-lg mt-1 focus:outline-none"
                : "w-full text-sm font-normal p-2.5 border rounded-lg mt-1 focus:outline-none focus:border-[#2D2E33]"
            }
          />
          {userDetails?.otpError !== "" && (
            <p className="text-[#E02424] font-normal text-sm">
              Username doesn't exist.
            </p>
          )}
        </div>

        <div className="my-4 flex flex-col">
          <label className="text-[#111928] text-sm font-medium">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            placeholder="Enter your password"
            required
            className={
              userDetails.passwordError !== ""
                ? "w-full text-sm font-normal text-[#C81E1E] p-2.5 bg-[#FDF2F2] border border-[#F05252] rounded-lg mt-1 focus:outline-none"
                : "w-full text-sm font-normal p-2.5 border rounded-lg mt-1 focus:outline-none focus:border-[#2D2E33]"
            }
          />
          {userDetails?.passwordError !== "" && (
            <p className="text-[#E02424] font-normal text-sm">
              Incorrect password
            </p>
          )}
        </div>

        <div className="my-4 flex flex-col">
          <label className="text-[#111928] text-sm font-medium">
            Confirm Password
          </label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.password}
            onChange={handleInputChange}
            placeholder="Re Enter your password"
            required
            className={
              userDetails.passwordError !== ""
                ? "w-full text-sm font-normal text-[#C81E1E] p-2.5 bg-[#FDF2F2] border border-[#F05252] rounded-lg mt-1 focus:outline-none"
                : "w-full text-sm font-normal p-2.5 border rounded-lg mt-1 focus:outline-none focus:border-[#2D2E33]"
            }
          />
          {userDetails?.passwordError !== "" && (
            <p className="text-[#E02424] font-normal text-sm">
              Incorrect password
            </p>
          )}
        </div>

        <button
          disabled={isResetLoading}
          type="submit"
          className="disabled:bg-gray-500 bg-[#1A56DB] text-sm text-white w-full rounded-lg p-2 mb-4"
        >
          {isResetLoading ? "Loading..." : "Reset Password"}
        </button>
      </form>
      <button
        onClick={() => {
          setIsLogin(false);
          setIsResetPassword(false);
        }}
        disabled={isResetLoading}
        type="button"
        className="disabled:bg-gray-500 bg-[#E5E7EB] text-sm text-[#1F2A37] w-full rounded-lg p-2"
      >
        {/* {isLoginAPILoading ? "Loading..." : "Login"} */}
        Go Back
      </button>
    </div>
  );
};

export default ResetPassword;
