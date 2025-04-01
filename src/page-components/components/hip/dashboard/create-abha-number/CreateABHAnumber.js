import React, { useState } from "react";
import CreateABHAnumberUsingAadhar from "./using-aadhar-number/CreateABHAnumberUsingAadhar";
import AadharOTPfield from "./AadharOTPfield";
// import { setDashboardDrawer } from "../../../../../redux-store/slice/checkInDrawerSlice";
// import { useDispatch } from "react-redux";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faArrowLeftLong } from "@fortawesome/free-solid-svg-icons";
import useCreateABHAbyAadhaar from "../../../hip/dashboard/create-abha-number/hooks/useCreateABHAbyAadhaar";
import useVerifyAadhaarOTP from "./hooks/useVerifyAadhaarOTP";
import CommunicationOTPfield from "./using-aadhar-number/CommunicationOTPfield";
import useVerifyOTPforCommunicationNumber from "./hooks/useVerifyOTPforCommunicationNumber";
import PatientProfileFromAadhaar from "./using-aadhar-number/PatientProfileFromAadhaar";
import useGetProfileFormAadhar from "./hooks/useGetProfileFormAadhar";
import useGetABHAcard from "./hooks/useGetABHAcard";
import useAddPatientViaAbhaInHIP from "../add-new-patient-options/with-abha/hooks/useAddPatientViaAbhaInHIP";
import CreateABHAaddressByAadhaar from "./using-aadhar-number/CreateABHAaddressByAadhaar";
import useCreateABHAaddressByAadhaar from "./hooks/useCreateABHAaddressByAadhaar";
// import closeCross from "../../../../../images/close_cross.svg";

const CreateABHAnumber = ({ setPatient = () => {} }) => {
  // const dispatch = useDispatch();
  const [activeState, setActiveState] = useState("enter_aadhar");
  const [inputNumber, setInputNumber] = useState("");
  const [communicationNumber, setCommunicationNumber] = useState("");
  const [aadhaarOTP, setAadhaarOTP] = useState(["", "", "", "", "", ""]);
  const [inputABHAaddress, setInputABHAaddress] = useState({
    selectedABHAaddress: "",
    preferredAbhaAddress: true,
  });

  // const onBack = () => {
  //   if (activeState === "enter_aadhar") {
  //     dispatch(
  //       setDashboardDrawer({
  //         userDrawer: true,
  //         skipABHA: false,
  //         createABHAbyAadhaar: false,
  //         checkInDrawer: false,
  //         createABHAaddress: false,
  //       })
  //     );
  //   } else if (activeState === "aadhar_otp_field") {
  //     setActiveState("enter_aadhar");
  //   } else if (activeState === "abha_card") {
  //     setActiveState("aadhar_otp_field");
  //   } else if (activeState === "communication_otp_field") {
  //     setActiveState("aadhar_otp_field");
  //   }
  // };
  const { aadhaarData, onCreateABHAbyAadhaar, isCreateABHAbyAadharloading } =
    useCreateABHAbyAadhaar({ setActiveState, inputNumber });

  const { onAadhaarOTPverify, isAadhaarOTPverify, aadhaarOTPdata } =
    useVerifyAadhaarOTP({
      setActiveState,
      aadhaarOTP,
      id: aadhaarData.id,
      communicationNumber,
    });

  const {
    isCommunicationOTPverify,
    onCommunicationOTPverify,
    verifyCommunicationData,
  } = useVerifyOTPforCommunicationNumber({ setActiveState });

  const {
    suggestedABHA,
    isSuggestionABHALoading,
    onCreateCustomABHAaddress,
    isCreatingABHAaddress,
  } = useCreateABHAaddressByAadhaar({
    setActiveState,
    id: aadhaarData.id,
    activeState,
    inputABHAaddress,
  });

  const { patientProfile, isProfileLoading } = useGetProfileFormAadhar({
    id: aadhaarOTPdata.id,
    activeState,
  });

  const { isAddPatientViaABHAinHIPLoading, onAddPatientinHIPviaABHA } =
    useAddPatientViaAbhaInHIP({ id: aadhaarOTPdata.id, setPatient });

  // const onCloseDrawer = () => {
  //   dispatch(
  //     setDashboardDrawer({
  //       userDrawer: false,
  //       skipABHA: false,
  //       createABHAbyAadhaar: false,
  //       checkInDrawer: false,
  //       createABHAaddress: false,
  //     })
  //   );
  // };

  const { isAbhaCardDataLoading, getAbhaCard } = useGetABHAcard({
    id: aadhaarOTPdata.id,
    setPatient,
  });

  const MAPPING = {
    enter_aadhar: CreateABHAnumberUsingAadhar,
    aadhar_otp_field: AadharOTPfield,
    communication_otp_field: CommunicationOTPfield,
    abha_card: PatientProfileFromAadhaar,
    create_abha_address: CreateABHAaddressByAadhaar,
  };

  const PROPS_MAPPING = {
    enter_aadhar: {
      onCreateABHAbyAadhaar,
      isCreateABHAbyAadharloading,
      setInputNumber,
      inputNumber,
    },
    aadhar_otp_field: {
      onAadhaarOTPverify,
      isAadhaarOTPverify,
      aadhaarData,
      inputNumber,
      onCreateABHAbyAadhaar,
      communicationNumber,
      setCommunicationNumber,
      aadhaarOTP,
      setAadhaarOTP,
    },
    communication_otp_field: {
      onCommunicationOTPverify,
      isCommunicationOTPverify,
      aadhaarData,
      communicationNumber,
      onAadhaarOTPverify,
    },
    abha_card: {
      patientProfile,
      onAddPatientinHIPviaABHA,
      isAddPatientViaABHAinHIPLoading,
      isProfileLoading,
      getAbhaCard,
      isAbhaCardDataLoading,
    },
    create_abha_address: {
      suggestedABHA,
      isSuggestionABHALoading,
      onCreateCustomABHAaddress,
      isCreatingABHAaddress,
      inputABHAaddress,
      setInputABHAaddress,
      setActiveState,
    },
  };
  const RenderedComponent = MAPPING[activeState];
  const componentProps = PROPS_MAPPING[activeState];

  if (!RenderedComponent) {
    return null;
  }

  console.log(verifyCommunicationData, "verifycommunicationDta");

  return (
    <div className="mx-3 my-2">
      {/* <div className="flex justify-between mb-5">
        {activeState !== "abha_card" && (
          <button
            onClick={onBack}
            className="text-[#6B7280] text-base uppercase font-medium"
          >
            <FontAwesomeIcon icon={faArrowLeftLong} color="#1F2A37" />
          </button>
        )}
        <h1 className="text-[#6B7280] text-base uppercase font-medium">
          CREATE ABHA NO.
        </h1>
        <button onClick={onCloseDrawer} className="text-[#383838]">
          <img src={closeCross} alt="closeCross" />
        </button>
      </div> */}
      <RenderedComponent {...componentProps} />
    </div>
  );
};

export default CreateABHAnumber;
