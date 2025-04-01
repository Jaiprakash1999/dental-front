import React, { useState } from "react";
import telananaLogo from "../../../../images/telanagana.svg";
import "react-toastify/dist/ReactToastify.css";
import useLogin from "./hooks/useLogin";
import { ToastContainer } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";

const Login = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const { handleSubmit, isLoginLoading } = useLogin({ formData });

  const userDetails = {
    emailError: "",
    passwordError: "",
  };

  const isFormValid = () => {
    return Object.values(formData).every((value) => value !== "");
  };

  return (
    <div className="sm:w-8/12 w-full">
      <ToastContainer />
      <div className="flex justify-center mb-8">
        <img src={telananaLogo} alt="telananaLogo" />
      </div>
      <div className="mt-8">
        <div className="text-[#111928] font-medium text-3xl">
          {t("Welcome back")}
        </div>
        <div className="text-[#6B7280] font-normal text-base">
          {t("Sign in with your username and password.")}
        </div>
      </div>
      <form>
        <div className="my-4">
          <label className="text-[#111928] text-sm font-medium">
            {t("Enter your username")}
          </label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            placeholder={t("Enter your username")}
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
        <div className="my-4 relative flex flex-col">
          <label className="text-[#111928] text-sm font-medium">
            {t("Enter your password")}
          </label>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            placeholder={t("Enter your password")}
            className={
              userDetails.passwordError !== ""
                ? "w-full text-sm font-normal text-[#C81E1E] p-2.5 bg-[#FDF2F2] border border-[#F05252] rounded-lg mt-1 focus:outline-none"
                : "w-full text-sm font-normal p-2.5 border rounded-lg mt-1 focus:outline-none focus:border-[#2D2E33]"
            }
          />
          <button
            onClick={(e) => {
              e.preventDefault();
              setShowPassword((prev) => !prev);
            }}
            className={`px-2 absolute ${
              showPassword ? "top-8" : "top-8"
            } right-0`}
          >
            <FontAwesomeIcon
              color="#6B7280"
              icon={showPassword ? faEye : faEyeSlash}
            />
          </button>
          {userDetails?.passwordError !== "" && (
            <p className="text-[#E02424] font-normal text-sm">
              Incorrect password
            </p>
          )}
        </div>
        {/* <div className="flex justify-between item-center">
          <div className="flex item-center gap-1">
            <div>
              <input type="checkbox" />
            </div>
            <button
              onClick={(e) => e.preventDefault()}
              className="text-[#6B7280] text-sm font-normal"
            >
              {t("Remember this device")}
            </button>
          </div>
          <div className="flex items-center justify-center">
            <button
              className="hover:underline text-[#1A56DB] text-sm font-medium"
              type="button"
              onClick={() => {
                setIsLogin(false);
                setIsResetPassword(false);
              }}
              onClick={forgotPassword}
              disabled={isForgotPasswordLoading}
            >
              {isForgotPasswordLoading
                ? t("Loading...")
                : t("Forgot password?")}
            </button>
          </div>
        </div> */}

        <button
          onClick={(e) => handleSubmit(e)}
          disabled={isLoginLoading || !isFormValid()}
          type="submit"
          className="disabled:bg-gray-500 bg-[#1A56DB] text-sm text-white w-full rounded-lg p-2 my-4"
        >
          {isLoginLoading ? "Loading..." : `${t("Login to your account")}`}
        </button>
      </form>
    </div>
  );
};

export default Login;
