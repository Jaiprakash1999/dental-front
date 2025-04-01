import { io } from "socket.io-client";

const { REACT_APP_API_KEY } = process.env;
let socket = null;

export const initializeSocket = (token) => {
  if (!socket) {
    socket = io(REACT_APP_API_KEY, {
      reconnection: true, // Ensures automatic reconnection
      reconnectionAttempts: 10, // Try to reconnect 10 times
      reconnectionDelay: 5000, // Delay between reconnect attempts
      extraHeaders: {
        "ngrok-skip-browser-warning": "hgs",
        Authorization: token,
      },
    });

    socket.on("connect", () => {
      console.log("Socket connected:", socket.id);
    });

    socket.on("disconnect", () => {
      console.log("Socket disconnected. Attempting to reconnect...");
    });

    socket.on("connect_error", (err) => {
      console.error("Socket connection error:", err);
    });
  }
  return socket;
};

export const getSocket = () => socket;
