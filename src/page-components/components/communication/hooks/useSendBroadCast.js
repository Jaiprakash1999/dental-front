import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getSocket } from "../../../utils/socket";
import { useNavigate } from "react-router-dom";
// import { addNotification } from "../../../../redux-store/slice/notificationSlice";
const {
  //  REACT_APP_API_KEY,
  REACT_APP_API_HOSPITAL_KEY,
} = process.env || {};

// const convertFileToBase64 = (file) => {
//   return new Promise((resolve, reject) => {
//     const reader = new FileReader();
//     reader.onloadend = () => {
//       resolve(reader.result); // This will be the base64 string
//     };
//     reader.onerror = reject;
//     reader.readAsDataURL(file); // Read the file as a data URL (base64)
//   });
// };

const useSendBroadCast = ({
  selectUser = {},
  notificationInfo = {},
  getNotifications = () => {},
  setSelectedNotifications = () => {},
}) => {
  const navigate = useNavigate();
  const [isBroadCastLoading, setIsBroadCastLoading] = useState(false);

  const onSendBroadCast = async () => {
    setIsBroadCastLoading(true);
    try {
      // const base64Files = await Promise.all(
      //   notificationInfo.document.map((file) => convertFileToBase64(file))
      // );
      const token = localStorage.getItem("authToken");
      const socket = getSocket();

      if (socket) {
        console.log("Sending broadcast notification event to socket");
        socket.emit("notification", {
          subject: notificationInfo.subject,
          message: notificationInfo.message,
        });
      }

      await axios.post(
        `${REACT_APP_API_HOSPITAL_KEY}/api/v1/mmu/chat/broadcast`,
        {
          subject: notificationInfo.subject,
          message: notificationInfo.message,
          // file:
          //   notificationInfo.document.length === 0 ? undefined : base64Files,
          userType:
            selectUser.mmuHead && selectUser.mmuStaff
              ? null
              : selectUser.mmuHead
              ? "MMUHEAD"
              : selectUser.mmuStaff
              ? "MMUSTAFF"
              : null,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "ngrok-skip-browser-warning": "hgs",
          },
        }
      );
      toast.success("Message hshs sent successfully !");
      getNotifications();
      setTimeout(() => {
        setSelectedNotifications(null);
      }, 1000);
    } catch (error) {
      console.error(error, "error");
      const errorMessage = error.response?.data?.message;
      if (!error.response) {
        toast.error("It seems that you are not connected to the internet!");
      } else {
        const messageContent = Array.isArray(errorMessage) ? (
          <ul className="ms-2 list-disc">
            {errorMessage.map((msg, index) => (
              <li key={index}>{msg}</li>
            ))}
          </ul>
        ) : (
          errorMessage || "An unknown error occurred"
        );
        toast.error(messageContent);
        if (error.response?.data?.statusCode === 401) {
          localStorage.removeItem("authToken");
          setTimeout(() => {
            navigate("/");
          }, 1000);
        }
      }
    } finally {
      setIsBroadCastLoading(false);
    }
  };

  // Handle incoming notifications
  useEffect(() => {
    const socket = getSocket();
    if (!socket) {
      console.log("Socket is not connected");
      return;
    }

    const handleNotification = (notification) => {
      // console.log("Notification received:", notification);
      getNotifications(); // Refresh messages
      // if (activeNavbar !== "message") {
      //   console.log("User is NOT in chat, increasing notification count");
      //   dispatch(addNotification(notification)); // Increase count
      // } else {
      //   console.log("User IS in chat, fetching new messages");
      //   getNotifications(); // Refresh messages
      // }
    };

    socket.on("notification", handleNotification);

    return () => {
      socket.off("notification", handleNotification);
    };
  }, [getNotifications]);

  return { onSendBroadCast, isBroadCastLoading };
};

export default useSendBroadCast;
