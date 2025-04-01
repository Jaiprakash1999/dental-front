import React, { useState } from "react";
import OTPinputField from "./OTPinputField";
import CreateAbhaAddressOptions from "./CreateAbhaAddressOptions";
import ChooseABHAaddress from "./ChooseABHAaddress";
import PatientDetailsForm from "./PatientDetailsForm";

const CreateAbhaAddress = () => {
  const [activeState, setActiveState] = useState("continue");
  const [abahOrMobile, setAbhaOrMobile] = useState("");

  const MAPPING = {
    continue: CreateAbhaAddressOptions,
    otp_field: OTPinputField,
    patient_details_form: PatientDetailsForm,
    choose_abha_address: ChooseABHAaddress,
  };

  const ComponentToRender = MAPPING[activeState];

  if (!ComponentToRender) {
    return null;
  }
  return (
    <ComponentToRender
      setActiveState={setActiveState}
      abahOrMobile={abahOrMobile}
      setAbhaOrMobile={setAbhaOrMobile}
    />
  );
};
export default CreateAbhaAddress;
