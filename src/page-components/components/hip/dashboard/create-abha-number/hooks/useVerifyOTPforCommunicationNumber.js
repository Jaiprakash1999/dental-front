import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";

const useVerifyOTPforCommunicationNumber = ({ setActiveState }) => {
  const [isCommunicationOTPverify, setIsCommunicationOTPverify] =
    useState(false);
  const [verifyCommunicationData, setVerifyCommunicationData] = useState({});

  const onCommunicationOTPverify = async (aadhaarId, communicationOTP) => {
    setIsCommunicationOTPverify(true);

    try {
      const token = localStorage.getItem("authToken");
      const res = await axios.post(
        `/v2/danzo/abhaCreation/byAadhaar/verifyAbdmOtp`,
        { id: aadhaarId, otp: communicationOTP.join("") },
        {
          headers: {
            Authorization: token,
            "ngrok-skip-browser-warning": "hgs",
          },
        }
      );
      setVerifyCommunicationData(res.data);
      toast.success("OTP Verified successfully");
      // setActiveState("abha_card");
      setActiveState("create_abha_address");
    } catch (error) {
      console.log(error, "error");
      toast.error(error.response.data.message);
    }
    setIsCommunicationOTPverify(false);
  };

  return {
    isCommunicationOTPverify,
    onCommunicationOTPverify,
    verifyCommunicationData,
  };
};

export default useVerifyOTPforCommunicationNumber;
