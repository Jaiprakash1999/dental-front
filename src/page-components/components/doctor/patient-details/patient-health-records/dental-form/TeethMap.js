import Modal from "../../../../../common-components/Modal";
import Tooltip from "../../../../../common-components/Tooltip";
import PrimaryButton from "../../../../../common-components/Buttons/PrimaryButton";
import TertiaryButton from "../../../../../common-components/Buttons/TertiaryButton";
import { lowerTeeth, upperTeeth } from "./Teeth";
const radius = 180;
const toothSize = 48;

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
      modalWidth="min-w-[70%]"
      modalHeight="min-h-[80%] max-h-[90%]"
      showModal={isTeethMapOpen}
      onClose={() => setIsTeethMapOpen(false)}
    >
      <div className="flex flex-col items-center p-6">
        <h2 className="text-xl font-semibold mb-4">Teeth Map</h2>
        <div className="relative p-6">
          <div className="flex flex-col items-center">
            <div className="flex justify-center gap-2 my-32">
              {upperTeeth.map((tooth, index) => {
                const angle = Math.PI - (index / 15) * Math.PI; // π to 0 radians
                const x = radius * Math.cos(angle);
                const y = radius * Math.sin(angle);

                return (
                  <div
                    key={tooth.id}
                    className="absolute"
                    style={{
                      left: `calc(50% + ${x - toothSize / 2}px)`,
                      top: `calc(50% + ${-y - toothSize / 2}px)`, // Flip arc down
                    }}
                  >
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
                      >
                        {dentalFormInfo?.teethData[
                          teethDataIndex
                        ].teethsInvolved?.includes(
                          `${tooth.id} | ${tooth.name}`
                        )
                          ? tooth.blueIcon
                          : tooth.grayIcon}
                      </button>
                    </Tooltip>
                  </div>
                );
              })}
            </div>
            <span className="text-sm font-semibold text-green-600">
              Upper (maxillary)
            </span>
            <div className="flex justify-center gap-2 mt-14">
              {lowerTeeth.map((tooth, index) => {
                const angle = Math.PI - (index / 15) * Math.PI; // π to 0 radians
                const x = radius * Math.cos(angle);
                const y = radius * Math.sin(angle); // ⬅️ No negative here

                return (
                  <div
                    key={tooth.id}
                    className="absolute"
                    style={{
                      left: `calc(50% + ${x - toothSize / 2}px)`,
                      top: `calc(50% + ${y - toothSize / 2}px)`, // ✅ This curves it upward
                    }}
                  >
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
                      >
                        {dentalFormInfo?.teethData[
                          teethDataIndex
                        ].teethsInvolved?.includes(
                          `${tooth.id} | ${tooth.name}`
                        )
                          ? tooth.blueIcon
                          : tooth.grayIcon}
                      </button>
                    </Tooltip>
                  </div>
                );
              })}
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
