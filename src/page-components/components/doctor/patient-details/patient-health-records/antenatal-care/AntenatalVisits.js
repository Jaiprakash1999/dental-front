import { useTranslation } from "react-i18next";
import { CiCirclePlus } from "react-icons/ci";
import { MdDelete } from "react-icons/md";

const AntenatalVisitsForm = ({
  antenatalCare = {},
  handleAntenatalCare = () => {},
  addVisitColumn = () => {},
  deleteVisitColumn = () => {},
}) => {
  const { t } = useTranslation();
  const { antenatalVisits = [] } = antenatalCare || {};

  return (
    <div className="my-4 w-full text-sm text-primary overflow-x-scroll">
      <div className="flex justify-between items-center">
        <h1 className="text-base uppercase mt-2 mb-1">
          {t("Antenatal Visits")}
        </h1>

        <button onClick={addVisitColumn}>
          <CiCirclePlus color="#616C7C" size={24} />
        </button>
      </div>
      <div className="flex w-full">
        <div className="border w-full overflow-x-scroll flex">
          <div className="w-1/3">
            <div className="p-2.5 border-[#D1D5DB] border">{t("Day")}</div>
            <div className="p-2.5 border-[#D1D5DB] border">{t("Date")}</div>
            <div className="p-2.5 border-[#D1D5DB] border">
              {t("Any Complaints")}
            </div>
            <div className="p-2.5 border-[#D1D5DB] border">
              {t("POG (Weeks)")}
            </div>
            <div className="p-2.5 border-[#D1D5DB] border">
              {t("Weight (Kg)")}
            </div>
            <div className="p-2.5 border-[#D1D5DB] border">
              {t("Pulse rate (bpm)")}
            </div>
            <div className="p-2.5 border-[#D1D5DB] border">
              {t("Blood Pressure ( --/-- mmHg)")}
            </div>
            <div className="p-2.5 border-[#D1D5DB] border">{t("Pallor")}</div>
            <div className="p-2.5 border-[#D1D5DB] border">
              {t("Pedal Edema")}
            </div>
            <div className="p-2.5 border-[#D1D5DB] border">{t("Jaundice")}</div>
            <div className="font-medium p-2.5 border-r-0 border-[#D1D5DB] border">
              {t("Abdominal Examination")}
            </div>
            <div className="p-2.5 border-[#D1D5DB] border">
              {t("Fundal Height Weeks/cm")}
            </div>
            <div className="p-2.5 border-[#D1D5DB] border">
              {t("Lie/ Presentation")}
            </div>
            <div className="p-8 border-[#D1D5DB] border">
              {t("Fetal Movements")}
            </div>
            <div className="p-2.5 border-[#D1D5DB] border">
              {t("Fetal heart rate/ min.")} (110-150)
            </div>
            <div className="p-2.5 border-[#D1D5DB] border">
              {t("P/V if done")}
            </div>
            <div className="font-medium p-2.5 border-r-0 border-[#D1D5DB] border">
              {t("Essential Investigations")}
            </div>
            {/* <div className="p-2.5 border-[#D1D5DB] border">
              {t("Urine Pregnancy Test")}
            </div> */}
            <div className="p-2.5 border-[#D1D5DB] border">
              {t("Hemoglobin Percentage (Hb %)")}
            </div>
            {/* <div className="p-2.5 border-[#D1D5DB] border">
              {t("Urine Albumin")}
            </div>
            <div className="p-2.5 border-[#D1D5DB] border">
              {t("Urine Sugar")}
            </div> */}
            <div className="p-2.5 border-[#D1D5DB] border">
              {t("HIV Screening")}
            </div>
            <div className="p-2.5 border-[#D1D5DB] border">
              {t("VDRL (Syphilis)")}
            </div>
            <div className="p-2.5 border-[#D1D5DB] border">{t("Hbs Ag")}</div>
            <div className="p-2.5 border-[#D1D5DB] border">
              {t("Blood Sugar")}
            </div>
            <div className="p-2.5 border-[#D1D5DB] border">
              {t("Urine Albumin")}
            </div>
            <div className="p-2.5 border-[#D1D5DB] border">
              {t("Urine Sugar")}
            </div>
            <div className="p-2.5 border-[#D1D5DB] border">
              {t("Ultra Sonography")}
            </div>
          </div>
          <div className="flex-grow flex w-full overflow-x-scroll">
            {antenatalVisits.map((item, index) => {
              return (
                <div key={index} className="w-full">
                  <div className="border flex justify-between gap-2 pe-2 min-w-40 border-[#D1D5DB]">
                    <input
                      name="day"
                      disabled={[
                        "0 - 3 Months",
                        "3 - 6 Months",
                        "6 - 8 Months",
                        "8 - 9 Months",
                      ].includes(item.day)}
                      onChange={(e) =>
                        handleAntenatalCare(e, index, "antenatalVisits")
                      }
                      value={item.day}
                      type="text"
                      className="w-full disabled:text-secondary p-2.5 outline-none  bg-[#F9FAFB] focus:bg-[#ffff]"
                    />
                    {antenatalVisits.length > 4 && (
                      <button
                        onClick={() => deleteVisitColumn(index)}
                        disabled={[
                          "Third Month",
                          "Eight Month",
                          "Six Month",
                          "Ninth Month",
                        ].includes(item.day)}
                      >
                        <MdDelete color="#C81E1E" />
                      </button>
                    )}
                  </div>
                  <div className="border border-[#D1D5DB]">
                    <input
                      name="date"
                      onChange={(e) =>
                        handleAntenatalCare(e, index, "antenatalVisits")
                      }
                      value={item.date}
                      type="date"
                      style={{ padding: "9px" }}
                      className="w-full outline-none  bg-[#F9FAFB] focus:bg-[#ffff]"
                    />
                  </div>
                  <div className="border border-[#D1D5DB]">
                    <input
                      name="complaints"
                      onChange={(e) =>
                        handleAntenatalCare(e, index, "antenatalVisits")
                      }
                      value={item.complaints}
                      type="text"
                      className="w-full p-2.5 outline-none  bg-[#F9FAFB] focus:bg-[#ffff]"
                    />
                  </div>
                  <div className="border border-[#D1D5DB]">
                    <input
                      name="pogWeeks"
                      onChange={(e) =>
                        handleAntenatalCare(e, index, "antenatalVisits")
                      }
                      value={item.pogWeeks}
                      type="number"
                      min={0}
                      className="w-full p-2.5 outline-none  bg-[#F9FAFB] focus:bg-[#ffff]"
                    />
                  </div>
                  <div className="border border-[#D1D5DB]">
                    <input
                      name="weightInKg"
                      onChange={(e) =>
                        handleAntenatalCare(e, index, "antenatalVisits")
                      }
                      value={item.weightInKg}
                      type="number"
                      min={0}
                      className="w-full p-2.5 outline-none  bg-[#F9FAFB] focus:bg-[#ffff]"
                    />
                  </div>
                  <div className="border border-[#D1D5DB]">
                    <input
                      name="pulseRateInBpm"
                      onChange={(e) =>
                        handleAntenatalCare(e, index, "antenatalVisits")
                      }
                      value={item.pulseRateInBpm}
                      type="number"
                      min={0}
                      className="w-full p-2.5 outline-none  bg-[#F9FAFB] focus:bg-[#ffff]"
                    />
                  </div>
                  <div className="border border-[#D1D5DB]">
                    <input
                      name="bloodPressure"
                      onChange={(e) =>
                        handleAntenatalCare(e, index, "antenatalVisits")
                      }
                      value={item.bloodPressure}
                      type="text"
                      className="w-full p-2.5 outline-none  bg-[#F9FAFB] focus:bg-[#ffff]"
                    />
                  </div>
                  <div className="border border-[#D1D5DB]">
                    <input
                      name="pallor"
                      onChange={(e) =>
                        handleAntenatalCare(e, index, "antenatalVisits")
                      }
                      value={item.pallor}
                      type="text"
                      className="w-full p-2.5 outline-none  bg-[#F9FAFB] focus:bg-[#ffff]"
                    />
                  </div>{" "}
                  <div className="border border-[#D1D5DB]">
                    <input
                      name="oedema"
                      onChange={(e) =>
                        handleAntenatalCare(e, index, "antenatalVisits")
                      }
                      value={item.oedema}
                      type="text"
                      className="w-full p-2.5 outline-none  bg-[#F9FAFB] focus:bg-[#ffff]"
                    />
                  </div>{" "}
                  <div className="border border-[#D1D5DB]">
                    <input
                      name="jaundice"
                      onChange={(e) =>
                        handleAntenatalCare(e, index, "antenatalVisits")
                      }
                      value={item.jaundice}
                      type="text"
                      className="w-full p-2.5 outline-none  bg-[#F9FAFB] focus:bg-[#ffff]"
                    />
                  </div>{" "}
                  <div className="border-[#D1D5DB] border border-l-0 p-2.5">
                    -
                  </div>
                  <div className="border border-[#D1D5DB]">
                    <input
                      name="fundalHeight"
                      onChange={(e) =>
                        handleAntenatalCare(e, index, "antenatalVisits")
                      }
                      value={item.fundalHeight}
                      type="text"
                      className="w-full p-2.5 outline-none  bg-[#F9FAFB] focus:bg-[#ffff]"
                    />
                  </div>{" "}
                  <div className="border border-[#D1D5DB]">
                    <input
                      name="liePresentation"
                      onChange={(e) =>
                        handleAntenatalCare(e, index, "antenatalVisits")
                      }
                      value={item.liePresentation}
                      type="text"
                      className="w-full p-2.5 outline-none  bg-[#F9FAFB] focus:bg-[#ffff]"
                    />
                  </div>{" "}
                  <div className="border p-2 border-[#D1D5DB]">
                    <label className="flex items-center gap-2">
                      <input
                        name="fetalMovements"
                        type="checkbox"
                        onChange={(e) =>
                          handleAntenatalCare(e, index, "antenatalVisits")
                        }
                        value="NORMAL"
                        checked={item.fetalMovements === "NORMAL"}
                      />
                      {t("Normal")}
                    </label>
                    <label className="flex items-center mt-1 gap-2">
                      <input
                        name="fetalMovements"
                        type="checkbox"
                        onChange={(e) =>
                          handleAntenatalCare(e, index, "antenatalVisits")
                        }
                        value="REDUCED"
                        checked={item.fetalMovements === "REDUCED"}
                      />
                      {t("Reduced")}
                    </label>
                    <label className="flex items-center mt-1 gap-2">
                      <input
                        type="checkbox"
                        name="fetalMovements"
                        onChange={(e) =>
                          handleAntenatalCare(e, index, "antenatalVisits")
                        }
                        value="ABSENT"
                        checked={item.fetalMovements === "ABSENT"}
                      />
                      {t("Absent")}
                    </label>
                  </div>{" "}
                  <div className="border border-[#D1D5DB]">
                    <input
                      name="fetalHeartRatePerMin"
                      onChange={(e) =>
                        handleAntenatalCare(e, index, "antenatalVisits")
                      }
                      value={item.fetalHeartRatePerMin}
                      type="number"
                      min={0}
                      className="w-full p-2.5 outline-none  bg-[#F9FAFB] focus:bg-[#ffff]"
                    />
                  </div>{" "}
                  <div className="border border-[#D1D5DB]">
                    <input
                      name="pvIfDone"
                      onChange={(e) =>
                        handleAntenatalCare(e, index, "antenatalVisits")
                      }
                      value={item.pvIfDone}
                      type="text"
                      className="w-full p-2.5 outline-none  bg-[#F9FAFB] focus:bg-[#ffff]"
                    />
                  </div>{" "}
                  <div className="font-medium p-2.5 border-l-0 border-[#D1D5DB] border">
                    -
                  </div>
                  {/* <div className="border border-[#D1D5DB]">
                    <input
                      name="urinePregnancyTest"
                      onChange={(e) => handleAntenatalCare(e, index,"antenatalVisits")}
                      value={item.urinePregnancyTest}
                      type="text"
                      className="w-full p-2.5 outline-none  bg-[#F9FAFB] focus:bg-[#ffff]"
                    />
                  </div>{" "} */}
                  <div className="border border-[#D1D5DB]">
                    <input
                      name="haemoglobin"
                      onChange={(e) =>
                        handleAntenatalCare(e, index, "antenatalVisits")
                      }
                      value={item.haemoglobin}
                      type="text"
                      className="w-full p-2.5 outline-none  bg-[#F9FAFB] focus:bg-[#ffff]"
                    />
                  </div>{" "}
                  {/* <div className="border border-[#D1D5DB]">
                    <input
                      name="urineAlbumin"
                      onChange={(e) => handleAntenatalCare(e, index,"antenatalVisits")}
                      value={item.urineAlbumin}
                      type="text"
                      className="w-full p-2.5 outline-none  bg-[#F9FAFB] focus:bg-[#ffff]"
                    />
                  </div>{" "}
                  <div className="border border-[#D1D5DB]">
                    <input
                      name="urineSugar"
                      onChange={(e) => handleAntenatalCare(e, index,"antenatalVisits")}
                      value={item.urineSugar}
                      type="text"
                      className="w-full p-2.5 outline-none  bg-[#F9FAFB] focus:bg-[#ffff]"
                    />
                  </div>{" "} */}
                  <div className="border border-[#D1D5DB]">
                    <input
                      name="hivScreening"
                      onChange={(e) =>
                        handleAntenatalCare(e, index, "antenatalVisits")
                      }
                      value={item.hivScreening}
                      type="text"
                      className="w-full p-2.5 outline-none  bg-[#F9FAFB] focus:bg-[#ffff]"
                    />
                  </div>{" "}
                  <div className="border border-[#D1D5DB]">
                    <input
                      name="vdrl"
                      onChange={(e) =>
                        handleAntenatalCare(e, index, "antenatalVisits")
                      }
                      value={item.vdrl}
                      type="text"
                      className="w-full p-2.5 outline-none  bg-[#F9FAFB] focus:bg-[#ffff]"
                    />
                  </div>{" "}
                  <div className="border border-[#D1D5DB]">
                    <input
                      name="hbsAg"
                      onChange={(e) =>
                        handleAntenatalCare(e, index, "antenatalVisits")
                      }
                      value={item.hbsAg}
                      type="text"
                      className="w-full p-2.5 outline-none  bg-[#F9FAFB] focus:bg-[#ffff]"
                    />
                  </div>
                  <div className="border border-[#D1D5DB]">
                    <input
                      name="bloodSugar"
                      onChange={(e) =>
                        handleAntenatalCare(e, index, "antenatalVisits")
                      }
                      value={item.bloodSugar}
                      type="text"
                      className="w-full p-2.5 outline-none  bg-[#F9FAFB] focus:bg-[#ffff]"
                    />
                  </div>
                  <div className="border border-[#D1D5DB]">
                    <input
                      name="urineAlbumin"
                      onChange={(e) =>
                        handleAntenatalCare(e, index, "antenatalVisits")
                      }
                      value={item.urineAlbumin}
                      type="text"
                      className="w-full p-2.5 outline-none  bg-[#F9FAFB] focus:bg-[#ffff]"
                    />
                  </div>{" "}
                  <div className="border border-[#D1D5DB]">
                    <input
                      name="urineSugar"
                      onChange={(e) =>
                        handleAntenatalCare(e, index, "antenatalVisits")
                      }
                      value={item.urineSugar}
                      type="text"
                      className="w-full p-2.5 outline-none  bg-[#F9FAFB] focus:bg-[#ffff]"
                    />
                  </div>{" "}
                  <div className="border border-[#D1D5DB]">
                    <input
                      name="ultraSonography"
                      onChange={(e) =>
                        handleAntenatalCare(e, index, "antenatalVisits")
                      }
                      value={item.ultraSonography}
                      type="text"
                      className="w-full p-2.5 outline-none  bg-[#F9FAFB] focus:bg-[#ffff]"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AntenatalVisitsForm;
