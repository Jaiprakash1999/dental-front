import React, { useRef } from "react";

const OtpInput = ({ otp, setOtp = () => {} }) => {
  const inputRef = useRef(null);

  const handleInputChange = (index, value) => {
    if (!isNaN(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (index < otp.length - 1) {
        inputRef.current.childNodes[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && index > 0 && !otp[index]) {
      inputRef.current.childNodes[index - 1].focus();
    }
  };

  return (
    <div className="flex items-center">
      <div ref={inputRef} className="flex">
        {otp.map((value, index) => (
          <input
            key={index}
            type="text"
            className="border focus:outline-none focus:border-[#2D2E33] rounded mx-1 first:ms-0 w-10 h-10 text-center"
            maxLength={1}
            value={value}
            onChange={(e) => handleInputChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(e, index)}
          />
        ))}
      </div>
    </div>
  );
};

export default OtpInput;
