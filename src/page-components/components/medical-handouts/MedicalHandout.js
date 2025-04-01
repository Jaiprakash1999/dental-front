import React, { useState } from "react";
import SearchInput from "../../common-components/SearchInput";
import { useTranslation } from "react-i18next";
import useGetMedicalHandouts from "./hooks/useGetMedicalHandouts";
import ListLoader from "../../common-components/ListLoader";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

const MedicalHandout = () => {
  const { t } = useTranslation();
  const [searchValue, setSearchValue] = useState("");
  const [selectedTag, setSelectedTag] = useState("");
  const handleChange = (e) => {
    setSearchValue(e.target.value);
  };

  const {
    allMedicalTags,
    isTagLoading,
    getAllMedicalHandoubtsByTag,
    isHandoutsByTag,
  } = useGetMedicalHandouts({
    searchValue,
  });

  return (
    <div className="p-5">
      <ToastContainer />
      <div className="flex justify-end">
        <div className="w-[40%]">
          <SearchInput inputValue={searchValue} onChange={handleChange} />
        </div>
      </div>
      <div className="bg-[#F9FAFB] mt-3 uppercase px-2 text-secondary py-2 grid grid-cols-3">
        <div>{t("Educational Handouts")}</div>
        <div>{t("In English")}</div>
        <div>{t("In Telugu")}</div>
        {/* <div>{t("In Hindi")}</div> */}
      </div>

      <div className="text-sm text-primary">
        {isTagLoading ? (
          <ListLoader />
        ) : (
          <>
            {allMedicalTags.length === 0 ? (
              <div className="text-center p-4 text-red-500">
                No Handouts Available !
              </div>
            ) : (
              allMedicalTags.map((item) => {
                return (
                  <div className="grid hover:bg-[#F6F9FF] px-2 py-2 border-b last:border-b-0 grid-cols-3">
                    <div>{item}</div>
                    <div>
                      <button
                        disabled={isHandoutsByTag}
                        onClick={() => {
                          setSelectedTag(item);
                          getAllMedicalHandoubtsByTag(item, "English");
                        }}
                        className={
                          isHandoutsByTag ? "text-secondary" : "text-[#4C6AF7]"
                        }
                      >
                        {selectedTag === item && isHandoutsByTag
                          ? t("Loading")
                          : t("Download")}
                      </button>
                    </div>
                    <div>
                      <button
                        disabled={isHandoutsByTag}
                        className={
                          isHandoutsByTag ? "text-secondary" : "text-[#4C6AF7]"
                        }
                        onClick={() => {
                          setSelectedTag(item);
                          getAllMedicalHandoubtsByTag(item, "Telugu");
                        }}
                      >
                        {selectedTag === item && isHandoutsByTag
                          ? t("Loading")
                          : t("Download")}
                      </button>
                    </div>
                    {/* <div>
                      <button
                        disabled={isHandoutsByTag}
                        className={
                          isHandoutsByTag ? "text-secondary" : "text-[#4C6AF7]"
                        }
                        onClick={() => {
                          setSelectedTag(item);
                          getAllMedicalHandoubtsByTag(item, "Hindi");
                        }}
                      >
                        {selectedTag === item && isHandoutsByTag
                          ? t("Loading")
                          : t("Download")}
                      </button>
                    </div> */}
                  </div>
                );
              })
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default MedicalHandout;
