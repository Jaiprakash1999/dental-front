import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import useGetAllPatient from "./hooks/useGetAllPatient";
import SearchInput from "../../common-components/SearchInput";
import Pagination from "../../common-components/Pagination";
import ListLoader from "../../common-components/ListLoader";
import AlertButton from "../../common-components/Buttons/AlertButton";
import { FaAngleDown, FaAngleUp, FaPen } from "react-icons/fa6";
import useDeletePatient from "./hooks/useDeletePatient";
import useUpdatePatientDetail from "./hooks/useUpdatePatientDetail";
import { ToastContainer } from "react-toastify";
import EditableForm from "./EditableForm";
import { firstLetterCapital } from "../../utils/firstLetterCapital";
import moment from "moment";
import Avatar from "react-avatar";
import { useNavigate } from "react-router-dom";
import FilterModal from "./FilterModal";
import PrimaryButton from "../../common-components/Buttons/PrimaryButton";

const PatientList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isFilterModal, setIsFilterModal] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const { t } = useTranslation();
  const navigate = useNavigate();
  const filterRef = useRef(null);
  const [isAccordian, setIsAccordian] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [isEditable, setIsEditable] = useState(false);
  const [currentItem, setCurrentItem] = useState({});
  const [editAbleForm, setEditAbleForm] = useState({
    id: null,
    name: "",
    address: "",
    age: 0,
    gender: "",
    bloodGroup: "",
    habitat: "",
    patientTag: "",
    habitatId: 0,
  });

  const [filterName, setFilterName] = useState({
    gender: [],
    minAge: "",
    maxAge: "",
    lastChiefComplaint: "",
    patientTag: [],
    registrationStartDate: "",
    registrationEndDate: "",
    lastVisitStartDate: "",
    lastVisitEndDate: "",
  });

  const handleFilterChange = (e) => {
    const { value, name, type } = e.target || {};

    const parseFloatValue = type === "number" ? parseFloat(value) : value;

    if (Array.isArray(filterName[name])) {
      if (filterName[name].includes(value)) {
        const filterId = filterName[name].filter(
          (filterValue) => filterValue !== value
        );
        setFilterName((prev) => ({ ...prev, [name]: filterId }));
      } else {
        setFilterName((prev) => ({ ...prev, [name]: [...prev[name], value] }));
      }
    } else {
      setFilterName((prev) => ({ ...prev, [name]: parseFloatValue }));
    }
  };

  const handleMultipleAccordian = async (id) => {
    const newIsAccordian = [...isAccordian];
    if (newIsAccordian.includes(id)) {
      const filterId = newIsAccordian.filter(
        (accordianId) => accordianId !== id
      );
      setIsAccordian(filterId);
    } else {
      const filterId = [...isAccordian, id];
      setIsAccordian(filterId);
    }
  };

  const onEdit = async (item) => {
    const { id } = item || {};
    setSelectedId(id);
    setIsEditable(true);
    setCurrentItem(item);
    setEditAbleForm(item);
  };

  const handleChange = (e) => {
    const { value } = e.target || {};
    setInputValue(value);
  };
  const { patientList, onShowMore, isPatientListLoading, getPatientList } =
    useGetAllPatient({
      inputValue,
      currentPage,
      filterName,
    });

  const { patients = [], total } = patientList || {};
  const { onDelete, isPatientDeleting } = useDeletePatient({ getPatientList });
  const { onUpdate, isUpdating } = useUpdatePatientDetail({
    editAbleForm,
    getPatientList,
    setIsEditable,
  });

  const handRouteToPatientRecord = (id) => {
    navigate("/doctor", {
      state: { patientId: id, visit: false },
    });
  };

  const handleClickOutSide = (event) => {
    if (filterRef.current && !filterRef.current.contains(event.target)) {
      setIsFilterModal(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutSide);
    return () => {
      document.removeEventListener("mousedown", handleClickOutSide);
    };
  }, [isFilterModal]);

  return (
    <div>
      <ToastContainer />
      <div className="p-5 text-primary text-sm">
        <div className="flex relative text-base items-center justify-between mb-2">
          <h1 className="ms-5">{t("Patient List")}</h1>
          <div className="w-1/3 flex gap-x-5  items-center justify-between">
            <div>
              <PrimaryButton
                onClick={() => setIsFilterModal((prev) => !prev)}
                buttonName={t("Filters")}
              />
            </div>
            <div className="w-full">
              <SearchInput inputValue={inputValue} onChange={handleChange} />
            </div>
          </div>
          {isFilterModal ? (
            <div ref={filterRef} className="top-10  right-0 absolute ">
              <FilterModal
                filterName={filterName}
                handleFilterChange={handleFilterChange}
                getPatientList={getPatientList}
              />
            </div>
          ) : null}
        </div>

        <div className="border mb-16 mt-5">
          <div className="grid text-base border-b uppercase items-center grid-cols-8 bg-[#F9FAFB] text-[#6B7280]">
            <div className="border-r p-2 border-[#D7D7D7]">
              {t("Patient ID")}
            </div>
            <div className="border-r p-2 border-[#D7D7D7]">
              {t("Patient Name")}
            </div>
            <div className="border-r p-2 border-[#D7D7D7]">{t("Address")}</div>
            <div className="border-r p-2 border-[#D7D7D7]">
              {t("Gender")} ({t("Age")})
            </div>
            <div className="border-r p-2 border-[#D7D7D7]">
              {t("Date Of Birth")}
            </div>
            <div className="border-r p-2 border-[#D7D7D7]">
              {t("Blood Group")}
            </div>
            <div className="border-r p-2 border-[#D7D7D7]">
              {t("Patient Tag")}
            </div>
          </div>
          <div>
            {isPatientListLoading ? (
              <ListLoader />
            ) : (
              patients.map((item, index) => {
                const {
                  id,
                  name,
                  gender,
                  age,
                  habitat,
                  patientTag,
                  address,
                  lastVisitCheifComplaint = [],
                  bloodGroup,
                  registrationTag,
                  registeredAt,
                  registeredBy,
                  lastVisitDate,
                  upcomingVisitDate,
                  thumbnail,
                  dob,
                } = item || {};

                return (
                  <div
                    key={id}
                    className="border-b last:border-b-0 border-[#E7F4FF]"
                  >
                    <div
                      key={index}
                      className="grid  grid-cols-8  items-center"
                    >
                      <div
                        onClick={() => handRouteToPatientRecord(id)}
                        className="p-3"
                      >
                        {id}
                      </div>
                      <div className="p-3">{name || "--"}</div>
                      <div className="p-3">{address || "--"} </div>
                      <div className="p-3">
                        {gender} ({age || "--"})
                      </div>
                      <div className="p-3">{dob}</div>
                      <div className="p-3  ">{bloodGroup || "--"}</div>
                      <div className="p-3  ">
                        {patientTag || registrationTag || "--"}
                      </div>
                      <div className="p-3 flex  justify-between items-center">
                        <button onClick={() => onEdit(item)}>
                          <FaPen color="#4C6AF7" />
                        </button>
                        <AlertButton
                          disabled={isPatientDeleting && selectedId === id}
                          onClick={() => {
                            setSelectedId(id);
                            onDelete(id);
                          }}
                          buttonName={
                            selectedId === id && isPatientDeleting
                              ? "Deleting..."
                              : `${t("Delete")}`
                          }
                        />

                        <button
                          onClick={async () => {
                            await onShowMore(id);
                            handleMultipleAccordian(id);
                          }}
                        >
                          {isAccordian.includes(id) ? (
                            <FaAngleUp />
                          ) : (
                            <FaAngleDown />
                          )}
                        </button>
                      </div>
                    </div>
                    {isAccordian.includes(id) ? (
                      <div className="grid grid-cols-7">
                        <div className="px-2 py-3">
                          {thumbnail === undefined ||
                          thumbnail === "" ||
                          thumbnail === null ? (
                            <Avatar name={name} size="30" round={true} />
                          ) : (
                            <img
                              src={`data:image/jpeg;base64,${thumbnail}`}
                              alt="thumbnail"
                              className="h-10 w-10 rounded-full"
                            />
                          )}
                        </div>
                        <div className=" px-2   py-3">
                          <div className="text-sm text-secondary">
                            {t("Registered At")}
                          </div>
                          <div className="">
                            {registeredAt === undefined
                              ? "--"
                              : moment(registeredAt).format(
                                  "DD-MM-yyyy | hh:mm A"
                                )}
                          </div>
                        </div>
                        <div className="px-2 py-3">
                          <div className="text-sm text-secondary">
                            {t("Registered By")}
                          </div>
                          <div className="">{registeredBy || "--"}</div>
                        </div>
                        <div className="px-2 py-3">
                          <div className="text-sm text-secondary">
                            {t("Habitation")}
                          </div>
                          <div className="">{habitat || "--"}</div>
                        </div>

                        <div className=" px-2 py-3">
                          <div className="text-sm text-secondary">
                            {t("Last")} {t("Visit Date")}
                          </div>
                          <div>
                            {lastVisitDate === null ||
                            lastVisitDate === undefined
                              ? "--"
                              : moment(lastVisitDate).format("DD-MM-yyyy")}
                          </div>
                        </div>
                        <div className="px-2 gap-1 py-3">
                          <div className="text-sm text-secondary">
                            {t("Upcoming")} {t("Visit Date")}
                          </div>
                          <div className="">
                            {upcomingVisitDate === null ||
                            upcomingVisitDate === undefined
                              ? "--"
                              : moment(upcomingVisitDate).format("DD-MM-yyyy")}
                          </div>
                        </div>
                        <div className="px-2 py-3">
                          <div className="text-sm text-secondary">
                            {t("Last")} {t("Chief Complaint")}
                          </div>
                          <div>
                            {lastVisitCheifComplaint === null ||
                            lastVisitCheifComplaint.length === 0
                              ? "--"
                              : lastVisitCheifComplaint.map((item, index) => {
                                  return (
                                    <div key={index} className="me-1">
                                      {firstLetterCapital(item)}
                                      {index ===
                                      lastVisitCheifComplaint.length - 1
                                        ? null
                                        : ","}
                                    </div>
                                  );
                                })}
                          </div>
                        </div>
                      </div>
                    ) : null}
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
      {isEditable && (
        <EditableForm
          editAbleForm={editAbleForm}
          setEditAbleForm={setEditAbleForm}
          isEditable={isEditable}
          setIsEditable={setIsEditable}
          item={currentItem}
          onUpdate={onUpdate}
          isUpdating={isUpdating}
        />
      )}
      <div
        className="bg-white w-[95.6%] fixed bottom-0 p-3"
        style={{ boxShadow: "0px 0px 1px rgba(0,0,0,0.2)" }}
      >
        <Pagination
          totalRecords={total}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default PatientList;
