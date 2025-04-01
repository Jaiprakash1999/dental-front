import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";

const useVerifyAadhaarOTP = ({
  setActiveState = () => {},
  aadhaarOTP,
  id,
  communicationNumber,
}) => {
  const [isAadhaarOTPverify, setIsAadhaarOTPverify] = useState(false);
  const [aadhaarOTPdata, setAadhaarOTPdata] = useState({});

  const onAadhaarOTPverify = async () => {
    setIsAadhaarOTPverify(true);
    try {
      const token = localStorage.getItem("authToken");
      const res = await axios.post(
        `/v2/danzo/abhaCreation/byAadhaar/setPrimaryMobileNumber`,
        {
          id: id,
          mobileNumber: communicationNumber,
          otp: aadhaarOTP.join(""),
        },
        {
          headers: {
            Authorization: token,
            "ngrok-skip-browser-warning": "hgs",
          },
        }
      );
      setAadhaarOTPdata(res.data);
      toast.success(res.data.message);
      if (res.data.changeMobile) {
        setActiveState("communication_otp_field");
      } else {
        // setActiveState("abha_card");
        setActiveState("create_abha_address");
      }
      console.log(res.data, "res otp");
    } catch (error) {
      console.error(error, "error");
      toast.error(error.response.data.message);
    }
    setIsAadhaarOTPverify(false);
  };
  return { onAadhaarOTPverify, isAadhaarOTPverify, aadhaarOTPdata };
};

export default useVerifyAadhaarOTP;
