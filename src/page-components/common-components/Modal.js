import { useEffect } from "react";

const Modal = ({
  children,
  onClose,
  showModal,
  modalWidth = "w-1/4",
  modalHeight = "h-1/2",
  mcpCardClicked,
}) => {
  useEffect(() => {
    if (showModal) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [showModal]);

  if (!showModal) return null;

  return (
    <div
      style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
      className="fixed w-full h-full top-0 left-0 flex  justify-center items-center z-[1000] overflow-auto "
    >
      <div
        style={{ boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)" }}
        className={`relative ${modalWidth} ${modalHeight} overflow-auto bg-white rounded-lg`}
      >
        {!mcpCardClicked && (
          <button
            onClick={onClose}
            className="text-[#9CA3AF] z-50 absolute top-2 right-4 cursor-pointer text-xl"
          >
            &#10005;
          </button>
        )}
        {children}
      </div>
    </div>
  );
};

export default Modal;
