import React, { useEffect, useRef } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import LandingPage from "./page-components/components/landing-page/LandingPage";
import Welcome from "./page-components/components/welcome/Welcome";
import Doctor from "./page-components/components/doctor/Doctor";
import CreatePrescription from "./page-components/components/doctor/create-prescription/CreatePrescription";
import TemplatePreview from "./page-components/components/doctor/create-prescription/TemplatePreview";
import Settings from "./page-components/components/hip/settings/Settings";
import notificationSound from "./sounds/notificationSound.mpeg";
import { getSocket, initializeSocket } from "./page-components/utils/socket";
import { addNotification } from "./redux-store/slice/notificationSlice";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentCoordinate } from "./redux-store/slice/coordinateSlice";

const Routing = () => {
  const token = localStorage.getItem("authToken");
  const dispatch = useDispatch();
  const audioRef = useRef(null);
  const currentCoordinate = useSelector((state) => state.currentCoordinate);

  const playNotificationSound = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio(notificationSound);
    }
    audioRef.current.currentTime = 0; // Restart sound if already playing
    audioRef.current
      .play()
      .catch((err) => console.log("Audio play error:", err));
  };

  useEffect(() => {
    if (token) {
      initializeSocket(token); // Ensure socket initializes if not already
    }

    if (currentCoordinate.latitude === undefined) {
      console.log("Please connect GPS receivers");
    }

    const unlockAutoplay = new Audio();
    unlockAutoplay.src = notificationSound;
    unlockAutoplay.play().catch((err) => console.log("Autoplay error:", err));

    const socket = getSocket();
    if (socket) {
      socket.on("location", (location) => {
        // console.log(location, "location");
        if (location.latitude === undefined) {
          alert("Please connect GPS receivers");
        }
        dispatch(setCurrentCoordinate(location));
      });

      socket.on("notification", (notification) => {
        console.log("New notification received:", notification);
        dispatch(addNotification(notification));
        playNotificationSound();
      });

      return () => {
        socket.off("notification");
        socket.off("location");
      };
    }
    // eslint-disable-next-line
  }, [token, dispatch]);

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/doctor" element={<Doctor />} />
          <Route path="/welcome" element={<Welcome />} />

          <Route
            path="/doctor/createPrescription"
            element={<CreatePrescription />}
          />
          <Route path="/templatePreview" element={<TemplatePreview />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default Routing;
