import axios from "axios";
import moment from "moment";
import { useState } from "react";
import { toast } from "react-toastify";

const useDrivingLicense = ({
  inputNumber,
  setActiveState = () => {},
  mobileOTP,
  dlFormInfo,
}) => {
  const [isDLmobileContinue, setIsDLmobileContinue] = useState(false);
  const [isDLmobileOTPverifiy, setIsDLmobileOTPverify] = useState(false);
  const [isDLform, setIsDLform] = useState(false);
  const [dlMobileData, setDlMobileData] = useState({});

  const onDLmobileContinue = async () => {
    setIsDLmobileContinue(true);
    try {
      const token = localStorage.getItem("authToken");
      const res = await axios.post(
        `/v2/danzo/abhaCreation/byDL/requestOtp/byMobile`,
        { mobileNumber: inputNumber },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      setDlMobileData(res.data);
      toast.success(`OTP has been sent to ${inputNumber} `);
      setTimeout(() => {
        setActiveState("mobile_otp_field");
      }, 1000);
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
    setIsDLmobileContinue(false);
  };

  const onDLmobileOTPverify = async () => {
    setIsDLmobileOTPverify(true);
    try {
      const token = localStorage.getItem("authToken");
      const res = await axios.post(
        `/v2/danzo/abhaCreation/byDL/verify/byMobile`,
        {
          id: dlMobileData.id,
          otp: mobileOTP.join(""),
        },
        {
          headers: { Authorization: token },
        }
      );
      console.log(res?.data, "res of otp verified");
      toast.success("OTP Verified successfully !");
      setTimeout(() => {
        setActiveState("dl_form");
      }, 1000);
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
    setIsDLmobileOTPverify(false);
  };

  const onDLform = async () => {
    setIsDLform(true);
    const convertToBase64 = (file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () =>
          resolve(reader.result.replace(/^data:image\/[a-z]+;base64,/, ""));
        reader.onerror = (error) => reject(error);
        reader.readAsDataURL(file);
      });
    };

    const frontSideBase64 = await convertToBase64(dlFormInfo.frontSideOfDL);
    const backSideBase64 = await convertToBase64(dlFormInfo.backSideOfDL);

    try {
      const token = localStorage.getItem("authToken");
      const res = await axios.post(
        `/v2/danzo/abhaCreation/byDL/verify/details`,
        {
          id: dlMobileData.id,
          documentId: dlFormInfo.dlID,
          firstName: dlFormInfo.firstName,
          middleName: dlFormInfo.middleName,
          lastName: dlFormInfo.lastName,
          dob: moment(dlFormInfo.dateOfBirth).format("YYYY-MM-DD"),
          gender: dlFormInfo.gender,
          frontSidePhoto: frontSideBase64,
          backSidePhoto: backSideBase64,
          address: dlFormInfo.address,
          state: dlFormInfo.state,
          district: dlFormInfo.district,
          pinCode: dlFormInfo.pinCode,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      console.log(res, "res of dl form");
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
    setIsDLform(false);
  };

  return {
    onDLmobileContinue,
    isDLmobileContinue,
    dlMobileData,
    isDLmobileOTPverifiy,
    onDLmobileOTPverify,
    onDLform,
    isDLform,
  };
};

export default useDrivingLicense;
