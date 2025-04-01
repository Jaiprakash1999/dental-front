import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSocket } from "../../../utils/socket";
import { addNotification } from "../../../../redux-store/slice/notificationSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const { REACT_APP_API_KEY, REACT_APP_API_HOSPITAL_KEY } = process.env;

const useSendMessage = ({ setInputMessage = () => {} }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isMessageLoading, setIsMessageLoading] = useState(false);
  const [messageList, setMessageList] = useState([]);
  const [isMessageSending, setIsMessageSending] = useState(false);
  const activeNavbar = useSelector((state) => state.activeNavbar);
  const selectedUser = useSelector((state) => state.selectedUser);
  const allNotification = useSelector((state) => state.allNotification);
  const { messages = [] } = allNotification || {};

  const { id } = selectedUser || {};

  // Function to fetch messages
  const getMessageList = useCallback(async () => {
    if (!id && !messages[messages?.length - 1]?.id) return;
    setIsMessageLoading(true);
    try {
      const token = localStorage.getItem("authToken");
      const res = await axios.get(`${REACT_APP_API_KEY}/api/v1/mmu/chat`, {
        params: { userId: id || messages[messages?.length - 1]?.id },
        headers: {
          Authorization: `Bearer ${token}`,
          "ngrok-skip-browser-warning": "hgs",
        },
      });
      setMessageList(res.data);
    } catch (error) {
      console.error("Error fetching messages:", error);

      const errorMessage = error.response?.data?.message;
      if (!error.response) {
        toast.error("Oops, something went wrong");
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
      setIsMessageLoading(false);
    }
  }, [id, navigate, messages]);

  const getMessageListOnline = useCallback(async () => {
    if (!id && !messages[messages?.length - 1]?.id) return;
    setIsMessageLoading(true);
    try {
      const token = localStorage.getItem("authToken");
      const res = await axios.get(
        `${REACT_APP_API_HOSPITAL_KEY}/api/v1/mmu/chat`,
        {
          params: { userId: id || messages[messages?.length - 1]?.id },
          headers: {
            Authorization: `Bearer ${token}`,
            "ngrok-skip-browser-warning": "hgs",
          },
        }
      );
      setMessageList(res.data);
    } catch (error) {
      console.error("Error fetching messages:", error);

      const errorMessage = error.response?.data?.message;
      if (!error.response) {
        getMessageList();
        // toast.error("Oops, something went wrong");
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
      setIsMessageLoading(false);
    }
  }, [id, navigate, getMessageList, messages]);

  // Function to send a message
  const onAddMessage = async (inputMessage) => {
    if (!id || !inputMessage?.message) return;

    setIsMessageSending(true);
    try {
      const token = localStorage.getItem("authToken");
      const socket = getSocket();

      if (socket) {
        socket.emit("notification", {
          message: inputMessage?.message,
          userId: id,
        });
      }

      await axios.post(
        `${REACT_APP_API_HOSPITAL_KEY}/api/v1/mmu/chat`,
        { message: inputMessage?.message, userId: id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "ngrok-skip-browser-warning": "hgs",
          },
        }
      );

      getMessageListOnline();
      setInputMessage({ message: "", document: [] });
    } catch (error) {
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
      setIsMessageSending(false);
    }
  };

  // Fetch messages when selected user changes
  useEffect(() => {
    if (id !== undefined || messages[messages?.length - 1]?.id !== undefined) {
      getMessageListOnline();
    }
  }, [getMessageListOnline, id, messages]);

  // Handle incoming notifications
  useEffect(() => {
    const socket = getSocket();
    if (!socket) {
      console.log("Socket is not connected");
      return;
    }

    console.log("Listening for notifications...");

    const handleNotification = (notification) => {
      console.log("Notification received:", notification);
      console.log("Active Navbar:", activeNavbar);

      if (activeNavbar !== "message") {
        console.log("User is NOT in chat, increasing notification count");
        dispatch(addNotification(notification)); // Increase count
      } else {
        console.log("User IS in chat, fetching new messages");
        getMessageListOnline(); // Refresh messages
      }
    };

    socket.on("notification", handleNotification);

    return () => {
      socket.off("notification", handleNotification);
    };
  }, [activeNavbar, getMessageListOnline, dispatch]);

  return { onAddMessage, isMessageLoading, isMessageSending, messageList };
};

export default useSendMessage;
