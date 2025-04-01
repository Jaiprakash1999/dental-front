import { useTranslation } from "react-i18next";
import { CiCirclePlus } from "react-icons/ci";
import { MdDelete } from "react-icons/md";

const GeneralExamination = ({
  careOfBabyInfo = {},
  handleBabyCare = () => {},
  addVisitColumn = () => {},
  deleteVisitColumn = () => {},
}) => {
  const { t } = useTranslation();
  const { babyCares = [] } = careOfBabyInfo || {};

  return (
    <div className="my-4 w-full text-sm text-primary overflow-x-scroll">
      <div className="flex justify-between items-center">
        <h1 className="text-base uppercase mt-2 mb-1">
          {t("General Examination")}
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
              {t("Weight of the baby (kg)")}
            </div>
            <div className="p-2.5 border-[#D1D5DB] border">
              {t("Temperature (Axillary)")}
            </div>
            <div className="p-5 border-[#D1D5DB] border">
              {t("Urine Output, >6 times/day?")}
            </div>
            <div className="p-2.5 border-[#D1D5DB] border">
              {t(
                "Stool Pattern of the baby(Mention Colour/ how many times/day)"
              )}
            </div>
            <div className="p-5 border-[#D1D5DB] border">
              {t("Eyes of the baby")}
            </div>
            <div className="p-2.5 border-[#D1D5DB] border">
              {t("Skin of the baby (any pustules)")}
            </div>
            <div className="p-8 border-[#D1D5DB] border">
              {t("Redness or cracks on skinfolds")}
            </div>
            <div className="p-5 border-[#D1D5DB] border">{t("Yellow eye")}</div>
            <div className="p-5 border-[#D1D5DB] border">
              {t("Yellow skin")}
            </div>
            <div className="p-5 border-[#D1D5DB] border">
              {t("Umbilical Cord Bleed")}
            </div>
            <div className="p-2.5 border-[#D1D5DB] border">
              {t("If Yes, Health Worker tied the cord with a clean thread?")}
            </div>

            <div className="p-2.5 border-[#D1D5DB] font-medium border">
              {t("Sepsis Markers")}
            </div>

            <div className="p-5 border-[#D1D5DB] border">
              {t("How's the baby Feeding?")}
            </div>
            <div className="p-5 border-[#D1D5DB] border">
              {t("How's the cry of the baby?")}
            </div>
            <div className="p-5 border-[#D1D5DB] border">{t("Abdomen")}</div>
            <div className="p-5 border-[#D1D5DB] border">
              {t("Is the baby cold to touch?")}
            </div>
            <div className="p-5 border-[#D1D5DB] border">
              {t("Is there any chest indrawing?")}
            </div>
            <div className="p-5 border-[#D1D5DB] border">
              {t("Any Pus on the umbilicus?")}
            </div>
            <div className="p-5 border-[#D1D5DB] border">
              {t("Respiratory Rate, > 60 times/min.")}
            </div>
          </div>
          <div className="flex-grow flex w-full overflow-x-scroll">
            {babyCares.map((item, index) => {
              return (
                <div key={index} className="w-full">
                  <div className="border flex justify-between gap-2 pe-2 min-w-44 border-[#D1D5DB]">
                    <input
                      name="day"
                      onChange={(e) => handleBabyCare(e, index)}
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
                    {babyCares.length > 7 && (
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
                      onChange={(e) => handleBabyCare(e, index)}
                      value={item.date}
                      type="date"
                      style={{ padding: "9px" }}
                      className="w-full outline-none  bg-[#F9FAFB] focus:bg-[#ffff]"
                    />
                  </div>
                  <div className="border border-[#D1D5DB]">
                    <input
                      name="weightInKg"
                      onChange={(e) => handleBabyCare(e, index)}
                      value={item.weightInKg}
                      type="number"
                      min={0}
                      className="w-full p-2.5 outline-none  bg-[#F9FAFB] focus:bg-[#ffff]"
                    />
                  </div>
                  <div className="border border-[#D1D5DB]">
                    <input
                      name="temperatureInCelsius"
                      onChange={(e) => handleBabyCare(e, index)}
                      value={item.temperatureInCelsius}
                      type="number"
                      className="w-full p-2.5 outline-none  bg-[#F9FAFB] focus:bg-[#ffff]"
                    />
                  </div>
                  <div className="border p-2 border-[#D1D5DB]">
                    <label className="flex items-center gap-2">
                      <input
                        name="urineOutput"
                        type="checkbox"
                        onChange={(e) => handleBabyCare(e, index)}
                        value="Yes"
                        checked={item.urineOutput === "Yes"}
                      />
                      {t("Yes")}
                    </label>
                    <label className="flex items-center mt-1 gap-2">
                      <input
                        name="urineOutput"
                        type="checkbox"
                        onChange={(e) => handleBabyCare(e, index)}
                        value="No"
                        checked={item.urineOutput === "No"}
                      />
                      {t("No")}
                    </label>
                  </div>
                  <div className="border border-[#D1D5DB]">
                    <input
                      name="stoolPattern"
                      onChange={(e) => handleBabyCare(e, index)}
                      value={item.stoolPattern}
                      type="text"
                      className="w-full p-5 outline-none  bg-[#F9FAFB] focus:bg-[#ffff]"
                    />
                  </div>
                  <div className="border p-2 border-[#D1D5DB]">
                    <label className="flex items-center gap-2">
                      <input
                        name="eyesCondition"
                        type="checkbox"
                        onChange={(e) => handleBabyCare(e, index)}
                        value="Swollen"
                        checked={item.eyesCondition?.includes("Swollen")}
                      />
                      {t("Swollen")}
                    </label>
                    <label className="flex items-center mt-1 gap-2">
                      <input
                        name="eyesCondition"
                        type="checkbox"
                        onChange={(e) => handleBabyCare(e, index)}
                        value="Pus"
                        checked={item.eyesCondition?.includes("Pus")}
                      />
                      {t("Pus")}
                    </label>
                  </div>
                  <div className="border border-[#D1D5DB]">
                    <input
                      name="skinCondition"
                      onChange={(e) => handleBabyCare(e, index)}
                      value={item.skinCondition}
                      type="text"
                      className="w-full p-2.5 outline-none  bg-[#F9FAFB] focus:bg-[#ffff]"
                    />
                  </div>
                  <div className="border p-2 border-[#D1D5DB]">
                    <label className="flex items-center gap-2">
                      <input
                        name="skinFoldCondition"
                        type="checkbox"
                        onChange={(e) => handleBabyCare(e, index)}
                        value="Axila"
                        checked={item.skinFoldCondition?.includes("Axila")}
                      />
                      {t("Axila")}
                    </label>
                    <label className="flex items-center mt-1 gap-2">
                      <input
                        name="skinFoldCondition"
                        type="checkbox"
                        onChange={(e) => handleBabyCare(e, index)}
                        value="Thigh"
                        checked={item.skinFoldCondition?.includes("Thigh")}
                      />
                      {t("Thigh")}
                    </label>
                    <label className="flex items-center mt-1 gap-2">
                      <input
                        name="skinFoldCondition"
                        type="checkbox"
                        onChange={(e) => handleBabyCare(e, index)}
                        value="Buttock"
                        checked={item.skinFoldCondition?.includes("Buttock")}
                      />
                      {t("Buttock")}
                    </label>
                  </div>
                  <div className="border p-2 border-[#D1D5DB]">
                    <label className="flex items-center gap-2">
                      <input
                        name="yellowEyes"
                        type="checkbox"
                        onChange={(e) => handleBabyCare(e, index)}
                        value={true}
                        checked={item.yellowEyes === true}
                      />
                      {t("Yes")}
                    </label>
                    <label className="flex items-center mt-1 gap-2">
                      <input
                        name="yellowEyes"
                        type="checkbox"
                        value={false}
                        onChange={(e) => handleBabyCare(e, index)}
                        checked={item.yellowEyes === false}
                      />
                      {t("No")}
                    </label>
                  </div>
                  <div className="border p-2 border-[#D1D5DB]">
                    <label className="flex items-center gap-2">
                      <input
                        name="yellowSkin"
                        type="checkbox"
                        onChange={(e) => handleBabyCare(e, index)}
                        value={true}
                        checked={item.yellowSkin === true}
                      />
                      {t("Yes")}
                    </label>
                    <label className="flex items-center mt-1 gap-2">
                      <input
                        name="yellowSkin"
                        type="checkbox"
                        onChange={(e) => handleBabyCare(e, index)}
                        value={false}
                        checked={item.yellowSkin === false}
                      />
                      {t("No")}
                    </label>
                  </div>
                  <div className="border p-2 border-[#D1D5DB]">
                    <label className="flex items-center gap-2">
                      <input
                        name="umbilicalCordBleed"
                        type="checkbox"
                        onChange={(e) => handleBabyCare(e, index)}
                        value={true}
                        checked={item.umbilicalCordBleed === true}
                      />
                      {t("Yes")}
                    </label>
                    <label className="flex items-center mt-1 gap-2">
                      <input
                        name="umbilicalCordBleed"
                        type="checkbox"
                        onChange={(e) => handleBabyCare(e, index)}
                        value={false}
                        checked={item.umbilicalCordBleed === false}
                      />
                      {t("No")}
                    </label>
                  </div>
                  <div className="border p-2 border-[#D1D5DB]">
                    <label className="flex items-center gap-2">
                      <input
                        name="cleanThreadUsed"
                        type="checkbox"
                        onChange={(e) => handleBabyCare(e, index)}
                        value={true}
                        checked={item.cleanThreadUsed === true}
                      />
                      {t("Yes")}
                    </label>
                    <label className="flex items-center mt-1 gap-2">
                      <input
                        name="cleanThreadUsed"
                        type="checkbox"
                        onChange={(e) => handleBabyCare(e, index)}
                        value={false}
                        checked={item.cleanThreadUsed === false}
                      />
                      {t("No")}
                    </label>
                  </div>
                  <div className="border p-2.5 border-l-0 border-r-0 border-[#D1D5DB]">
                    -
                  </div>
                  <div className="border p-2 border-[#D1D5DB]">
                    <label className="flex items-center gap-2">
                      <input
                        name="feedingCondition"
                        type="checkbox"
                        onChange={(e) => handleBabyCare(e, index)}
                        value="Feeding Less"
                        checked={item.feedingCondition === "Feeding Less"}
                      />
                      {t("Feeding Less")}
                    </label>
                    <label className="flex items-center mt-1 gap-2">
                      <input
                        name="feedingCondition"
                        type="checkbox"
                        onChange={(e) => handleBabyCare(e, index)}
                        value="Stopped"
                        checked={item.feedingCondition === "Stopped"}
                      />
                      {t("Stopped")}
                    </label>
                  </div>
                  <div className="border p-2 border-[#D1D5DB]">
                    <label className="flex items-center gap-2">
                      <input
                        name="cryCondition"
                        type="checkbox"
                        onChange={(e) => handleBabyCare(e, index)}
                        value="Cry Weak"
                        checked={item.cryCondition === "Cry Weak"}
                      />
                      {t("Cry Weak")}
                    </label>
                    <label className="flex items-center mt-1 gap-2">
                      <input
                        name="cryCondition"
                        type="checkbox"
                        onChange={(e) => handleBabyCare(e, index)}
                        value="Stopped"
                        checked={item.cryCondition === "Stopped"}
                      />
                      {t("Stopped")}
                    </label>
                  </div>
                  <div className="border p-2 border-[#D1D5DB]">
                    <label className="flex items-center gap-2">
                      <input
                        name="abdomenCondition"
                        type="checkbox"
                        onChange={(e) => handleBabyCare(e, index)}
                        value="DISTENDED_ABDOMEN"
                        checked={item.abdomenCondition === "DISTENDED_ABDOMEN"}
                      />
                      {t("Distended abdomen")}
                    </label>
                    <label className="flex items-center mt-1 gap-2">
                      <input
                        name="abdomenCondition"
                        type="checkbox"
                        onChange={(e) => handleBabyCare(e, index)}
                        value="BABY_VOMITS_OFTEN"
                        checked={item.abdomenCondition === "BABY_VOMITS_OFTEN"}
                      />
                      {t("Baby Vomits often")}
                    </label>
                  </div>
                  <div className="border p-2 border-[#D1D5DB]">
                    <label className="flex items-center gap-2">
                      <input
                        name="coldToTouch"
                        type="checkbox"
                        onChange={(e) => handleBabyCare(e, index)}
                        value={true}
                        checked={item.coldToTouch === true}
                      />
                      {t("Yes")}
                    </label>
                    <label className="flex items-center mt-1 gap-2">
                      <input
                        name="coldToTouch"
                        type="checkbox"
                        onChange={(e) => handleBabyCare(e, index)}
                        value={false}
                        checked={item.coldToTouch === false}
                      />
                      {t("No")}
                    </label>
                  </div>
                  <div className="border p-2 border-[#D1D5DB]">
                    <label className="flex items-center gap-2">
                      <input
                        name="chestIndrawn"
                        type="checkbox"
                        onChange={(e) => handleBabyCare(e, index)}
                        value={true}
                        checked={item.chestIndrawn === true}
                      />
                      {t("Yes")}
                    </label>
                    <label className="flex items-center mt-1 gap-2">
                      <input
                        name="chestIndrawn"
                        type="checkbox"
                        onChange={(e) => handleBabyCare(e, index)}
                        value={false}
                        checked={item.chestIndrawn === false}
                      />
                      {t("No")}
                    </label>
                  </div>
                  <div className="border p-2 border-[#D1D5DB]">
                    <label className="flex items-center gap-2">
                      <input
                        name="pusOnUmbilicus"
                        type="checkbox"
                        onChange={(e) => handleBabyCare(e, index)}
                        value={true}
                        checked={item.pusOnUmbilicus === true}
                      />
                      {t("Yes")}
                    </label>
                    <label className="flex items-center mt-1 gap-2">
                      <input
                        name="pusOnUmbilicus"
                        type="checkbox"
                        onChange={(e) => handleBabyCare(e, index)}
                        value={false}
                        checked={item.pusOnUmbilicus === false}
                      />
                      {t("No")}
                    </label>
                  </div>
                  <div className="border p-2 border-[#D1D5DB]">
                    <label className="flex items-center gap-2">
                      <input
                        name="respiratoryRate"
                        type="checkbox"
                        onChange={(e) => handleBabyCare(e, index)}
                        value={true}
                        checked={item.respiratoryRate === true}
                      />
                      {t("Yes")}
                    </label>
                    <label className="flex items-center mt-1 gap-2">
                      <input
                        name="respiratoryRate"
                        type="checkbox"
                        onChange={(e) => handleBabyCare(e, index)}
                        value={false}
                        checked={item.respiratoryRate === false}
                      />
                      {t("No")}
                    </label>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="mt-5">
        <div className="">{t("Baby referred to higher centre (Yes/No)")}</div>
        <div className="p-2 flex items-center gap-8">
          <label className="flex items-center gap-2">
            <input
              name="referredToHigherCentre"
              type="checkbox"
              onChange={handleBabyCare}
              value={true}
              checked={careOfBabyInfo?.referredToHigherCentre === true}
            />
            {t("Yes")}
          </label>
          <label className="flex items-center gap-2">
            <input
              name="referredToHigherCentre"
              type="checkbox"
              onChange={handleBabyCare}
              value={false}
              checked={careOfBabyInfo?.referredToHigherCentre === false}
            />
            {t("No")}
          </label>
          <label className="flex w-full items-center gap-2">
            <span className=""> {t("If Yes, Reason:")}</span>
            <textarea
              name="referralReason"
              onChange={handleBabyCare}
              value={careOfBabyInfo?.referralReason}
              type="text"
              className="border w-1/3 bg-[#F9FAFB] focus:border-[#2D2E33] text-sm text-gray-800 py-2 focus:outline-none rounded-lg placeholder:text-[#D1D5DB] px-3"
            />
          </label>
        </div>
      </div>
    </div>
  );
};

export default GeneralExamination;
