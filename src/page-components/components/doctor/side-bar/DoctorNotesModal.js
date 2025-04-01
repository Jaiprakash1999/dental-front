import React from "react";
import DoctorNotes from "./DoctorNotes";
import Modal from "../../../common-components/Modal";
import { useDispatch, useSelector } from "react-redux";
import { setDoctorNotes } from "../../../../redux-store/slice/doctorNotes";

const DoctorNotesModal = () => {
  const isDoctorNotes = useSelector((state) => state.doctorNotes);
  const dispatch = useDispatch();
  return (
    <div>
      <Modal
        modalHeight="min-h-[70%]"
        modalWidth="w-[70%]"
        showModal={isDoctorNotes}
        onClose={() => dispatch(setDoctorNotes(false))}
      >
        <DoctorNotes />
      </Modal>
    </div>
  );
};

export default DoctorNotesModal;
