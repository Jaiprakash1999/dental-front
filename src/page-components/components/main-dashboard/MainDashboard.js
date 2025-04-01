import React, { useState } from "react";
import useGetMainDashboard from "./hooks/useGetMainDashboard";
import { useTranslation } from "react-i18next";
import Select from "../../common-components/Select";
import { MMU_UNIT, VISIT_TAGS } from "../../constants/Constant";
import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { formatArray } from "../../utils/formateArray";
import useGetGramPanchayat from "../mmu-admin/hooks/useGetGramPanchayat";
import useGetMondalList from "../mmu-admin/hooks/useGetMondalList";
import useGetHabitat from "../mmu-admin/hooks/useGetHabitat";
import useGetStateDistTehsil from "../mmu-admin/hooks/useGetStateDistTehsil";
import SearchSelectFromAPI from "../../common-components/SearchSelectFromAPI";
import Skeleton from "react-loading-skeleton";
import PrimaryButton from "../../common-components/Buttons/PrimaryButton";

const MainDashboard = () => {
  const { t } = useTranslation();
  const [selectedFilter, setSelectedFilter] = useState({
    mmuUnitName: "",
    tags: "",
    state: "",
    district: "",
    tehshil: "",
    startDate: "",
    endDate: "",
    mandalName: "",
    gramPanchayatName: "",
    habitatName: "",
  });

  const [filterName, setFilterName] = useState("appointment");

  const handleFilterChange = (e) => {
    const { name, value } = e.target || {};
    setSelectedFilter((prev) => ({ ...prev, [name]: value }));
  };

  const handleFilterName = (e) => {
    setFilterName(e);
    setSelectedFilter({
      tags: "",
      state: "",
      district: "",
      tehshil: "",
      startDate: "",
      endDate: "",
      mandalName: "",
      gramPanchayatName: "",
      habitatName: "",
    });
  };

  const { isMainKPIloading, mainDashboardKPI, getMainDashboardKPI } =
    useGetMainDashboard({ selectedFilter });
  const { state, district, tehshil } = useGetStateDistTehsil();
  const { mondalList, isMondalListLoading, getMondalList } = useGetMondalList();
  const { gramPanchayatList, isGramPanchayatLoading, getGramPanchayat } =
    useGetGramPanchayat({ selectedFilter });
  const { habitatList, isHabitatLoading, getHabitatList } = useGetHabitat({
    selectedFilter,
  });

  const {
    malariaCases,
    samCases,
    htnCases,
    diabetes,
    liveBirths,
    // mmuUnitDayAverage = {
    //   // Pinapaka,
    // },
    // mmuUnitMonthAverage = {
    //   // Pinapaka,
    // },
    infantVisits,
    allUnitDayAverage,
    allUnitMonthAverage,
    appointmentForTubectomy = 0,
  } = mainDashboardKPI || {};

  return (
    <div className="text-sm flex  py-5 px-5 text-primary">
      <div className="grid w-[73%] h-1/2 me-5 grid-cols-3 gap-5">
        <div
          className="flex p-5 flex-shrink-0 flex-col text-center justify-center items-center"
          style={{
            boxShadow: " 0px 0px 4px 4px rgba(72, 127, 237, 0.14)",
          }}
        >
          <div className="">
            {t("Avg. Number of Patients served per visit")}
          </div>
          <div className="text-[#6C8BFC] font-semibold text-lg mt-3">
            {isMainKPIloading ? <Skeleton width={100} /> : allUnitDayAverage}
          </div>
        </div>
        <div
          className="flex p-5 flex-shrink-0 flex-col text-center justify-center items-center"
          style={{
            boxShadow: " 0px 0px 4px 4px rgba(72, 127, 237, 0.14)",
          }}
        >
          <div className="">{t("Avg. number of MMU Visits per month")}</div>
          <div className="text-[#6C8BFC] font-semibold text-lg mt-3">
            {isMainKPIloading ? <Skeleton width={100} /> : allUnitMonthAverage}
          </div>
        </div>

        <div
          className="flex p-5 flex-shrink-0 flex-col text-center  justify-center items-center"
          style={{
            background: "#FFF",
            boxShadow: " 0px 0px 4px 4px rgba(72, 127, 237, 0.14)",
          }}
        >
          <div>{t("Total Number of Infant Visits by MMU")}</div>
          <div className="grid w-full grid-cols-2">
            <div>
              <div className="text-[#6C8BFC] font-semibold text-lg mt-3">
                {infantVisits?.unique}
              </div>
              <div>{t("Unique")}</div>
            </div>
            <div>
              <div className="text-[#6C8BFC] font-semibold text-lg mt-3">
                {infantVisits?.repeated}
              </div>
              <div>{t("Repeated")}</div>
            </div>
          </div>
        </div>
        <div
          className="flex p-5 flex-shrink-0 flex-col text-center justify-center items-center"
          style={{
            background: "#FFF",
            boxShadow: " 0px 4px 14px 0px rgba(72, 127, 237, 0.14)",
          }}
        >
          <div>{t("Number of Live Births")}</div>
          <div className="text-[#6C8BFC] font-semibold text-lg mt-3">
            {isMainKPIloading ? <Skeleton width={100} /> : liveBirths}
          </div>
        </div>
        <div
          className="flex p-5 flex-shrink-0 flex-col text-center justify-center items-center"
          style={{
            boxShadow: " 0px 0px 4px 4px rgba(72, 127, 237, 0.14)",
          }}
        >
          <div className="">{t("Number of Malaria Cases")}</div>
          <div className="text-[#6C8BFC] font-semibold text-lg mt-3">
            {isMainKPIloading ? <Skeleton width={100} /> : malariaCases}
          </div>
        </div>
        <div
          className="flex p-5 flex-shrink-0 flex-col text-center justify-center items-center"
          style={{
            boxShadow: " 0px 0px 4px 4px rgba(72, 127, 237, 0.14)",
          }}
        >
          <div className="">{t("Number of SAM Cases")}</div>
          <div className="text-[#6C8BFC] font-semibold text-lg mt-3">
            {isMainKPIloading ? <Skeleton width={100} /> : samCases}
          </div>
        </div>
        <div
          className="flex p-5 flex-shrink-0 flex-col text-center justify-center items-center"
          style={{
            boxShadow: " 0px 0px 4px 4px rgba(72, 127, 237, 0.14)",
          }}
        >
          <div className="">{t("Number of Hypertensions Cases")}</div>
          <div className="text-[#6C8BFC] font-semibold text-lg mt-3">
            {isMainKPIloading ? <Skeleton width={100} /> : htnCases}
          </div>
        </div>
        <div
          className="flex p-5 flex-shrink-0 flex-col text-center justify-center items-center"
          style={{
            boxShadow: " 0px 0px 4px 4px rgba(72, 127, 237, 0.14)",
          }}
        >
          <div className="">{t("Number of Diabetes")}</div>
          <div className="text-[#6C8BFC] font-semibold text-lg mt-3">
            {isMainKPIloading ? <Skeleton width={100} /> : diabetes}
          </div>
        </div>
        <div
          className="flex p-5 flex-shrink-0 flex-col text-center justify-center items-center"
          style={{
            boxShadow: " 0px 0px 4px 4px rgba(72, 127, 237, 0.14)",
          }}
        >
          <div className="">{t("Number of appointments for tubectomy")}</div>
          <div className="text-[#6C8BFC] font-semibold text-lg mt-3">
            {isMainKPIloading ? (
              <Skeleton width={100} />
            ) : (
              appointmentForTubectomy
            )}
          </div>
        </div>
      </div>

      <div className="border w-[27%] p-5 shadow  border-[#EAF1FF]">
        <div className="mb-1">{t("MMU")}</div>
        <div>
          <Select
            options={formatArray(MMU_UNIT)}
            onChange={handleFilterChange}
            defaultOption={{
              label: selectedFilter.mmuUnitName,
              value: selectedFilter.mmuUnitName,
            }}
            name="mmuUnitName"
            readOnly
            required={false}
            upIcon={faAngleUp}
            openTopPosition="top-2"
            closeTopPosition="top-2"
            downIcon={faAngleDown}
            className="border w-full disabled:bg-[#F9FAFB] focus:border-[#2D2E33] text-sm text-gray-800 py-1.5 focus:outline-none rounded-lg placeholder:text-[#D1D5DB] px-3"
          />
        </div>
        <hr className="mt-3"></hr>
        <div className="flex items-center my-3 gap-5">
          <div className="flex items-center">
            <input
              type="radio"
              name="filterBy"
              value="appointment"
              onChange={() => handleFilterName("appointment")}
              checked={filterName === "appointment"}
            />
            <label className="ms-2">{t("Sort by place of appointment")}</label>
          </div>
          <div className="flex ms-5 items-center">
            <input
              type="radio"
              name="filteBy"
              value="nativeAddress"
              onChange={() => handleFilterName("nativeAddress")}
              checked={filterName === "nativeAddress"}
            />
            <label className="ms-2">
              {t("Sort by Patient's Native address")}
            </label>
          </div>
        </div>
        {filterName === "nativeAddress" ? (
          <div className=" w-full items-center">
            <div className="mt-2">
              <div className="mb-1">{t("Mandal")}</div>
              <div>
                <SearchSelectFromAPI
                  getData={getMondalList}
                  options={formatArray(mondalList)}
                  isLoading={isMondalListLoading}
                  name="mandalName"
                  onChange={handleFilterChange}
                  defaultOptions={{}}
                  allowPressEnter={false}
                  placeholder={t("Type")}
                  className="focus:outline-none text-[#2D2E33] font-normal disabled:bg-[#F9FAFB] placeholder:font-normal rounded-lg ps-4 pe-2 border placeholder:text-[#9CA3AF] border-[#D1D5DB] text-sm py-1.5 w-full focus:border-[#2D2E33]"
                />
              </div>
            </div>
            <div className="mt-2">
              <div className="mb-1">{t("Gram Panchayat")}</div>
              <div>
                <SearchSelectFromAPI
                  getData={getGramPanchayat}
                  disabled={selectedFilter.mandalName === ""}
                  options={formatArray(gramPanchayatList)}
                  isLoading={isGramPanchayatLoading}
                  name="gramPanchayatName"
                  onChange={handleFilterChange}
                  defaultOptions={{}}
                  allowPressEnter={false}
                  placeholder={t("Type")}
                  className="focus:outline-none text-[#2D2E33] font-normal disabled:bg-[#F9FAFB] placeholder:font-normal rounded-lg ps-4 pe-2 border placeholder:text-[#9CA3AF] border-[#D1D5DB] text-sm py-1.5 w-full focus:border-[#2D2E33]"
                />
              </div>
            </div>
            <div className="mt-2">
              <div className="mb-1">{t("Habitation")}</div>
              <div>
                <SearchSelectFromAPI
                  getData={getHabitatList}
                  options={formatArray(habitatList)}
                  isLoading={isHabitatLoading}
                  name="habitatName"
                  disabled={
                    selectedFilter.gramPanchayatName === "" ||
                    selectedFilter.mandalName === ""
                  }
                  onChange={handleFilterChange}
                  allowPressEnter={false}
                  placeholder={t("Type")}
                  className="focus:outline-none text-[#2D2E33] font-normal disabled:bg-[#F9FAFB] placeholder:font-normal rounded-lg ps-4 pe-2 border placeholder:text-[#9CA3AF] border-[#D1D5DB] text-sm py-1.5 w-full focus:border-[#2D2E33]"
                />
              </div>
            </div>

            <div className="mt-2">
              <div className="mb-1">{t("Start Date")}</div>
              <div>
                <input
                  name="startDate"
                  type="date"
                  upIcon={faAngleUp}
                  downIcon={faAngleDown}
                  onChange={handleFilterChange}
                  openTopPosition="top-1.5"
                  closeTopPosition="top-1.5"
                  placeholder="Start Date"
                  value={selectedFilter.startDate}
                  className="border w-full focus:border-[#2D2E33] border-[#D1D5DB] text-sm text-gray-800 py-1.5 focus:outline-none rounded-lg placeholder:text-[#D1D5DB] px-2"
                />
              </div>
            </div>
            <div className="mt-2">
              <div className="mb-1">{t("End Date")}</div>
              <div>
                <input
                  type="date"
                  name="endDate"
                  value={selectedFilter.endDate}
                  upIcon={faAngleUp}
                  downIcon={faAngleDown}
                  onChange={handleFilterChange}
                  openTopPosition="top-1.5"
                  closeTopPosition="top-1.5"
                  placeholder="End Date"
                  className="border w-full focus:border-[#2D2E33] border-[#D1D5DB] text-sm text-gray-800 py-1.5 focus:outline-none rounded-lg placeholder:text-[#D1D5DB] px-2"
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="w-full items-center">
            <div className="mt-2">
              <div className="mb-1">{t("State")}</div>
              <div>
                <Select
                  name="state"
                  options={formatArray(state)}
                  upIcon={faAngleUp}
                  downIcon={faAngleDown}
                  openTopPosition="top-1.5"
                  closeTopPosition="top-1.5"
                  placeholder={t("State")}
                  onChange={handleFilterChange}
                />
              </div>
            </div>
            <div className="mt-2">
              <div className="mb-1">{t("District")}</div>
              <div>
                <Select
                  name="district"
                  options={formatArray(district)}
                  upIcon={faAngleUp}
                  downIcon={faAngleDown}
                  openTopPosition="top-1.5"
                  closeTopPosition="top-1.5"
                  placeholder={t("District")}
                  onChange={handleFilterChange}
                />
              </div>
            </div>

            <div className="mt-2">
              <div className="mb-1">{t("Mandal")}</div>
              <div>
                <Select
                  name="mandalName"
                  options={formatArray(tehshil)}
                  upIcon={faAngleUp}
                  downIcon={faAngleDown}
                  onChange={handleFilterChange}
                  openTopPosition="top-1.5"
                  closeTopPosition="top-1.5"
                  placeholder={t("Mandal")}
                />
              </div>
            </div>

            <div className="mt-2">
              <div className="mb-1">{t("Start Date")}</div>
              <div>
                <input
                  name="startDate"
                  type="date"
                  upIcon={faAngleUp}
                  downIcon={faAngleDown}
                  onChange={handleFilterChange}
                  openTopPosition="top-1.5"
                  closeTopPosition="top-1.5"
                  placeholder="Start Date"
                  value={selectedFilter.startDate}
                  className="border w-full focus:border-[#2D2E33] border-[#D1D5DB] text-sm text-gray-800 py-1.5 focus:outline-none rounded-lg placeholder:text-[#D1D5DB] px-2"
                />
              </div>
            </div>
            <div className="mt-2">
              <div className="mb-1">{t("End Date")}</div>
              <div>
                <input
                  type="date"
                  name="endDate"
                  value={selectedFilter.endDate}
                  upIcon={faAngleUp}
                  downIcon={faAngleDown}
                  onChange={handleFilterChange}
                  openTopPosition="top-1.5"
                  closeTopPosition="top-1.5"
                  placeholder="End Date"
                  className="border w-full focus:border-[#2D2E33] border-[#D1D5DB] text-sm text-gray-800 py-1.5 focus:outline-none rounded-lg placeholder:text-[#D1D5DB] px-2"
                />
              </div>
            </div>
          </div>
        )}
        <div className=" mt-2 items-center w-full">
          <div className=" text-[#000000] font-normal">{t("Tags")}</div>
          <div className="">
            <Select
              upIcon={faAngleUp}
              options={formatArray(VISIT_TAGS)}
              labelKey="label"
              valueKey="value"
              name="tags"
              onChange={handleFilterChange}
              downIcon={faAngleDown}
              iconTopPositionClose="top-1.5"
              iconTopPositionOpen="top-1.5"
            />
          </div>
        </div>

        <div className="flex justify-end mt-5">
          <PrimaryButton
            buttonName={t("Apply")}
            onClick={() => getMainDashboardKPI()}
            disabled={isMainKPIloading}
          />
        </div>
      </div>
    </div>
  );
};

export default MainDashboard;
