import Modal from "../../../../../common-components/Modal";
import Tooltip from "../../../../../common-components/Tooltip";
import PrimaryButton from "../../../../../common-components/Buttons/PrimaryButton";
import TertiaryButton from "../../../../../common-components/Buttons/TertiaryButton";
import { lowerTeeth, upperTeeth } from "./Teeth";

const radiusX = 100; // horizontal spread
const radiusY = 200; // vertical spread (smaller than X makes it oval)
const toothSize = 0;

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
      modalWidth="min-w-[50%]"
      modalHeight="min-h-[80%] max-h-[90%]"
      showModal={isTeethMapOpen}
      onClose={() => setIsTeethMapOpen(false)}
    >
      <div className="flex flex-col items-center p-6">
        <h2 className="text-xl font-semibold">Teeth Map</h2>
        <div className="relative p-6">
          <div className="mt-48">
            <div className=" relative">
              <span className="text-sm font-semibold ml-8 text-green-600">
                Upper (maxillary)
              </span>
              {upperTeeth.map((tooth, index) => {
                const angle = Math.PI - (index / 15) * Math.PI; // π to 0 radians
                const x = radiusX * Math.cos(angle);
                const y = radiusY * Math.sin(angle);

                return (
                  <div
                    key={tooth.id}
                    className="absolute"
                    style={{
                      left: `calc(50% + ${x - toothSize / 2}px)`,
                      top: `calc(50% + ${-y - toothSize / 2}px)`, // Flip arc down
                    }}
                  >
                    <Tooltip
                      placement="right"
                      width="w-40"
                      content={`${tooth.id} | ${tooth.name}`}
                    >
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

            <div className="flex relative justify-center">
              <span className="text-sm font-semibold ml-8 mt-32 text-green-600">
                Lower (mandibular)
              </span>
              {lowerTeeth.map((tooth, index) => {
                const angle = Math.PI - (index / 15) * Math.PI; // π to 0 radians
                const x = radiusX * Math.cos(angle);
                const y = radiusY * Math.sin(angle); // ⬅️ No negative here

                return (
                  <div
                    key={tooth.id}
                    className="absolute"
                    style={{
                      left: `calc(50% + ${x - toothSize / 2}px)`,
                      top: `calc(50% + ${y - toothSize / 2}px)`, // ✅ This curves it upward
                    }}
                  >
                    <Tooltip
                      content={`${tooth.id} | ${tooth.name}`}
                      placement="right"
                      width="w-40"
                    >
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
          </div>
        </div>
      </div>
      <div className="py-4 right-10  absolute bottom-0 items-center flex gap-4">
        <TertiaryButton
          buttonName="Reset"
          onClick={() => dentalReset(teethDataIndex)}
        />
        <PrimaryButton
          onClick={() => setIsTeethMapOpen(false)}
          buttonName="Done"
        />
      </div>
    </Modal>
  );
}
