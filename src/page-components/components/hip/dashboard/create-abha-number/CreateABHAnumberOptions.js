import React, { useState } from "react";
import BackArrow from "../../../../../images/back_arrow.svg";
import closeCross from "../../../../../images/close_cross.svg";
import { setDashboardDrawer } from "../../../../../redux-store/slice/checkInDrawerSlice";
import { useDispatch } from "react-redux";
import SecondaryButton from "../../../../common-components/Buttons/SecondaryButton";
import CreateABHAnumber from "./CreateABHAnumber";
import NationalHealthAuthority from "../../../../../images/national-health-authority.svg";
import CreateABHAnumberbyDL from "./using-driving-license/CreateABHAnumberbyDL";

const CreateABHAnumberOptions = ({ setPatient = () => {} }) => {
  const [activeState, setActiveState] = useState("choose_option");
  const dispatch = useDispatch();

  const onCloseDrawer = () => {
    dispatch(
      setDashboardDrawer({
        userDrawer: false,
        skipABHA: false,
        createABHAbyAadhaar: false,
        checkInDrawer: false,
        createABHAaddress: false,
      })
    );
  };

  const onBack = () => {
    if (activeState === "choose_option") {
      dispatch(
        setDashboardDrawer({
          userDrawer: true,
          skipABHA: false,
          createABHAbyAadhaar: false,
          checkInDrawer: false,
          createABHAaddress: false,
        })
      );
    } else if (
      activeState === "enter_aadhar" ||
      activeState === "via_driving_licence"
    ) {
      setActiveState("choose_option");
    } else if (activeState === "aadhar_otp_field") {
      setActiveState("enter_aadhar");
    } else if (activeState === "abha_card") {
      setActiveState("aadhar_otp_field");
    } else if (activeState === "communication_otp_field") {
      setActiveState("aadhar_otp_field");
    }
  };

  return (
    <div className="mx-3 my-2">
      <div className="flex justify-between mb-5">
        {activeState !== "abha_card" && (
          <button
            onClick={onBack}
            className="text-[#6B7280] text-base uppercase font-medium"
          >
            <img src={BackArrow} alt="BackArrow" color="#1F2A37" />
          </button>
        )}
        <h1 className="text-[#6B7280] text-base uppercase font-medium">
          CREATE ABHA NO.
        </h1>
        <button onClick={onCloseDrawer} className="text-[#383838]">
          <img src={closeCross} alt="closeCross" />
        </button>
      </div>
      {activeState === "choose_option" ? (
        <div>
          <div className="text-sm text-[#111928]">
            Choose one of the following options to create your ABHA number
          </div>
          <div className="flex flex-col gap-3 mt-4">
            <SecondaryButton
              buttonName="Aadhaar Number"
              width="w-full"
              onClick={() => setActiveState("enter_aadhar")}
            />
            <SecondaryButton
              buttonName="Driving Licence"
              width="w-full"
              onClick={() => setActiveState("via_driving_licence")}
            />
          </div>
          <div className="mt-96">
            <div className="text-sm gap-2 py-5 flex items-center justify-center">
              <span className="text-[#6B7280]">APPROVED BY</span>
              <img
                src={NationalHealthAuthority}
                alt="NationalHealthAuthority"
              />
            </div>
          </div>
        </div>
      ) : null}
      {activeState === "enter_aadhar" ? (
        <CreateABHAnumber setPatient={setPatient} />
      ) : null}
      {activeState === "via_driving_licence" ? (
        <CreateABHAnumberbyDL setPatient={setPatient} />
      ) : null}
    </div>
  );
};

export default CreateABHAnumberOptions;
