import React, { useState } from "react";
import Home from "./home/Home";
import Login from "./login/Login";

const LandingPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isResetPassword, setIsResetPassword] = useState(false);

  return (
    <div>
      <div className="sm:flex m-6 sm:m-0 h-screen">
        <div className="flex sm:w-3/5 justify-center items-center">
          <Home />
        </div>
        <div className="flex sm:w-2/5 justify-center items-center">
          {isLogin && !isResetPassword && (
            <Login
              setIsLogin={setIsLogin}
              setIsResetPassword={setIsResetPassword}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
