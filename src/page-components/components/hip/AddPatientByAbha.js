import Modal from "../../common-components/Modal";
import SecondaryButton from "../../common-components/Buttons/SecondaryButton";
import PrimaryButton from "../../common-components/Buttons/PrimaryButton";
import NationalHealthAuthority from "../../../images/national-health-authority.svg";
import { faArrowRightLong, faPhone } from "@fortawesome/free-solid-svg-icons";
import OtpInput from "../../common-components/input-field/OTPinput";
import { useState } from "react";
import SearchInput from "../../common-components/SearchInput";
import { useDispatch, useSelector } from "react-redux";
import { setAddNewPatientByAbha } from "../../../redux-store/slice/addPatientByAbhaSlice";
const { REACT_APP_ABHA_ADDRESS_SUFFIX } = process.env;

const AddPatientByAbha = ({
  setAddNewPatient = () => {},
  setShowPatientDetails = () => {},
}) => {
  const addNewPatientByAbha = useSelector((state) => state.addNewPatientByAbha);
  const dispatch = useDispatch();

  const handleSkipAbha = () => {
    setAddNewPatient(true);
    dispatch(setAddNewPatientByAbha(false));
  };

  const [mobileNumber, setMobileNumber] = useState("");
  const [abhaAddress, setAbhaAddress] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [showOTPinputField, setShowOTPinputField] = useState(false);

  const handleChange = (e) => {
    const value = e.target.value;
    // Remove any non-numeric characters
    const numericValue = value.replace(/\D/g, "");
    // Limit to maximum 10 characters
    const maxLengthValue = numericValue.slice(0, 10);
    setMobileNumber(maxLengthValue);
    if (maxLengthValue === "") {
      setShowOTPinputField(false);
    }
  };

  const handleAbhaAddress = (e) => {
    const { value } = e.target;
    setAbhaAddress(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowPatientDetails(true);
    dispatch(setAddNewPatientByAbha(false));
  };

  const handleSendOTP = (e) => {
    e.preventDefault();
    console.log(mobileNumber);
    setShowOTPinputField(true);
  };

  const resend = (e) => {
    e.preventDefault();
    console.log(otp, "otp");
  };

  const isOtpComplete = otp.every((digit) => digit !== "");

  return (
    <div>
      <Modal
        showModal={addNewPatientByAbha}
        onClose={() => {
          dispatch(setAddNewPatientByAbha(false));
        }}
        modalHeight="h-2/3"
      >
        <h1 className="text-[#111928] py-2 px-5 text-lg">Add patient ABHA</h1>
        <hr></hr>
        {abhaAddress === "" ? (
          <form onSubmit={handleSendOTP}>
            <div className="flex text-sm text-[#111928] px-5 pt-4 flex-col">
              <label className="mb-1" htmlFor="mobileNumber">
                Mobile Number*
              </label>
              <SearchInput
                icon={faPhone}
                name="mobileNumber"
                inputValue={mobileNumber}
                onChange={handleChange}
                placeholder="Enter your mobile number"
                maxLength={10} // Set maximum length to 10 characters
                required
              />
            </div>
            {mobileNumber.length > 0 && !showOTPinputField ? (
              <div className="mx-5 my-6">
                <PrimaryButton
                  buttonName="Send OTP"
                  icon={faArrowRightLong}
                  showIcon
                  type="submit"
                  disabled={mobileNumber.length !== 10}
                />
              </div>
            ) : null}
          </form>
        ) : null}
        {mobileNumber.length === 0 && abhaAddress === "" ? (
          <div className="flex mt-8 text-[#D1D5DB] w-full justify-center items-center text-center my-1 flex-row">
            <hr className="w-[30%]"></hr>
            <span className="mx-2 text-[#374151] text-sm">Or</span>
            <hr className="w-[30%]"></hr>
          </div>
        ) : null}

        {mobileNumber.length === 0 ? (
          <form>
            <div>
              <div className="flex w-full text-sm text-[#111928] px-5 pt-4 flex-col">
                <label className="mb-1" htmlFor="abhaAddress">
                  ABHA Address
                </label>
                <div className="flex w-full">
                  <input
                    type="text" // Use type="text" for desktop users
                    id="abhaAddress"
                    className="border w-full border-[#6B7280] rounded-r-none focus:border-[#2D2E33] text-sm text-gray-800 py-2 focus:outline-none rounded-lg placeholder:text-[#6B7280] px-2"
                    name="abhaAddress"
                    value={abhaAddress}
                    onChange={handleAbhaAddress}
                    placeholder="Enter ABHA Address"
                    maxLength={12} // Set maximum length to 10 characters
                    required
                  />
                  <input
                    type="text"
                    disabled
                    value={REACT_APP_ABHA_ADDRESS_SUFFIX}
                    className="border w-14 border-l-0 border-[#6B7280] focus:border-[#2D2E33] text-sm text-gray-800 py-2 focus:outline-none rounded-l-none rounded-lg placeholder:text-[#6B7280] px-2"
                  />
                </div>
              </div>
            </div>
          </form>
        ) : null}

        <form onSubmit={handleSubmit}>
          {showOTPinputField ? (
            <div className="my-4">
              <div className="flex text-sm text-[#111928] px-5 flex-col">
                <label className="mb-1">Enter OTP</label>
                <OtpInput otp={otp} setOtp={setOtp} />
              </div>

              <div className="flex my-5 text-sm mx-5 justify-between">
                <span>Didn't receive the OTP?</span>
                <button
                  type="button"
                  onClick={resend}
                  className="underline cursor-pointer text-[#1A56DB]"
                >
                  Resend
                </button>
              </div>
            </div>
          ) : null}
          <div className=" absolute bottom-0 w-full">
            <div className="text-sm gap-2 py-3 flex items-center justify-center">
              <span className="text-[#6B7280]">APPROVED BY</span>
              <img
                src={NationalHealthAuthority}
                alt="NationalHealthAuthority"
              />
            </div>
            <div className="flex py-4 border-t justify-between gap-2 px-5 w-full">
              <SecondaryButton
                buttonName="Skip ABHA"
                onClick={handleSkipAbha}
                type="button"
              />
              <PrimaryButton
                type="submit"
                disabled={!isOtpComplete}
                buttonName="Create & Continue"
              />
            </div>
          </div>
        </form>
      </Modal>
    </div>
  );
};
export default AddPatientByAbha;
