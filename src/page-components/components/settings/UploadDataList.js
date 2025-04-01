import React from "react";
import { useTranslation } from "react-i18next";
import useUploadData from "./hooks/useUploadData";
import PrimaryButton from "../../common-components/Buttons/PrimaryButton";
import backArrow from "../../../images/back_arrow.svg";
import Skeleton from "react-loading-skeleton";
import MMUdataList from "./MMUdataList";
const { REACT_APP_IS_ONLINE } = process.env || {};

const UploadDataList = ({ setActiveSetting = () => {} }) => {
  const { t } = useTranslation();
  const { onSyncData, isSyncDataLoading, syncData } = useUploadData();
  const {
    antenatalCare,
    antenatalVisit,
    babyCare,
    broadCast,
    careOfBaby,
    chat,
    labInvestigations,
    patient,
    postnatalCare,
    postpartumCare,
    pregnancyOverview,
    prescription,
    prescriptionRx,
    screeningForm,
    template,
    templateRx,
    user,
    vaccinationForm,
    visit,
    vitalForm,
  } = syncData || {};

  return (
    <div className="text-sm">
      <div className="mt-5">
        <button onClick={() => setActiveSetting(null)}>
          <img src={backArrow} alt="backArrow" />
        </button>
      </div>

      {REACT_APP_IS_ONLINE === "true" ? <MMUdataList /> : null}

      {REACT_APP_IS_ONLINE === "false" ? (
        <div>
          <div className="flex mt-2 justify-between items-center">
            <div>{t("Data Sync")}</div>

            <div>
              <PrimaryButton
                buttonName={t("Upload data")}
                disabled={isSyncDataLoading}
                onClick={onSyncData}
              />
            </div>
          </div>
          <div className="border mt-5">
            <div className="flex border-b justify-between text-secondary   bg-[#F9FAFB] p-2">
              <div className="w-[70%]"> {t("Data Name")}</div>
              <div className="w-[30%]">{t("Status")}</div>
            </div>

            <div className="p-2 w-full flex justify-between">
              <div className="w-[70%]">
                <div className="p-2 border-b">{t("Antenatal Care")}</div>
                <div className="p-2 border-b">{t("Antenatal Visit")}</div>
                <div className="p-2 border-b">{t("Baby Care")}</div>
                <div className="p-2 border-b">{t("Broad Cast")}</div>
                <div className="p-2 border-b">{t("Care Of Baby")}</div>
                <div className="p-2 border-b">{t("Chat")}</div>
                <div className="p-2 border-b">{t("Lab Investigations")}</div>
                <div className="p-2 border-b">{t("Patient")}</div>
                <div className="p-2 border-b">{t("Postnatal Care")}</div>
                <div className="p-2 border-b">{t("Postpartum Care")}</div>
                <div className="p-2 border-b">{t("Pregnancy Overview")}</div>
                <div className="p-2 border-b">{t("Prescription")}</div>
                <div className="p-2 border-b">{t("Prescription Rx")}</div>
                <div className="p-2 border-b">{t("Screening Form")}</div>
                <div className="p-2 border-b">{t("Template")}</div>
                <div className="p-2 border-b">{t("Template Rx")}</div>
                <div className="p-2 border-b">{t("User")}</div>
                <div className="p-2 border-b">{t("Vaccination Form")}</div>
                <div className="p-2 border-b">{t("Visit")}</div>
                <div className="p-2">{t("Vital Form")}</div>
              </div>
              <div className="w-[30%]">
                <div className="p-2 border-b">
                  {isSyncDataLoading ? (
                    <Skeleton width={100} />
                  ) : antenatalCare ? (
                    <span className="text-[#2AAF2A]">{t("Uploaded")}</span>
                  ) : (
                    <>
                      {antenatalCare === false ? (
                        <span className="text-red-500"> {t("Error")}</span>
                      ) : (
                        <span className="text-[#A6A6A6]">
                          {" "}
                          {t("Not Uploaded")}
                        </span>
                      )}
                    </>
                  )}
                </div>
                <div className="p-2 border-b">
                  {isSyncDataLoading ? (
                    <Skeleton width={100} />
                  ) : antenatalVisit ? (
                    <span className="text-[#2AAF2A]">{t("Uploaded")}</span>
                  ) : (
                    <>
                      {antenatalVisit === false ? (
                        <span className="text-red-500"> {t("Error")}</span>
                      ) : (
                        <span className="text-[#A6A6A6]">
                          {" "}
                          {t("Not Uploaded")}
                        </span>
                      )}
                    </>
                  )}
                </div>
                <div className="p-2 border-b">
                  {isSyncDataLoading ? (
                    <Skeleton width={100} />
                  ) : babyCare ? (
                    <span className="text-[#2AAF2A]">{t("Uploaded")}</span>
                  ) : (
                    <>
                      {babyCare === false ? (
                        <span className="text-red-500"> {t("Error")}</span>
                      ) : (
                        <span className="text-[#A6A6A6]">
                          {" "}
                          {t("Not Uploaded")}
                        </span>
                      )}
                    </>
                  )}
                </div>
                <div className="p-2 border-b">
                  {isSyncDataLoading ? (
                    <Skeleton width={100} />
                  ) : broadCast ? (
                    <span className="text-[#2AAF2A]">{t("Uploaded")}</span>
                  ) : (
                    <>
                      {broadCast === false ? (
                        <span className="text-red-500"> {t("Error")}</span>
                      ) : (
                        <span className="text-[#A6A6A6]">
                          {" "}
                          {t("Not Uploaded")}
                        </span>
                      )}
                    </>
                  )}
                </div>
                <div className="p-2 border-b">
                  {isSyncDataLoading ? (
                    <Skeleton width={100} />
                  ) : careOfBaby ? (
                    <span className="text-[#2AAF2A]">{t("Uploaded")}</span>
                  ) : (
                    <>
                      {careOfBaby === false ? (
                        <span className="text-red-500"> {t("Error")}</span>
                      ) : (
                        <span className="text-[#A6A6A6]">
                          {" "}
                          {t("Not Uploaded")}
                        </span>
                      )}
                    </>
                  )}
                </div>
                <div className="p-2 border-b">
                  {isSyncDataLoading ? (
                    <Skeleton width={100} />
                  ) : chat ? (
                    <span className="text-[#2AAF2A]">{t("Uploaded")}</span>
                  ) : (
                    <>
                      {chat === false ? (
                        <span className="text-red-500"> {t("Error")}</span>
                      ) : (
                        <span className="text-[#A6A6A6]">
                          {" "}
                          {t("Not Uploaded")}
                        </span>
                      )}
                    </>
                  )}
                </div>
                <div className="p-2 border-b">
                  {isSyncDataLoading ? (
                    <Skeleton width={100} />
                  ) : labInvestigations ? (
                    <span className="text-[#2AAF2A]">{t("Uploaded")}</span>
                  ) : (
                    <>
                      {labInvestigations === false ? (
                        <span className="text-red-500"> {t("Error")}</span>
                      ) : (
                        <span className="text-[#A6A6A6]">
                          {" "}
                          {t("Not Uploaded")}
                        </span>
                      )}
                    </>
                  )}
                </div>
                <div className="p-2 border-b">
                  {isSyncDataLoading ? (
                    <Skeleton width={100} />
                  ) : patient ? (
                    <span className="text-[#2AAF2A]">{t("Uploaded")}</span>
                  ) : (
                    <>
                      {patient === false ? (
                        <span className="text-red-500"> {t("Error")}</span>
                      ) : (
                        <span className="text-[#A6A6A6]">
                          {" "}
                          {t("Not Uploaded")}
                        </span>
                      )}
                    </>
                  )}
                </div>
                <div className="p-2 border-b">
                  {isSyncDataLoading ? (
                    <Skeleton width={100} />
                  ) : postnatalCare ? (
                    <span className="text-[#2AAF2A]">{t("Uploaded")}</span>
                  ) : (
                    <>
                      {postnatalCare === false ? (
                        <span className="text-red-500"> {t("Error")}</span>
                      ) : (
                        <span className="text-[#A6A6A6]">
                          {" "}
                          {t("Not Uploaded")}
                        </span>
                      )}
                    </>
                  )}
                </div>
                <div className="p-2 border-b">
                  {isSyncDataLoading ? (
                    <Skeleton width={100} />
                  ) : postpartumCare ? (
                    <span className="text-[#2AAF2A]">{t("Uploaded")}</span>
                  ) : (
                    <>
                      {postpartumCare === false ? (
                        <span className="text-red-500"> {t("Error")}</span>
                      ) : (
                        <span className="text-[#A6A6A6]">
                          {" "}
                          {t("Not Uploaded")}
                        </span>
                      )}
                    </>
                  )}
                </div>
                <div className="p-2 border-b">
                  {isSyncDataLoading ? (
                    <Skeleton width={100} />
                  ) : pregnancyOverview ? (
                    <span className="text-[#2AAF2A]">{t("Uploaded")}</span>
                  ) : (
                    <>
                      {pregnancyOverview === false ? (
                        <span className="text-red-500"> {t("Error")}</span>
                      ) : (
                        <span className="text-[#A6A6A6]">
                          {" "}
                          {t("Not Uploaded")}
                        </span>
                      )}
                    </>
                  )}
                </div>
                <div className="p-2 border-b">
                  {isSyncDataLoading ? (
                    <Skeleton width={100} />
                  ) : prescription ? (
                    <span className="text-[#2AAF2A]">{t("Uploaded")}</span>
                  ) : (
                    <>
                      {prescription === false ? (
                        <span className="text-red-500"> {t("Error")}</span>
                      ) : (
                        <span className="text-[#A6A6A6]">
                          {" "}
                          {t("Not Uploaded")}
                        </span>
                      )}
                    </>
                  )}
                </div>
                <div className="p-2 border-b">
                  {isSyncDataLoading ? (
                    <Skeleton width={100} />
                  ) : prescriptionRx ? (
                    <span className="text-[#2AAF2A]">{t("Uploaded")}</span>
                  ) : (
                    <>
                      {prescriptionRx === false ? (
                        <span className="text-red-500"> {t("Error")}</span>
                      ) : (
                        <span className="text-[#A6A6A6]">
                          {" "}
                          {t("Not Uploaded")}
                        </span>
                      )}
                    </>
                  )}
                </div>
                <div className="p-2 border-b">
                  {isSyncDataLoading ? (
                    <Skeleton width={100} />
                  ) : screeningForm ? (
                    <span className="text-[#2AAF2A]">{t("Uploaded")}</span>
                  ) : (
                    <>
                      {screeningForm === false ? (
                        <span className="text-red-500"> {t("Error")}</span>
                      ) : (
                        <span className="text-[#A6A6A6]">
                          {" "}
                          {t("Not Uploaded")}
                        </span>
                      )}
                    </>
                  )}
                </div>
                <div className="p-2 border-b">
                  {isSyncDataLoading ? (
                    <Skeleton width={100} />
                  ) : template ? (
                    <span className="text-[#2AAF2A]">{t("Uploaded")}</span>
                  ) : (
                    <>
                      {template === false ? (
                        <span className="text-red-500"> {t("Error")}</span>
                      ) : (
                        <span className="text-[#A6A6A6]">
                          {" "}
                          {t("Not Uploaded")}
                        </span>
                      )}
                    </>
                  )}
                </div>
                <div className="p-2 border-b">
                  {isSyncDataLoading ? (
                    <Skeleton width={100} />
                  ) : templateRx ? (
                    <span className="text-[#2AAF2A]">{t("Uploaded")}</span>
                  ) : (
                    <>
                      {templateRx === false ? (
                        <span className="text-red-500"> {t("Error")}</span>
                      ) : (
                        <span className="text-[#A6A6A6]">
                          {" "}
                          {t("Not Uploaded")}
                        </span>
                      )}
                    </>
                  )}
                </div>
                <div className="p-2 border-b">
                  {isSyncDataLoading ? (
                    <Skeleton width={100} />
                  ) : user ? (
                    <span className="text-[#2AAF2A]">{t("Uploaded")}</span>
                  ) : (
                    <>
                      {user === false ? (
                        <span className="text-red-500"> {t("Error")}</span>
                      ) : (
                        <span className="text-[#A6A6A6]">
                          {" "}
                          {t("Not Uploaded")}
                        </span>
                      )}
                    </>
                  )}
                </div>
                <div className="p-2 border-b">
                  {isSyncDataLoading ? (
                    <Skeleton width={100} />
                  ) : vaccinationForm ? (
                    <span className="text-[#2AAF2A]">{t("Uploaded")}</span>
                  ) : (
                    <>
                      {vaccinationForm === false ? (
                        <span className="text-red-500"> {t("Error")}</span>
                      ) : (
                        <span className="text-[#A6A6A6]">
                          {" "}
                          {t("Not Uploaded")}
                        </span>
                      )}
                    </>
                  )}
                </div>
                <div className="p-2 border-b">
                  {isSyncDataLoading ? (
                    <Skeleton width={100} />
                  ) : visit ? (
                    <span className="text-[#2AAF2A]">{t("Uploaded")}</span>
                  ) : (
                    <>
                      {visit === false ? (
                        <span className="text-red-500"> {t("Error")}</span>
                      ) : (
                        <span className="text-[#A6A6A6]">
                          {" "}
                          {t("Not Uploaded")}
                        </span>
                      )}
                    </>
                  )}
                </div>
                <div className="p-2">
                  {isSyncDataLoading ? (
                    <Skeleton width={100} />
                  ) : vitalForm ? (
                    <span className="text-[#2AAF2A]">{t("Uploaded")}</span>
                  ) : (
                    <>
                      {vitalForm === false ? (
                        <span className="text-red-500"> {t("Error")}</span>
                      ) : (
                        <span className="text-[#A6A6A6]">
                          {" "}
                          {t("Not Uploaded")}
                        </span>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default UploadDataList;
