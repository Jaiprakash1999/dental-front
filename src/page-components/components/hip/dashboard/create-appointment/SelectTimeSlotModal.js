import React, { useState } from "react";
import Modal from "../../../../common-components/Modal";
import CustomDatePicker from "../../../../common-components/CustomDatePicker";
import { formatDateTime } from "../../../../utils/formatDateTime";

const time = [
  "10:00",
  "11:15",
  "10:30",
  "12:45",
  "12:00",
  "01:15",
  "02:30",
  "03:45",
];

const SelectTimeSlotModal = ({ timeSlot, setTimeSlot, setAppointmentData }) => {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [timeRoutine, setTimeRoutine] = useState("");

  const handleConfirm = () => {
    const selectedDateTime = selectedTime + " " + timeRoutine;
    setAppointmentData((prev) => ({
      ...prev,
      timeSlot: formatDateTime(selectedDate) + ", " + selectedDateTime,
    }));
    setTimeSlot(false);
  };

  return (
    <div>
      <Modal
        modalWidth="w-[60%]"
        showModal={timeSlot}
        onClose={() => setTimeSlot(false)}
      >
        <div className="text-sm flex w-full">
          <div className="w-[45%] text-[#111928] border-r  h-full">
            <h1 className="font-medium border-b py-4 px-5 ">Select Day</h1>
            <div className="px-2">
              <CustomDatePicker
                // setDate={(value) =>
                //   setAppointmentData((prev) => ({
                //     ...prev,
                //     timeSlot: formatDateTime(value),
                //   }))
                // }
                setDate={setSelectedDate}
                allowFutureDates
                allowPastDates={false}
              />
            </div>
          </div>
          <div className="w-[55%] text-[#111928]  h-full">
            <div className="flex  border-b items-center">
              <h1 className="py-4 font-medium ps-5 ">Select Time</h1>
              <span className="text-[#4B5563] ms-1 font-normal">
                {" "}
                (Optional){" "}
              </span>
            </div>
            <h1 className="px-5 text-[#111928] mt-4 text-sm">Select</h1>
            <div className="px-5 flex py-4 gap-2 text-sm">
              <button
                onClick={() => setTimeRoutine("AM")}
                className={`${
                  timeRoutine === "AM"
                    ? "bg-[#1A56DB] text-[#FFFFFF]"
                    : "text-[#6B7280]"
                } px-4 border py-2 rounded-lg`}
              >
                AM
              </button>
              <button
                onClick={() => setTimeRoutine("PM")}
                className={`${
                  timeRoutine === "PM"
                    ? "bg-[#1A56DB] text-[#FFFFFF]"
                    : "text-[#6B7280]"
                } px-4 border py-2 rounded-lg`}
              >
                PM
              </button>
            </div>
            <h1 className="px-5 text-[#111928] text-sm">Time</h1>
            <div className="flex ps-3 flex-wrap">
              {time.length > 0
                ? time.map((item) => {
                    return (
                      <div
                        className={`${
                          selectedTime === item
                            ? "bg-[#007bff] text-white"
                            : "border text-[#6B7280]"
                        }  m-2 px-2 py-1.5 rounded-lg`}
                        key={item}
                      >
                        <button onClick={() => setSelectedTime(item)}>
                          {item}
                        </button>
                      </div>
                    );
                  })
                : "jp"}
            </div>

            <div className="flex absolute py-4 px-5 border-t bottom-0 w-[55%] justify-between">
              <button
                onClick={() => setTimeSlot(false)}
                className="flex border items-center justify-center bg-white border-[#E5E7EB] item-center px-4 py-2 rounded-lg text-sm text-[#1F2A37]"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirm}
                disabled={
                  selectedDate === "" ||
                  (selectedTime !== "" && timeRoutine === "") ||
                  (timeRoutine !== "" && selectedTime === "")
                }
                className="bg-[#1A56DB] disabled:bg-[#E5E7EB] disabled:border-[#E5E7EA] disabled:text-[#1F2A37] flex justify-center border border-[#1A56DB] item-center px-4 py-2 rounded-lg text-sm text-[#FFFFFF]"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default SelectTimeSlotModal;
