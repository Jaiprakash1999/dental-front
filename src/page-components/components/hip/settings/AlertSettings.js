import React, { useState } from "react";
import Toggle from "../../../common-components/Toggle";

const AlertSettings = () => {
  const [alertName, setAlertName] = useState({
    new_appointment_booked: true,
    appointment_cancellation_reschedule: true,
    daily_schedule_summary: true,
    new_message: true,
  });
  const onChange = (name, newState) => {
    setAlertName((prev) => ({ ...prev, [name]: newState }));
  };

  return (
    <div
      className="my-8 ms-8 px-4 py-4 rounded-md"
      style={{ boxShadow: "0 0 4px rgb(44 62 80 / 20%)" }}
    >
      <div className="text-[#111928] mb-3 border-b pb-3 flex justify-between font-semibold">
        Alerts & Notifications
      </div>
      <div className="mb-3 border-b pb-3 flex items-center justify-between">
        <div>
          <div className="text-[#111928] font-medium">
            New Appointment booked
          </div>
          <div className="text-[#6B7280] font-light text-sm">
            Notification when a new appointment is scheduled.
          </div>
        </div>
        <div>
          <Toggle
            value={alertName.new_appointment_booked}
            onChange={onChange}
            name="new_appointment_booked"
          />
        </div>
      </div>
      <div className="mb-3 border-b pb-3 flex items-center justify-between">
        <div>
          <div className="text-[#111928] font-medium">
            Appointment Cancellations/Reschedules
          </div>
          <div className="text-[#6B7280] font-light text-sm">
            when an appointment is canceled/Reschedules.
          </div>
        </div>
        <div>
          <Toggle
            value={alertName.appointment_cancellation_reschedule}
            onChange={onChange}
            name="appointment_cancellation_reschedule"
          />
        </div>
      </div>
      <div className="mb-3 border-b pb-3 flex items-center justify-between">
        <div>
          <div className="text-[#111928] font-medium">
            Daily Schedule Summary
          </div>
          <div className="text-[#6B7280] font-light text-sm">
            A summary of the day schedule.
          </div>
        </div>
        <div>
          <Toggle
            value={alertName.daily_schedule_summary}
            onChange={onChange}
            name="daily_schedule_summary"
          />
        </div>
      </div>
      <div className="mb-3 flex items-center justify-between">
        <div>
          <div className="text-[#111928] font-medium">New Messages</div>
          <div className="text-[#6B7280] font-light text-sm">
            Get news, announcements, and Daily updates
          </div>
        </div>
        <div>
          <Toggle
            value={alertName.new_message}
            onChange={onChange}
            name="new_message"
          />
        </div>
      </div>
    </div>
  );
};

export default AlertSettings;
