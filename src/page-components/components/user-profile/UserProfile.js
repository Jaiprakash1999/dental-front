import React, { useCallback, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { USER_TYPE } from "../../utils/userType";

const UserProfile = ({ setOpenProfile = () => {}, openProfile = false }) => {
  const { t } = useTranslation();
  const userDeatils = JSON.parse(sessionStorage.getItem("userDetails"));
  const {
    // age,
    // id,
    email,
    name,
    mobileNumber,
    userType,
    username,
    stamp,
    signature,
  } = userDeatils || {};

  const navigate = useNavigate();
  const dropDownRef = useRef(null);

  const onLogout = () => {
    localStorage.removeItem("authToken");
    sessionStorage.removeItem("userData");
    navigate("/");
  };

  const handleClickOutside = useCallback(
    (event) => {
      if (
        dropDownRef.current &&
        !dropDownRef.current.contains(event.target) &&
        event.target.tagName !== "IMG"
      ) {
        setOpenProfile(false);
      }
    },
    [setOpenProfile]
  );

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openProfile, handleClickOutside]);

  return (
    openProfile && (
      <div
        ref={dropDownRef}
        style={{ boxShadow: "0 0 8px rgb(44 62 80 / 20%)" }}
        className="text-[#374151] bg-white text-sm right-5 top-10 rounded-md absolute"
      >
        <div className="py-2 px-3 flex flex-col">
          <span className="text-[#1F2A37] font-semibold">{name}</span>
          <span className="cursor-pointer font-normal">
            {USER_TYPE[userType]}
          </span>
        </div>

        <div className="grid px-3 mb-2 grid-cols-2">
          <div className="text-secondary">{t("Username")}:</div>
          <div>{username}</div>
        </div>
        <div className="grid px-3 mb-2 grid-cols-2">
          <div className="text-secondary">{t("Mobile No.")}:</div>
          <div>{mobileNumber}</div>
        </div>
        <div className="grid px-3 mb-2 grid-cols-2">
          <div className="text-secondary">{t("Email ID")}:</div>
          <div>{email}</div>
        </div>
        <div className="grid px-3 mb-2 grid-cols-2">
          <div>
            <div className="text-secondary">{t("Signature")}</div>
            {signature === null || signature === undefined ? (
              "--"
            ) : (
              <img
                src={`data:image/jpeg;base64,${signature}`}
                alt="signature"
                height={80}
                width={80}
              />
            )}
          </div>
          <div>
            <div className="text-secondary">{t("Stamp")}</div>
            {stamp === null || stamp === undefined ? (
              "--"
            ) : (
              <img
                src={`data:image/jpeg;base64,${stamp}`}
                alt="signature"
                height={80}
                width={80}
              />
            )}
          </div>
        </div>
        <div className="border-t py-2 hover:underline text-center text-[#F05252] cursor-pointer px-3">
          <button onClick={() => onLogout()}> {t("Log Out")}</button>
        </div>
      </div>
    )
  );
};

export default UserProfile;
