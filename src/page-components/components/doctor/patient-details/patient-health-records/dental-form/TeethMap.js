import Modal from "../../../../../common-components/Modal";
import { faTooth } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Tooltip from "../../../../../common-components/Tooltip";
import PrimaryButton from "../../../../../common-components/Buttons/PrimaryButton";
import TertiaryButton from "../../../../../common-components/Buttons/TertiaryButton";

const upperTeeth = [
  { id: 18, name: "Second Molar (Right)", icon: faTooth },
  { id: 17, name: "First Molar (Right)", icon: faTooth },
  { id: 16, name: "Second Premolar (Right)", icon: faTooth },
  { id: 15, name: "First Premolar (Right)", icon: faTooth },
  { id: 14, name: "Canine (Right)", icon: faTooth },
  { id: 13, name: "Lateral Incisor (Right)", icon: faTooth },
  { id: 12, name: "Central Incisor (Right)", icon: faTooth },
  { id: 11, name: "Central Incisor (Left)", icon: faTooth },
  { id: 21, name: "Lateral Incisor (Left)", icon: faTooth },
  { id: 22, name: "Canine (Left)", icon: faTooth },
  { id: 23, name: "First Premolar (Left)", icon: faTooth },
  { id: 24, name: "Second Premolar (Left)", icon: faTooth },
  { id: 25, name: "First Molar (Left)", icon: faTooth },
  { id: 26, name: "Second Molar (Left)", icon: faTooth },
];

const lowerTeeth = [
  { id: 48, name: "Second Molar (Right)", icon: faTooth },
  { id: 47, name: "First Molar (Right)", icon: faTooth },
  { id: 46, name: "Second Premolar (Right)", icon: faTooth },
  { id: 45, name: "First Premolar (Right)", icon: faTooth },
  { id: 44, name: "Canine (Right)", icon: faTooth },
  { id: 43, name: "Lateral Incisor (Right)", icon: faTooth },
  { id: 42, name: "Central Incisor (Right)", icon: faTooth },
  { id: 41, name: "Central Incisor (Left)", icon: faTooth },
  { id: 31, name: "Lateral Incisor (Left)", icon: faTooth },
  { id: 32, name: "Canine (Left)", icon: faTooth },
  { id: 33, name: "First Premolar (Left)", icon: faTooth },
  { id: 34, name: "Second Premolar (Left)", icon: faTooth },
  { id: 35, name: "First Molar (Left)", icon: faTooth },
  { id: 36, name: "Second Molar (Left)", icon: faTooth },
];

export default function TeethMap({
  isTeethMapOpen = false,
  setIsTeethMapOpen = () => {},
  dentalFormInfo = {},
  handleChange = () => {},
  dentalReset = () => {},
  teethDataIndex = 0,
}) {
  return (
    <Modal
      modalWidth="min-w-1/2"
      modalHeight="min-h-1/2"
      showModal={isTeethMapOpen}
      onClose={() => setIsTeethMapOpen(false)}
    >
      <div className="flex flex-col items-center p-6">
        <h2 className="text-xl font-semibold mb-4">Teeth Map</h2>
        <div className="relative p-6 border-2 border-dashed border-gray-300 rounded-md">
          <div className="flex flex-col items-center">
            <div className="flex justify-center gap-2 mb-4">
              {upperTeeth.map((tooth, index) => (
                <div key={tooth.id}>
                  <Tooltip content={`${tooth.id} | ${tooth.name}`}>
                    <button
                      onClick={() =>
                        handleChange(
                          {
                            target: {
                              name: "teethsInvolved",
                              value: `${tooth.id} | ${tooth.name}`,
                            },
                          },
                          teethDataIndex
                        )
                      }
                      className={`${
                        dentalFormInfo?.teethData[
                          teethDataIndex
                        ].teethsInvolved?.includes(
                          `${tooth.id} | ${tooth.name}`
                        )
                          ? "bg-[#4C6AF7] text-white"
                          : "border-[#DADADA] border"
                      } w-8 py-2 rounded-lg`}
                    >
                      <FontAwesomeIcon icon={tooth.icon} />
                    </button>
                  </Tooltip>
                </div>
              ))}
            </div>
            <span className="text-sm font-semibold text-green-600">
              Upper (maxillary)
            </span>
            <div className="flex justify-center gap-2 mt-4">
              {lowerTeeth.map((tooth, index) => (
                <div key={tooth.id}>
                  <Tooltip content={`${tooth.id} | ${tooth.name}`}>
                    <button
                      onClick={() =>
                        handleChange(
                          {
                            target: {
                              name: "teethsInvolved",
                              value: `${tooth.id} | ${tooth.name}`,
                            },
                          },
                          teethDataIndex
                        )
                      }
                      className={`${
                        dentalFormInfo?.teethData[
                          teethDataIndex
                        ].teethsInvolved?.includes(
                          `${tooth.id} | ${tooth.name}`
                        )
                          ? "bg-[#4C6AF7] text-white"
                          : "border-[#DADADA] border"
                      } w-8 py-2 rounded-lg`}
                    >
                      <FontAwesomeIcon icon={tooth.icon} />
                    </button>
                  </Tooltip>
                </div>
              ))}
            </div>
            <span className="text-sm font-semibold text-green-600 mt-2">
              Lower (mandibular)
            </span>
          </div>
        </div>
        <div className="mt-4 items-center flex gap-4">
          <TertiaryButton
            buttonName="Reset"
            onClick={() => dentalReset(teethDataIndex)}
          />
          <PrimaryButton
            onClick={() => setIsTeethMapOpen(false)}
            buttonName="Done"
          />
        </div>
      </div>
    </Modal>
  );
}
