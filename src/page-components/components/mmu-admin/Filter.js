import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";
import Select from "../../common-components/Select";
import useGetStateDistTehsil from "./hooks/useGetStateDistTehsil";
import { formatArray } from "../../utils/formateArray";
import { useTranslation } from "react-i18next";
import useGetMondalList from "./hooks/useGetMondalList";
import useGetGramPanchayat from "./hooks/useGetGramPanchayat";
import useGetHabitat from "./hooks/useGetHabitat";
import SearchSelectFromAPI from "../../common-components/SearchSelectFromAPI";

const Filter = ({
  handleFilterChange = () => {},
  selectedFilter = {},
  setSelectedFilter = () => {},
}) => {
  const [filterName, setFilterName] = useState("appointment");
  const { t } = useTranslation();
  const { state, district, tehsil } = useGetStateDistTehsil();
  const { mondalList, isMondalListLoading, getMondalList } = useGetMondalList();
  const { gramPanchayatList, isGramPanchayatLoading, getGramPanchayat } =
    useGetGramPanchayat({ selectedFilter });
  const { habitatList, isHabitatLoading, getHabitatList } = useGetHabitat({
    selectedFilter,
  });

  const handleFilterName = (e) => {
    setFilterName(e);
    setSelectedFilter({
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

  console.log(selectedFilter, "selctedfilter");
  return (
    <div className="text-sm text-primary">
      <div className="flex mb-2 items-center gap-5">
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
        <div className="flex justify-between w-full items-center">
          <div className="grid grid-cols-3 gap-x-5 w-[50%] ">
            <div>
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
                  // isOnClear={isOnClear}
                  // setIsOnClear={setIsOnClear}
                  placeholder={t("Type")}
                  className="focus:outline-none text-[#2D2E33] font-normal disabled:bg-[#F9FAFB] placeholder:font-normal rounded-lg ps-4 pe-2 border placeholder:text-[#9CA3AF] border-[#D1D5DB] text-sm py-1.5 w-full focus:border-[#2D2E33]"
                />
              </div>
            </div>
            <div>
              <div className="mb-1">{t("Gram Panchayat")}</div>
              <div>
                <SearchSelectFromAPI
                  getData={getGramPanchayat}
                  options={formatArray(gramPanchayatList)}
                  isLoading={isGramPanchayatLoading}
                  name="gramPanchayatName"
                  disabled={selectedFilter.mandalName === ""}
                  onChange={handleFilterChange}
                  defaultOptions={{}}
                  allowPressEnter={false}
                  placeholder={t("Type")}
                  className="focus:outline-none text-[#2D2E33] font-normal disabled:bg-[#F9FAFB] placeholder:font-normal rounded-lg ps-4 pe-2 border placeholder:text-[#9CA3AF] border-[#D1D5DB] text-sm py-1.5 w-full focus:border-[#2D2E33]"
                />
              </div>
            </div>
            <div>
              <div className="mb-1">{t("Habitation")}</div>
              <div>
                <SearchSelectFromAPI
                  getData={getHabitatList}
                  options={formatArray(habitatList)}
                  isLoading={isHabitatLoading}
                  disabled={
                    selectedFilter.gramPanchayatName === "" ||
                    selectedFilter.mandalName === ""
                  }
                  name="habitatName"
                  onChange={handleFilterChange}
                  allowPressEnter={false}
                  defaultOptions={{}}
                  placeholder={t("Type")}
                  className="focus:outline-none text-[#2D2E33] font-normal disabled:bg-[#F9FAFB] placeholder:font-normal rounded-lg ps-4 pe-2 border placeholder:text-[#9CA3AF] border-[#D1D5DB] text-sm py-1.5 w-full focus:border-[#2D2E33]"
                />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 w-[30%] gap-5">
            <div>
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
            <div>
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
        </div>
      ) : (
        <div className="flex justify-between w-full items-center">
          <div className="grid grid-cols-3 gap-x-5 w-[50%] ">
            <div>
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
            <div>
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
            <div>
              <div className="mb-1">{t("Mandal")}</div>
              <div>
                <Select
                  name="tehshil"
                  options={formatArray(tehsil)}
                  upIcon={faAngleUp}
                  downIcon={faAngleDown}
                  onChange={handleFilterChange}
                  openTopPosition="top-1.5"
                  closeTopPosition="top-1.5"
                  placeholder={t("Tehsil")}
                />
              </div>
            </div>
            {/* <div>
              <div className="mb-1">{t("Mandal")}</div>
              <div>
                <Select
                  name="mandalName"
                  options={formatArray(mondal)}
                  upIcon={faAngleUp}
                  downIcon={faAngleDown}
                  onChange={handleFilterChange}
                  openTopPosition="top-1.5"
                  closeTopPosition="top-1.5"
                  placeholder={t("Mandal")}
                />
              </div>
            </div> */}
          </div>
          <div className="grid grid-cols-2 w-[30%] gap-5">
            <div>
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
            <div>
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
        </div>
      )}
    </div>
  );
};

export default Filter;
