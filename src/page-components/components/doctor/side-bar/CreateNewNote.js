import React from "react";
import Select from "../../../common-components/Select";
import { formatArray } from "../../../utils/formateArray";
import {
  CATEGORY,
  TAGS,
  VIEW_ABLE_PERSON_LIST,
} from "../../../constants/Constant";
import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";
import MultiSelect from "../../../common-components/MultiSelect";
import ClipboardList from "../../../../images/clipboard-list.svg";
import PaperClip from "../../../../images/paper-clip.svg";
import { useDispatch, useSelector } from "react-redux";
import { setNewNote } from "../../../../redux-store/slice/createNewNote";

const CreateNewNote = () => {
  const dispatch = useDispatch();
  const newNote = useSelector((state) => state.createNewNote);

  const isDoctorNotes = useSelector((state) => state.doctorNotes);
  const handleInputChange = (e) => {
    const { name, value } = e.target || {};
    dispatch(setNewNote({ ...newNote, [name]: value }));
  };

  return (
    <div className="w-full relative">
      <div className="w-full my-3 text-sm">
        <div className="mb-1 text-[#111928]">Title</div>
        <input
          name="title"
          type="text"
          onChange={handleInputChange}
          placeholder="Add title"
          required
          value={newNote.title}
          className="border border-[#D1D5DB] w-full focus:border-[#2D2E33] text-sm text-gray-800 py-1.5 focus:outline-none rounded-lg placeholder:text-[#D1D5DB] px-2"
        />
      </div>
      <div className={`${isDoctorNotes ? "flex gap-4" : ""}`}>
        <div className="w-full my-3 text-sm">
          <div className="mb-1 text-[#111928]">Category</div>
          <Select
            name="category"
            onChange={handleInputChange}
            options={formatArray(CATEGORY)}
            upIcon={faAngleUp}
            downIcon={faAngleDown}
            placeholder="Select category"
            defaultOption={{ label: newNote.category, value: newNote.category }}
          />
        </div>
        <div className="w-full my-3 text-sm">
          <div className="mb-1 text-[#111928]">Viewable by</div>
          <Select
            name="viewAblePerson"
            options={formatArray(VIEW_ABLE_PERSON_LIST)}
            upIcon={faAngleUp}
            defaultOption={{
              label: newNote.viewAblePerson,
              value: newNote.viewAblePerson,
            }}
            onChange={handleInputChange}
            downIcon={faAngleDown}
            placeholder="select user"
          />
        </div>
      </div>
      <div className="w-full my-3 text-sm">
        <div className="mb-1 text-[#111928]">Add Tags</div>
        <MultiSelect
          name="tags"
          multiple
          onChange={handleInputChange}
          options={TAGS}
          upIcon={faAngleUp}
          downIcon={faAngleDown}
          placeholder="add tags"
          iconTopPositionOpen="top-2"
          defaultOptions={formatArray(newNote.tags)}
          readOnly
          iconTopPositionClose="top-2"
        />
      </div>
      <div className="w-full mt-6 pb-20 text-sm">
        {/* <div className="mb-1 text-[#111928]">Add Tags</div> */}
        <textarea
          rows={10}
          value={newNote.notes}
          onChange={handleInputChange}
          name="notes"
          className="focus:outline-none rounded-lg rounded-b-none px-2 border placeholder:text-[#9CA3AF] border-[#D1D5DB] border-b-0 text-sm py-2 w-full focus:border-[#006AF5]"
        />
        <div className="bg-[#F9FAFB] -mt-1.5 border-[#D1D5DB] rounded-lg rounded-t-none p-2  border border-t-0">
          <img src={PaperClip} alt="paper-clip" />
        </div>
      </div>

      <div className="flex absolute  bottom-4 w-[100%] justify-between">
        <button
          // onClick={handleClick}
          className="flex border gap-2 items-center justify-center bg-white
            border-[#E5E7EB] item-center px-4 py-2 rounded-lg text-sm
            text-[#1F2A37]"
        >
          <img src={ClipboardList} alt="ClipboardList" /> Save Note
        </button>
        <button
          className="bg-[#1A56DB] disabled:bg-[#E5E7EB]
            disabled:border-[#E5E7EA] disabled:text-[#1F2A37] flex
            justify-center border border-[#1A56DB] item-center px-4 py-2
            rounded-lg text-sm text-[#FFFFFF]"
        >
          Share With Patient
        </button>
      </div>
    </div>
  );
};

export default CreateNewNote;
