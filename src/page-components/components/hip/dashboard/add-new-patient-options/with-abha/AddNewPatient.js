import { useState } from "react";
import { useDispatch } from "react-redux";

import useAddPatientViaAbha from "./hooks/useAddPatientViaAbha";
import useVerifyOTPviaAbha from "./hooks/useVerifyOTPviaAbha";
import useLoginWithSelectedAbhaNumber from "./hooks/useLoginWithSelectedAbhaNumber";
import useGetPatientProfileViaAbha from "./hooks/useGetPatientProfileViaAbha";
import useAddPatientViaAbhaInHIP from "./hooks/useAddPatientViaAbhaInHIP";
import AddNewPatientOption from "./AddNewPatientOption";
import OTPonMobileorAadhaar from "./using-abha-number/OTPonMobileorAadhaar";
import AadhaarMobileAbhaOTPinputField from "./AadhaarMobileAbhaOTPinputField";
import PatientProfileFromABHA from "./PatientProfileFromABHA";
import ChooseAbhaNumber from "./using-mobile-number/ChooseAbhaNumber";
import { setDashboardDrawer } from "../../../../../../redux-store/slice/checkInDrawerSlice";
import useGetABHAcard from "../../create-abha-number/hooks/useGetABHAcard";
import OTPonAadhaarOrMobile from "./using-abha-address/OTPonAadhaarOrMobile";
import useAddPatientViaAbhaAddress from "./hooks/useAddPatientViaAbhaAddress";

const AddNewPatient = ({ setPatient = () => {} }) => {
  const [activeRegisterState, setActiveRegisterState] =
    useState("choose_options");

  const dispatch = useDispatch();

  const [inputNumber, setInputNumber] = useState("");
  const [abhaAddress, setAbhaAddress] = useState("");
  const [mobileOrAadhaar, setMobileOrAadhaar] = useState("");

  const onClose = () => {
    dispatch(
      setDashboardDrawer({
        userDrawer: false,
        checkInDrawer: false,
        skipABHA: false,
        createABHAbyAadhaar: false,
      })
    );
  };

  const {
    onAadharMobileContinue,
    isContinueWithNumberLoading,
    continueWithAadhaarMobileData,
  } = useAddPatientViaAbha({
    inputNumber,
    setActiveRegisterState,
    mobileOrAadhaar,
    abhaAddress,
  });

  const {
    veriFiedAbhaAddressData,
    onVerifyABHAaddress,
    isVerifingAbhaAddress,
  } = useAddPatientViaAbhaAddress({
    abhaAddress,
    setActiveRegisterState,
  });

  const {
    onOTPverifyViaAbha,
    isOTPverifyViaAbhaLoading,
    verifyOTPviaAbhaData,
  } = useVerifyOTPviaAbha({
    inputNumber,
    id: continueWithAadhaarMobileData.id,
    setActiveRegisterState,
    mobileOrAadhaar,
    abhaAddress,
  });

  const { isLoginWithSelectedAbhaNumber, onLoginViaSelectedAbhaNumber } =
    useLoginWithSelectedAbhaNumber({
      setActiveRegisterState,
    });

  const { isAbhaCardDataLoading, getAbhaCard } = useGetABHAcard({
    id: verifyOTPviaAbhaData.id,
  });

  const { patientProfile, isProfileLoading } = useGetPatientProfileViaAbha({
    id: verifyOTPviaAbhaData.id,
    activeRegisterState,
    abhaAddress,
  });

  const { isAddPatientViaABHAinHIPLoading, onAddPatientinHIPviaABHA } =
    useAddPatientViaAbhaInHIP({
      id: verifyOTPviaAbhaData.id,
      setPatient,
      abhaAddress,
    });

  return (
    <div className="mx-3 my-2">
      {activeRegisterState === "choose_options" && (
        <AddNewPatientOption
          onClose={onClose}
          inputNumber={inputNumber}
          abhaAddress={abhaAddress}
          onAadharMobileContinue={onAadharMobileContinue}
          setActiveRegisterState={setActiveRegisterState}
          setInputNumber={setInputNumber}
          isContinueWithNumberLoading={isContinueWithNumberLoading}
          setAbhaAddress={setAbhaAddress}
          onVerifyABHAaddress={onVerifyABHAaddress}
          isVerifingAbhaAddress={isVerifingAbhaAddress}
        />
      )}

      {activeRegisterState === "abha_number_otp_option" && (
        <OTPonMobileorAadhaar
          onClose={onClose}
          setInputNumber={setInputNumber}
          setActiveRegisterState={setActiveRegisterState}
          onAadharMobileContinue={onAadharMobileContinue}
          isContinueWithNumberLoading={isContinueWithNumberLoading}
          setMobileOrAadhaar={setMobileOrAadhaar}
        />
      )}

      {activeRegisterState === "abha_address_otp_option" && (
        <OTPonAadhaarOrMobile
          setAbhaAddress={setAbhaAddress}
          setActiveRegisterState={setActiveRegisterState}
          onClose={onClose}
          veriFiedAbhaAddressData={veriFiedAbhaAddressData}
          isContinueWithNumberLoading={isContinueWithNumberLoading}
          onAadharMobileContinue={onAadharMobileContinue}
          setMobileOrAadhaar={setMobileOrAadhaar}
        />
      )}

      {activeRegisterState === "otp_input_field" && (
        <AadhaarMobileAbhaOTPinputField
          onAadharMobileContinue={onAadharMobileContinue}
          isContinueWithNumberLoading={isContinueWithNumberLoading}
          onOTPverifyViaAbha={onOTPverifyViaAbha}
          isOTPverifyViaAbhaLoading={isOTPverifyViaAbhaLoading}
          onClose={onClose}
          setActiveRegisterState={setActiveRegisterState}
          inputNumber={inputNumber}
          continueWithAadhaarMobileData={continueWithAadhaarMobileData}
        />
      )}

      {activeRegisterState === "abha_card" && (
        <PatientProfileFromABHA
          patientProfile={patientProfile}
          onAddPatientinHIPviaABHA={onAddPatientinHIPviaABHA}
          isAddPatientViaABHAinHIPLoading={isAddPatientViaABHAinHIPLoading}
          onClose={onClose}
          inputNumber={inputNumber}
          isProfileLoading={isProfileLoading}
          getAbhaCard={getAbhaCard}
          isAbhaCardDataLoading={isAbhaCardDataLoading}
        />
      )}

      {activeRegisterState === "choose_abha_number" && (
        <ChooseAbhaNumber
          isLoginWithSelectedAbhaNumber={isLoginWithSelectedAbhaNumber}
          onLoginViaSelectedAbhaNumber={onLoginViaSelectedAbhaNumber}
          verifyOTPviaAbhaData={verifyOTPviaAbhaData}
          onClose={onClose}
          setActiveRegisterState={setActiveRegisterState}
          inputNumber={inputNumber}
        />
      )}
    </div>
  );
};
export default AddNewPatient;
