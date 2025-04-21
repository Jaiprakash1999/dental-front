import React, { useState } from "react";
import Modal from "../../../../common-components/Modal";
import CustomDatePicker from "../../../../common-components/CustomDatePicker";
import { DOCTOR_LIST } from "../../../../constants/Constant";
import Select from "../../../../common-components/Select";
import { formatArray } from "../../../../utils/formateArray";
import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";
import moment from "moment";
import Skeleton from "react-loading-skeleton";

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

const SelectTimeSlotModal = ({
  timeSlotModal,
  setTimeSlotModal,
  setAppointmentData,
  isSlotLoading,
  getTimeSlots,
  timeSlot,
}) => {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState([]);
  const [timeRoutine, setTimeRoutine] = useState("");

  const handleSelectDate = async (date) => {
    setSelectedDate(date);
    const formattedDate = moment(date).format("yyyy-MM-DD");
    await getTimeSlots(formattedDate);
  };

  const handleSelectTime = (item) => {
    if (selectedTime.includes(item)) {
      setSelectedTime((prev) => prev.filter((time) => time !== item));
    } else {
      setSelectedTime((prev) => [...prev, item]);
    }
  };

  console.log(selectedTime, "selected tiem");
  console.log(moment(selectedDate).format("dd-MM-yyyy"), "selected date");
  console.log(timeRoutine, "time routine");

  const handleConfirm = () => {
    setAppointmentData((prev) => ({
      ...prev,
      visitDate: selectedDate,
      visitTime: [...selectedTime],
    }));
    setTimeSlotModal(false);
  };

  return (
    <div>
      <Modal
        modalWidth="w-[60%]"
        modalHeight="min-h-[50%]"
        showModal={timeSlotModal}
        onClose={() => setTimeSlotModal(false)}
      >
        <div className="text-sm flex  w-full">
          <div className="w-[45%] text-[#111928] border-r">
            <h1 className="font-medium border-b py-4 px-5 ">Select Day</h1>
            <div className="px-2">
              <CustomDatePicker
                // setDate={(value) =>
                //   setAppointmentData((prev) => ({
                //     ...prev,
                //     timeSlotModal: formatDateTime(value),
                //   }))
                // }
                setDate={handleSelectDate}
                allowFutureDates
                allowPastDates={false}
              />
            </div>
          </div>
          <div className="w-[55%] relative text-[#111928]  h-full">
            <div className="flex  border-b items-center">
              <h1 className="py-4 font-medium ps-5 ">Select Time</h1>
              {/* <span className="text-[#4B5563] ms-1 font-normal">
                {" "}
                (Optional){" "}\
              </span> */}
            </div>

            <div className="w-full px-5 mt-2 mb-2 text-sm text-[#111928] ">
              <div className="mb-1">Doctor*</div>
              <Select
                onChange={() => setAppointmentData()}
                name="doctor"
                options={formatArray(DOCTOR_LIST)}
                upIcon={faAngleUp}
                downIcon={faAngleDown}
                allowPressEnter={false}
                placeholder={"Select Doctor"}
                openTopPosition="top-1.5"
                readOnly
                closeTopPosition="top-1.5"
                className="focus:outline-none text-[#2D2E33] font-normal bg-[#F9FAFB] placeholder:font-normal rounded-lg ps-4 pe-2 border placeholder:text-[#9CA3AF] border-[#D1D5DB] text-sm py-2 w-full focus:border-[#2D2E33]"
              />
            </div>
            {/* <h1 className="px-5 text-[#111928] mt-2 text-sm">Select Time</h1> */}
            {/* <div className="px-5 flex py-2 gap-2 text-sm">
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
            </div> */}
            {/* <h1 className="px-5 text-[#111928] text-sm">Select Time</h1> */}
            <div className="flex h-full ps-3 flex-wrap">
              {isSlotLoading ? (
                <div>
                  <Skeleton />
                </div>
              ) : timeSlot.length > 0 ? (
                timeSlot.map((item) => {
                  return (
                    <div
                      // className={`${
                      //   selectedTime.includes(item?.time)
                      //     ? "bg-[#007bff] text-white"
                      //     : "border text-[#6B7280]"
                      // }  m-2 px-2 py-1.5 rounded-lg`}
                      key={item?.time}
                    >
                      <button
                        // className=" disabled:bg-gray-300"
                        className={`${
                          selectedTime.includes(item?.time)
                            ? "bg-[#007bff] text-white"
                            : "border text-[#6B7280]"
                        }  m-2 px-2 py-1.5 rounded-lg disabled:bg-gray-300`}
                        disabled={!item.isAvailable}
                        onClick={() => handleSelectTime(item.time)}
                      >
                        {moment(item.time).format("hh:mm A")}
                      </button>
                    </div>
                  );
                })
              ) : (
                "slots are not available"
              )}
            </div>

            <div className="flex  py-3 px-5 border-t w-full bottom-0 justify-between">
              <button
                onClick={() => setTimeSlotModal(false)}
                className="flex border items-center justify-center bg-white border-[#E5E7EB] item-center px-4 py-2 rounded-lg text-sm text-[#1F2A37]"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirm}
                // disabled={
                //   selectedDate === "" ||
                //   selectedTime.length === 0 ||
                //   timeRoutine === ""
                //   // (selectedTime !== "" && timeRoutine === "") ||
                //   // (timeRoutine !== "" && selectedTime === "")
                // }
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
