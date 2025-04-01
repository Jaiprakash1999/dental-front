import { faArrowLeftLong } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import {
  firstLetterCapital,
  formatABHAnumber,
} from "../../../../../../utils/firstLetterCapital";
import NationalHealthAuthority from "../../../../../../../images/national-health-authority.svg";
import closeCross from "../../../../../../../images/close_cross.svg";

const ChooseAbhaNumber = ({
  isLoginWithSelectedAbhaNumber,
  onLoginViaSelectedAbhaNumber = () => {},
  verifyOTPviaAbhaData = {},
  onClose = () => {},
  setActiveRegisterState = () => {},
  inputNumber,
}) => {
  const { accounts = [], id } = verifyOTPviaAbhaData || {};

  const onBack = () => {
    setActiveRegisterState("choose_options");
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-5">
        <button
          onClick={() => onBack()}
          className="text-[#6B7280] text-base uppercase font-medium"
        >
          <FontAwesomeIcon icon={faArrowLeftLong} />
        </button>
        <h1 className="text-[#6B7280] text-base uppercase font-medium">
          Login with Mobile
        </h1>
        <button onClick={() => onClose()} className="text-[#6B7280]">
          <img src={closeCross} alt="closeCross" />
        </button>
      </div>

      <div className="text-sm text-[#111928]">
        ABHA Numbers found on this mobile number {inputNumber}
      </div>
      <div style={{ height: "580px" }} className="overflow-y-scroll">
        {accounts.map((item) => {
          const { abhaNumber, name, preferredAbhaAddress, status } = item || {};
          return (
            <div
              key={abhaNumber}
              className="border bg-[#F9FAFB] text-sm border-[#D1D5DB] rounded-lg my-2 py-2 px-3"
            >
              <button
                onClick={() => onLoginViaSelectedAbhaNumber(id, abhaNumber)}
                disabled={isLoginWithSelectedAbhaNumber}
                className="w-full"
              >
                <div className="flex mb-2 justify-between w-full">
                  <div>{name}</div>
                  <div className="text-[#0E9F6E]">
                    {firstLetterCapital(status)}
                  </div>
                </div>
                <div className="flex">
                  <div className="text-[#7F8185] me-2">ABHA Number</div>
                  <div>{formatABHAnumber(abhaNumber)}</div>
                </div>
                <div className="flex">
                  <div className="text-[#7F8185] me-2">ABHA Address</div>
                  <div> {preferredAbhaAddress}</div>
                </div>
              </button>
            </div>
          );
        })}
      </div>
      <div className="text-sm gap-2 py-5 flex items-center justify-center">
        <span className="text-[#6B7280]">APPROVED BY</span>
        <img src={NationalHealthAuthority} alt="NationalHealthAuthority" />
      </div>
    </div>
  );
};

export default ChooseAbhaNumber;
