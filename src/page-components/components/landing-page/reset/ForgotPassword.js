import React, { useState } from "react";
import parchaaLogo from "../../../../images/parchaa.svg";
import useForgotPassword from "./hooks/useForgotPassword";

const ForgotPassword = ({
  setIsLogin = () => {},
  setIsResetPassword = () => {},
}) => {
  const [formData, setFormData] = useState({ email: "" });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   console.log(formData, "formadata");
  //   setIsLogin(false);
  //   setIsResetPassword(true);
  // };

  const { isForgotPasswordLoading, forgotError, onForgotPassword } =
    useForgotPassword({ formData, setIsLogin, setIsResetPassword });

  // const userDetails = {
  //   emailError: "",
  //   passwordError: "",
  // };

  const userDetails = forgotError;
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
          Don't worry! Fill in your email and we'll send you a otp to reset your
          password.
        </div>
      </div>
      <form onSubmit={(e) => onForgotPassword(e)}>
        <div className="my-4">
          <label className="text-[#111928] text-sm font-medium">
            Your email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Enter your email"
            required
            className={
              userDetails.emailError !== ""
                ? "w-full text-sm font-normal text-[#C81E1E] p-2.5 bg-[#FDF2F2] border border-[#F05252] rounded-lg mt-1 focus:outline-none"
                : "w-full text-sm font-normal p-2.5 border rounded-lg mt-1 focus:outline-none focus:border-[#2D2E33]"
            }
          />
          {userDetails?.emailError !== "" && (
            <p className="text-[#E02424] font-normal text-sm">
              Username doesn't exist.
            </p>
          )}
        </div>
        <div className="flex justify-end item-center">
          <div className="flex items-center justify-center">
            <button
              className="hover:underline text-[#1A56DB] text-sm font-medium"
              type="button"
              // onClick={forgotPassword}
              // disabled={isForgotPasswordLoading}
            >
              Resend email
              {/* {isForgotPasswordLoading ? "Loading..." : "Forgot password?"} */}
            </button>
          </div>
        </div>

        <button
          disabled={isForgotPasswordLoading}
          type="submit"
          className="disabled:bg-gray-500 bg-[#1A56DB] text-sm text-white w-full rounded-lg p-2 my-4"
        >
          {/* {isLoginAPILoading ? "Loading..." : "Login"} */}
          Send Email
        </button>
      </form>
      <button
        onClick={() => {
          setIsLogin(true);
          setIsResetPassword(false);
        }}
        disabled={isForgotPasswordLoading}
        type="button"
        className="disabled:bg-gray-500 bg-[#E5E7EB] text-sm text-[#1F2A37] w-full rounded-lg p-2"
      >
        {/* {isLoginAPILoading ? "Loading..." : "Login"} */}
        Back to Login
      </button>
    </div>
  );
};

export default ForgotPassword;
