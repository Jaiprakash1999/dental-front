import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const { REACT_APP_API_KEY } = process.env || {};

const openHtmlInNewTab = (htmlContent) => {
  const newTab = window.open();
  if (newTab) {
    newTab.document.write(htmlContent);
    newTab.document.close();
  } else {
    console.error("Popup blocked! Please allow popups for this site.");
  }
};

const useGetMMUunitSync = () => {
  const navigate = useNavigate();
  const [isMMUsyncing, setIsMMUsyncing] = useState(false);
  const [mmuUnitData, setMmuUnitData] = useState({});
  const [isMMUuploaading, setIsMMUuploading] = useState(false);

  const getMMUunitData = useCallback(async () => {
    setIsMMUsyncing(true);
    const token = localStorage.getItem("authToken");
    try {
      const response = await axios.get(
        `${REACT_APP_API_KEY}/api/v1/mmu/data-backup/mmu`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "ngrok-skip-browser-warning": "hgs",
          },
        }
      );
      setMmuUnitData(response.data);
    } catch (error) {
      console.error(error, "error");
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
      setIsMMUsyncing(false);
    }
  }, [navigate]);

  const onSyncMMUData = useCallback(async () => {
    setIsMMUuploading(true);
    const token = localStorage.getItem("authToken");
    try {
      const res = await axios.post(
        `${REACT_APP_API_KEY}/api/v1/mmu/data-backup/sync/all/mmu`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "ngrok-skip-browser-warning": "hgs",
          },
        }
      );
      getMMUunitData();
      openHtmlInNewTab(res.data);
    } catch (error) {
      console.error(error, "error");
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
      setIsMMUuploading(false);
    }
  }, [navigate, getMMUunitData]);

  useEffect(() => {
    getMMUunitData();
  }, [getMMUunitData]);

  return {
    onSyncMMUData,
    isMMUsyncing,
    mmuUnitData,
    isMMUuploaading,
  };
};

export default useGetMMUunitSync;
