import { useTranslation } from "react-i18next";
import { CiCirclePlus } from "react-icons/ci";
import { MdDelete } from "react-icons/md";

const PostPartumCare = ({
  postNatalCare = {},
  handlePostNatalCare = () => {},
  addVisitColumn = () => {},
  deleteVisitColumn = () => {},
}) => {
  const { t } = useTranslation();
  const { postpartumCareRecords = [] } = postNatalCare || {};

  return (
    <div className="my-4 w-full text-sm text-primary overflow-x-scroll">
      <div className="flex justify-between items-center">
        <h1 className="text-base uppercase mt-2 mb-1">
          {t("POST PARTUM CARE")}
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
            <div className="p-2.5 border-[#D1D5DB] border">{t("Pallor")}</div>
            <div className="p-2.5 border-[#D1D5DB] border">
              {t("Pulse rate")}
            </div>
            <div className="p-2.5 border-[#D1D5DB] border">
              {t("Blood pressure")}
            </div>
            <div className="p-2.5 border-[#D1D5DB] border">
              {t("Temperature (C)")}
            </div>
            <div className="p-5 border-[#D1D5DB] border">{t("Breasts")}</div>
            <div className="p-5 border-[#D1D5DB] border">{t("Nipples")}</div>
            <div className="p-5 border-[#D1D5DB] border">
              {t("Uterus tenderness")}
            </div>
            <div className="p-5 border-[#D1D5DB] border">
              {t("Bleeding P/V")}
            </div>
            <div className="p-5 border-[#D1D5DB] border">{t("Lochia")}</div>
            <div className="p-5 border-[#D1D5DB] border">
              {t("Episiotomy/Tear")}
            </div>
            <div className="p-5 border-[#D1D5DB] border">
              {" "}
              {t("Pedal Edema")}
            </div>
            <div className="p-2.5 border-[#D1D5DB] border">
              {t("Family planning counselling")}
            </div>
            <div className="p-2.5 border-[#D1D5DB] border">
              {t("Any other complications and referral")}
            </div>
          </div>
          <div className="flex-grow flex w-full overflow-x-scroll">
            {postpartumCareRecords.map((item, index) => {
              return (
                <div key={index} className="w-full">
                  <div className="border flex justify-between gap-2 pe-2 min-w-40 border-[#D1D5DB]">
                    <input
                      name="day"
                      onChange={(e) => handlePostNatalCare(e, index)}
                      value={item.day}
                      type="text"
                      disabled={[
                        "3 Day",
                        "7 Day",
                        "14 Day",
                        "21 Day",
                        "28 Day",
                        "42 Day",
                      ].includes(item.day)}
                      className="w-full p-2.5 outline-none  bg-[#F9FAFB] focus:bg-[#ffff]"
                    />
                    {postpartumCareRecords.length > 7 && (
                      <button
                        onClick={() => deleteVisitColumn(index)}
                        disabled={[
                          "3 Day",
                          "7 Day",
                          "14 Day",
                          "21 Day",
                          "28 Day",
                          "42 Day",
                        ].includes(item.day)}
                      >
                        <MdDelete color="#C81E1E" />
                      </button>
                    )}
                  </div>
                  <div className="border border-[#D1D5DB]">
                    <input
                      name="date"
                      onChange={(e) => handlePostNatalCare(e, index)}
                      value={item.date}
                      type="date"
                      style={{ padding: "9px" }}
                      className="w-full outline-none  bg-[#F9FAFB] focus:bg-[#ffff]"
                    />
                  </div>
                  <div className="border border-[#D1D5DB]">
                    <input
                      name="anyComplaints"
                      onChange={(e) => handlePostNatalCare(e, index)}
                      value={item.anyComplaints}
                      type="text"
                      className="w-full p-2.5 outline-none  bg-[#F9FAFB] focus:bg-[#ffff]"
                    />
                  </div>
                  <div className="border border-[#D1D5DB]">
                    <input
                      name="pallor"
                      onChange={(e) => handlePostNatalCare(e, index)}
                      value={item.pallor}
                      type="text"
                      className="w-full p-2.5 outline-none  bg-[#F9FAFB] focus:bg-[#ffff]"
                    />
                  </div>
                  <div className="border border-[#D1D5DB]">
                    <input
                      name="pulseRate"
                      onChange={(e) => handlePostNatalCare(e, index)}
                      value={item.pulseRate}
                      type="text"
                      className="w-full p-2.5 outline-none  bg-[#F9FAFB] focus:bg-[#ffff]"
                    />
                  </div>
                  <div className="border border-[#D1D5DB]">
                    <input
                      name="bloodPressure"
                      onChange={(e) => handlePostNatalCare(e, index)}
                      value={item.bloodPressure}
                      type="text"
                      className="w-full p-2.5 outline-none  bg-[#F9FAFB] focus:bg-[#ffff]"
                    />
                  </div>
                  <div className="border border-[#D1D5DB]">
                    <input
                      name="temperature"
                      onChange={(e) => handlePostNatalCare(e, index)}
                      value={item.temperature}
                      type="number"
                      className="w-full p-2.5 outline-none  bg-[#F9FAFB] focus:bg-[#ffff]"
                    />
                  </div>{" "}
                  <div className="border p-2 border-[#D1D5DB]">
                    <label className="flex items-center gap-2">
                      <input
                        name="breasts"
                        type="checkbox"
                        onChange={(e) => handlePostNatalCare(e, index)}
                        value="SOFT"
                        checked={item.breasts === "SOFT"}
                      />
                      {t("Soft")}
                    </label>
                    <label className="flex items-center mt-1 gap-2">
                      <input
                        name="breasts"
                        type="checkbox"
                        onChange={(e) => handlePostNatalCare(e, index)}
                        value="ENGORGED"
                        checked={item.breasts === "ENGORGED"}
                      />
                      {t("Engorged")}
                    </label>
                  </div>
                  <div className="border p-2 border-[#D1D5DB]">
                    <label className="flex items-center gap-2">
                      <input
                        name="nipples"
                        type="checkbox"
                        onChange={(e) => handlePostNatalCare(e, index)}
                        value="CRACKED"
                        checked={item.nipples === "CRACKED"}
                      />
                      {t("Cracked")}
                    </label>
                    <label className="flex items-center mt-1 gap-2">
                      <input
                        name="nipples"
                        type="checkbox"
                        onChange={(e) => handlePostNatalCare(e, index)}
                        value="NORMAL"
                        checked={item.nipples === "NORMAL"}
                      />
                      {t("Normal")}
                    </label>
                  </div>
                  <div className="border p-2 border-[#D1D5DB]">
                    <label className="flex items-center gap-2">
                      <input
                        name="uterusTenderness"
                        type="checkbox"
                        onChange={(e) => handlePostNatalCare(e, index)}
                        value="PRESENT"
                        checked={item.uterusTenderness === "PRESENT"}
                      />
                      {t("Present")}
                    </label>
                    <label className="flex items-center mt-1 gap-2">
                      <input
                        name="uterusTenderness"
                        type="checkbox"
                        onChange={(e) => handlePostNatalCare(e, index)}
                        value="ABSENT"
                        checked={item.uterusTenderness === "ABSENT"}
                      />
                      {t("Absent")}
                    </label>
                  </div>
                  <div className="border p-2 border-[#D1D5DB]">
                    <label className="flex items-center gap-2">
                      <input
                        name="bleedingPV"
                        type="checkbox"
                        onChange={(e) => handlePostNatalCare(e, index)}
                        value="EXCESSIVE"
                        checked={item.bleedingPV === "EXCESSIVE"}
                      />
                      {t("Excessive")}
                    </label>
                    <label className="flex items-center mt-1 gap-2">
                      <input
                        name="bleedingPV"
                        type="checkbox"
                        onChange={(e) => handlePostNatalCare(e, index)}
                        value="NORMAL"
                        checked={item.bleedingPV === "NORMAL"}
                      />
                      {t("Normal")}
                    </label>
                  </div>
                  <div className="border p-2 border-[#D1D5DB]">
                    <label className="flex items-center gap-2">
                      <input
                        name="lochia"
                        type="checkbox"
                        onChange={(e) => handlePostNatalCare(e, index)}
                        value="HEALTHY"
                        checked={item.lochia === "HEALTHY"}
                      />
                      {t("Healthy")}
                    </label>
                    <label className="flex items-center mt-1 gap-2">
                      <input
                        name="lochia"
                        type="checkbox"
                        onChange={(e) => handlePostNatalCare(e, index)}
                        value="FOULSMELLING"
                        checked={item.lochia === "FOULSMELLING"}
                      />
                      {t("Foul Smelling")}
                    </label>
                  </div>
                  <div className="border p-2 border-[#D1D5DB]">
                    <label className="flex items-center gap-2">
                      <input
                        name="episiotomyTear"
                        type="checkbox"
                        onChange={(e) => handlePostNatalCare(e, index)}
                        value="HEALTHY"
                        checked={item.episiotomyTear === "HEALTHY"}
                      />
                      {t("Healthy")}
                    </label>
                    <label className="flex items-center mt-1 gap-2">
                      <input
                        name="episiotomyTear"
                        type="checkbox"
                        onChange={(e) => handlePostNatalCare(e, index)}
                        value="INFECTED"
                        checked={item.episiotomyTear === "INFECTED"}
                      />
                      {t("Infected")}
                    </label>
                  </div>
                  <div className="border p-2 border-[#D1D5DB]">
                    <label className="flex items-center gap-2">
                      <input
                        name="pedalEdema"
                        type="checkbox"
                        onChange={(e) => handlePostNatalCare(e, index)}
                        value={true}
                        checked={item.pedalEdema === true}
                      />
                      {t("Yes")}
                    </label>
                    <label className="flex items-center mt-1 gap-2">
                      <input
                        name="pedalEdema"
                        type="checkbox"
                        onChange={(e) => handlePostNatalCare(e, index)}
                        value={false}
                        checked={item.pedalEdema === false}
                      />
                      {t("No")}
                    </label>
                  </div>
                  <div className="border border-[#D1D5DB]">
                    <input
                      name="familyPlanningCounselling"
                      onChange={(e) => handlePostNatalCare(e, index)}
                      value={item.familyPlanningCounselling}
                      type="text"
                      className="w-full p-2.5 outline-none  bg-[#F9FAFB] focus:bg-[#ffff]"
                    />
                  </div>{" "}
                  <div className="border border-[#D1D5DB]">
                    <input
                      name="otherComplications"
                      onChange={(e) => handlePostNatalCare(e, index)}
                      value={item.otherComplications}
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

export default PostPartumCare;
