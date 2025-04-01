import React from "react";
import backArrow from "../../../images/back_arrow.svg";

const SelectedNotifications = ({
  selectedBroadCast = {},
  setSelectedNotifications = () => {},
}) => {
  const { message, subject } = selectedBroadCast || {};
  return (
    <div
      className="p-5 text-sm h-[90vh] overflow-y-scroll"
      style={{ boxShadow: "0px 0px 3px rgba(0,0,0,0.3)" }}
    >
      <div className="grid grid-cols-2">
        <button onClick={() => setSelectedNotifications(null)}>
          <img src={backArrow} alt="backArrow" />
        </button>
        <div>{subject}</div>
      </div>
      <div className="my-5">{message}</div>
    </div>
  );
};

export default SelectedNotifications;
