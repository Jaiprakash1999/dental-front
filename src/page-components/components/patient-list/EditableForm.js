import React from "react";
import Modal from "../../common-components/Modal";
import { useTranslation } from "react-i18next";
import { BLOOD_GROUP_OPTIONS, GENDER, TAGS } from "../../constants/Constant";
import Select from "../../common-components/Select";
import SearchSelectFromAPI from "../../common-components/SearchSelectFromAPI";
import useGetHabitations from "../hip/dashboard/add-new-patient-options/skip-abha/hooks/useGetHabitations";
import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { formatArrayForHabitations } from "../../utils/formateArray";
import PrimaryButton from "../../common-components/Buttons/PrimaryButton";
import SecondaryButton from "../../common-components/Buttons/SecondaryButton";

const EditableForm = ({
  editAbleForm = {},
  setEditAbleForm = () => {},
  isEditable = false,
  setIsEditable = () => {},
  onUpdate = () => {},
  isUpdating = false,
  item = {},
}) => {
  const { t } = useTranslation();
  const { habitation, isHbaitaionLoading, getHabiations } = useGetHabitations();

  const handleEdit = async (e) => {
    const { name, value, id } = e.target || {};
    if (name === "habitat" && id !== undefined) {
      setEditAbleForm((prev) => ({ ...prev, [name]: value, habitatId: id }));
    } else {
      setEditAbleForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const onUndo = () => {
    setEditAbleForm(item);
  };

  const isFormValid = () => {
    const requiredFields = ["name", "age", "gender", "habitat"];

    return requiredFields.every((field) => editAbleForm[field] !== "");
  };

  console.log(editAbleForm, "editableForm");
  return (
    <div>
      <Modal
        modalWidth="w-1/2"
        modalHeight="min-h-1/2"
        showModal={isEditable}
        onClose={() => setIsEditable(false)}
      >
        <div className="p-5">
          <div className="flex mt-2 text-sm text-[#2D2E33] ">
            <label className="mb-1">{t("Patient Name")} : </label>
            <div className="font-medium ms-2">{editAbleForm.name}</div>
            {/* <input
              type="text"
              disabled
              name="name"
              placeholder={t("name")}
              value={editAbleForm.name}
              onChange={handleEdit}
              className="border  bg-gray-300 focus:border-[#2D2E33] text-sm text-gray-800 py-2 focus:outline-none rounded-lg placeholder:text-[#D1D5DB] px-3"
            /> */}
          </div>
          <div className="grid grid-cols-2 items-center mt-1 space-x-3">
            <div className="text-sm text-[#2D2E33]  py-2 flex flex-col">
              <div className="mb-1">{t("Gender")}*</div>
              <Select
                options={GENDER}
                name="gender"
                placeholder="gender"
                value={editAbleForm.gender}
                onChange={handleEdit}
                required={false}
                readOnly
                upIcon={faAngleUp}
                openTopPosition="top-2"
                closeTopPosition="top-2"
                downIcon={faAngleDown}
                defaultOption={{
                  label: editAbleForm.gender,
                  value: editAbleForm.gender,
                }}
                className="border w-full bg-[#F9FAFB] focus:border-[#2D2E33] text-sm text-gray-800 py-2 focus:outline-none rounded-lg placeholder:text-[#D1D5DB] px-3"
              />
            </div>

            <div className="text-sm flex flex-col text-[#2D2E33]  py-2">
              <label className="mb-1">{t("Age")}*</label>
              <input
                type="text"
                onChange={handleEdit}
                placeholder="Age"
                name="age"
                value={editAbleForm.age}
                className="focus:outline-none text-[#2D2E33] bg-[#F9FAFB] font-normal rounded-lg ps-4 border placeholder:text-[#9CA3AF] placeholder:font-normal  border-[#D1D5DB] text-sm py-2 w-full focus:border-[#2D2E33]"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 mb-2 space-x-3 items-center">
            <div className="text-sm text-[#2D2E33] flex-col">
              <label className="mb-1">{t("Blood Group")}</label>
              <Select
                options={BLOOD_GROUP_OPTIONS}
                readOnly
                name="bloodGroup"
                upIcon={faAngleUp}
                downIcon={faAngleDown}
                openTopPosition="top-2"
                closeTopPosition="top-2"
                onChange={handleEdit}
                defaultOption={{
                  label: editAbleForm.bloodGroup,
                  value: editAbleForm.bloodGroup,
                }}
                className="focus:outline-none text-[#2D2E33] bg-[#F9FAFB] font-normal rounded-lg ps-4 border placeholder:text-[#9CA3AF] placeholder:font-normal  border-[#D1D5DB] text-sm py-2 w-full focus:border-[#2D2E33]"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm mb-0.5 text-[#111928]">
                {t("Tags")}*
              </label>
              <Select
                options={TAGS}
                readOnly
                name="patientTag"
                upIcon={faAngleUp}
                downIcon={faAngleDown}
                openTopPosition="top-2"
                closeTopPosition="top-2"
                onChange={handleEdit}
                defaultOption={{
                  label: editAbleForm.patientTag,
                  value: editAbleForm.patientTag,
                }}
                className="focus:outline-none text-[#2D2E33] bg-[#F9FAFB] font-normal rounded-lg ps-4 border placeholder:text-[#9CA3AF] placeholder:font-normal  border-[#D1D5DB] text-sm py-2 w-full focus:border-[#2D2E33]"
              />
            </div>
          </div>
          <div className="text-sm text-[#2D2E33] mb-2 flex-col">
            <label className="mb-1">{t("Habitation")}*</label>
            <SearchSelectFromAPI
              getData={getHabiations}
              options={formatArrayForHabitations(habitation)}
              isLoading={isHbaitaionLoading}
              name="habitat"
              onChange={handleEdit}
              defaultOptions={{
                label: editAbleForm.habitat,
                value: editAbleForm.habitat,
                id: editAbleForm.habitatId,
              }}
              allowPressEnter={false}
              placeholder={t("Type")}
              className="focus:outline-none text-[#2D2E33] font-normal bg-[#F9FAFB] placeholder:font-normal rounded-lg ps-4 pe-2 border placeholder:text-[#9CA3AF] border-[#D1D5DB] text-sm py-2 w-full focus:border-[#2D2E33]"
            />
          </div>
          <div className="text-sm text-[#2D2E33] flex mt-1 mb-2 flex-col">
            <label className="mb-1">{t("Address")}</label>
            <textarea
              type="text"
              name="address"
              value={editAbleForm.address}
              placeholder={t("Address")}
              rows={3}
              onChange={(e) => handleEdit(e, 0)}
              className="border bg-[#F9FAFB] focus:border-[#2D2E33] text-sm text-gray-800 py-2 focus:outline-none rounded-lg placeholder:text-[#D1D5DB] px-3"
            />
          </div>
          <div className="flex gap-5 mt-5 justify-end ">
            <SecondaryButton buttonName={t("Reset")} onClick={onUndo} />
            <PrimaryButton
              onClick={onUpdate}
              disabled={!isFormValid() || isUpdating}
              type={t("submit")}
              buttonName={t("Update")}
              className="bg-[#4C6AF7] hover:border-[#D8E3FF] disabled:bg-[#F9FAFB] disabled:border-[#C6C7C9] disabled:text-[#A2A3A7] flex justify-center border border-[#1A56DB] item-center px-6 py-2 rounded-lg text-sm text-[#FFFFFF]"
            />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default EditableForm;
