import React, { useEffect, useRef } from "react";
// const NOTIFICATION_LIST = [{}];

const Notifications = ({ notifications, setNotifications }) => {
  const notificationRef = useRef(null);
  const handleClickOutside = (event) => {
    if (
      notificationRef.current &&
      !notificationRef.current.contains(event.target)
    ) {
      setTimeout(() => {
        setNotifications(false);
      }, 50);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
    // eslint-disable-next-line
  }, [notifications]);
  return (
    <div
      ref={notificationRef}
      className="bg-white relative w-full min-h-96 overflow-y-scroll rounded"
      style={{ boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.1)" }}
    >
      <div className="bg-[#F9FAFB] text-[#111928] py-2 flex justify-center">
        Notifications
      </div>
      <div className="px-4 py-2">
        <div className="text-[#6B7280] text-sm">
          You have a new appointment scheduled. Patient: Name, Appointment ID:
          4230439, Date: 16.05.24, Wednesday.
        </div>
        <div className="text-[#1A56DB] text-sm">a few moments ago</div>
      </div>
    </div>
  );
};

export default Notifications;
