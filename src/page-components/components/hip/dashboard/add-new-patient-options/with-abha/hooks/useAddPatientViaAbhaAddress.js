import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
const { REACT_APP_ABHA_ADDRESS_SUFFIX } = process.env;

const useAddPatientViaAbhaAddress = ({
  abhaAddress = "",
  setActiveRegisterState = () => {},
}) => {
  const [veriFiedAbhaAddressData, setVerifiedAbhaAddress] = useState([]);
  const [isVerifingAbhaAddress, setIsVerifingAbhaAddress] = useState(false);

  const onVerifyABHAaddress = async () => {
    setIsVerifingAbhaAddress(true);
    try {
      const token = localStorage.getItem("authToken");
      const res = await axios.get(
        `/v2/danzo/m1/abhaVerification/${abhaAddress}${REACT_APP_ABHA_ADDRESS_SUFFIX}`,

        {
          headers: {
            Authorization: token,
            "ngrok-skip-browser-warning": "hgs",
          },
        }
      );
      setVerifiedAbhaAddress(res.data);
      setActiveRegisterState("abha_address_otp_option");
    } catch (error) {
      toast.error(error?.response?.data?.message?.[0]?.message);
      console.log(error, "error");
    }
    setIsVerifingAbhaAddress(false);
  };

  return {
    veriFiedAbhaAddressData,
    onVerifyABHAaddress,
    isVerifingAbhaAddress,
  };
};

export default useAddPatientViaAbhaAddress;
