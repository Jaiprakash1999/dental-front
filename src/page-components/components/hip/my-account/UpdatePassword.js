import React, { useState } from "react";

const UpdatePassword = () => {
  const [password, setPassword] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target || {};
    setPassword((prev) => ({ ...prev, [name]: value }));
  };

  const isFormValid = () => {
    return Object.values(password).every((value) => value !== "");
  };

  return (
    <div
      className="m-8 px-4 py-4 rounded-md"
      style={{ boxShadow: "0 0 4px rgb(44 62 80 / 20%)" }}
    >
      <div className="text-[#111928] font-medium mb-3">
        Password information
      </div>

      <div className="text-sm my-4 w-full flex gap-4">
        <div className="w-1/2">
          <div className="text-[#111928]">Current password</div>
          <div className="mt-1">
            <input
              onChange={handleChange}
              name="currentPassword"
              value={password.currentPassword}
              type="text"
              className="focus:outline-none disabled:text-[#6B7280] rounded-lg ps-2 pe-2 border placeholder:text-[#9CA3AF] border-[#D1D5DB] text-sm py-2 w-full focus:border-[#006AF5]"
            />
          </div>
        </div>
        <div className="w-1/2">
          <div className="text-[#111928]">New password</div>
          <div className="mt-1">
            <input
              name="newPassword"
              value={password.newPassword}
              type="text"
              onChange={handleChange}
              className="focus:outline-none disabled:text-[#6B7280] rounded-lg ps-2 pe-2 border placeholder:text-[#9CA3AF] border-[#D1D5DB] text-sm py-2 w-full focus:border-[#006AF5]"
            />
          </div>
        </div>
      </div>
      <div className="text-sm my-4 w-full flex gap-4">
        <div className="w-1/2">
          <div className="text-[#111928]">Confirm new password</div>
          <div className="mt-1">
            <input
              name="confirmNewPassword"
              type="text"
              onChange={handleChange}
              value={password.confirmNewPassword}
              className="focus:outline-none disabled:text-[#6B7280] font-normal rounded-lg ps-2 pe-2 border placeholder:text-[#9CA3AF] border-[#D1D5DB] text-sm py-2 w-full focus:border-[#006AF5]"
            />
          </div>
        </div>
        <div className="w-1/2"></div>
      </div>
      <div className="text-sm my-4 w-full flex gap-4">
        <div className="w-1/2">
          <div className="text-[#111928]">Password requirements:</div>
          <div className="mt-1 text-sm text-[#6B7280]">
            Ensure that these requirements are met:
          </div>
          <div className="text-[#6B7280] mt-1 text-xs ms-5">
            <div>At least 10 characters (and up to 100 characters)</div>
            <div>At least one lowercase character</div>
            <div>
              Inclusion of at least one special character, e.g., ! @ # ?
            </div>
          </div>
        </div>
        <div className="w-1/2"></div>
      </div>
      <div>
        <button
          disabled={
            !isFormValid() ||
            password.newPassword !== password.confirmNewPassword
          }
          className="bg-[#1A56DB] disabled:bg-[#E5E7EB]
      disabled:border-[#E5E7EA] disabled:text-[#1F2A37] flex
      justify-center border border-[#1A56DB] item-center px-4 py-2
      rounded-lg text-sm text-[#FFFFFF]"
        >
          Update
        </button>
      </div>
    </div>
  );
};

export default UpdatePassword;
