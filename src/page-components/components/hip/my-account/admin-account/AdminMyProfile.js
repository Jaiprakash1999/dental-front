import React, { useState } from "react";
import UpdatePassword from "../UpdatePassword";

const AdminMyProfile = () => {
  const [adminInfo, setAdminInfo] = useState({
    firstName: "Jaiprakash",
    lastName: "Kushwaha",
    department: "Medical staff",
    role: "Admin",
    email: "Parchaa@gmail.com",
  });

  const handleChange = (e) => {
    const { name, value } = e.target || {};
    setAdminInfo((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div>
      <div
        className="m-8 px-4 py-4 rounded-md"
        style={{ boxShadow: "0 0 4px rgb(44 62 80 / 20%)" }}
      >
        <div className="text-[#111928] mb-3 font-medium"> Personal Details</div>
        <div className="text-sm w-full flex gap-4">
          <div className="w-1/2">
            <div className="text-[#111928]">First Name</div>
            <div className="mt-1">
              <input
                type="text"
                name="firstName"
                onChange={handleChange}
                value={adminInfo.firstName}
                disabled
                className="focus:outline-none disabled:text-[#6B7280] rounded-lg ps-2 pe-2 border placeholder:text-[#9CA3AF] border-[#D1D5DB] text-sm py-2 w-full focus:border-[#006AF5]"
              />
            </div>
          </div>
          <div className="w-1/2">
            <div className="text-[#111928]">Last Name</div>
            <div className="mt-1">
              <input
                name="lastName"
                value={adminInfo.lastName}
                onChange={handleChange}
                type="text"
                disabled
                className="focus:outline-none disabled:text-[#6B7280] rounded-lg ps-2 pe-2 border placeholder:text-[#9CA3AF] border-[#D1D5DB] text-sm py-2 w-full focus:border-[#006AF5]"
              />
            </div>
          </div>
        </div>
        <div className="text-sm my-4 w-full flex gap-4">
          <div className="w-1/2">
            <div className="text-[#111928]">Department</div>
            <div className="mt-1">
              <input
                type="text"
                name="department"
                onChange={handleChange}
                value={adminInfo.department}
                disabled
                className="focus:outline-none rounded-lg disabled:text-[#6B7280] ps-2 pe-2 border placeholder:text-[#9CA3AF] border-[#D1D5DB] text-sm py-2 w-full focus:border-[#006AF5]"
              />
            </div>
          </div>
          <div className="w-1/2">
            <div className="text-[#111928]">Role</div>
            <div className="mt-1">
              <input
                type="text"
                disabled
                name="role"
                value={adminInfo.role}
                onChange={handleChange}
                className="focus:outline-none disabled:text-[#6B7280] rounded-lg ps-2 pe-2 border placeholder:text-[#9CA3AF] border-[#D1D5DB] text-sm py-2 w-full focus:border-[#006AF5]"
              />
            </div>
          </div>
        </div>
        <div className="text-sm my-4 w-full flex gap-4">
          <div className="w-1/2">
            <div className="text-[#111928]">Email</div>
            <div className="mt-1">
              <input
                type="text"
                name="email"
                value={adminInfo.email}
                onChange={handleChange}
                disabled
                className="focus:outline-none disabled:text-[#6B7280] rounded-lg ps-2 pe-2 border placeholder:text-[#9CA3AF] border-[#D1D5DB] text-sm py-2 w-full focus:border-[#006AF5]"
              />
            </div>
          </div>
          <div className="w-1/2"></div>
        </div>
      </div>
      <UpdatePassword />
    </div>
  );
};

export default AdminMyProfile;
