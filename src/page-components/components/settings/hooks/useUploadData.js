import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const { REACT_APP_API_KEY } = process.env;

const useUploadData = () => {
  const navigate = useNavigate();
  const mmuUnitName = useSelector((state) => state.mmuUnitName);
  const [syncData, setSyncData] = useState({});
  const [isSyncDataLoading, setIsSyncDataLoading] = useState(false);

  const getSyncedData = useCallback(async () => {
    setIsSyncDataLoading(true);
    const token = localStorage.getItem("authToken");
    try {
      const response = await axios.get(
        `${REACT_APP_API_KEY}/api/v1/mmu/data-backup`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "ngrok-skip-browser-warning": "hgs",
          },
        }
      );
      setSyncData(response.data);
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
      setIsSyncDataLoading(false);
    }
  }, [navigate]);

  const onSyncData = useCallback(async () => {
    setIsSyncDataLoading(true);
    const token = localStorage.getItem("authToken");
    try {
      await axios.post(
        `${REACT_APP_API_KEY}/api/v1/mmu/data-backup/${mmuUnitName}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "ngrok-skip-browser-warning": "hgs",
          },
        }
      );
      getSyncedData();
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
      setIsSyncDataLoading(false);
    }
  }, [getSyncedData, mmuUnitName, navigate]);

  useEffect(() => {
    getSyncedData();
  }, [getSyncedData]);

  return {
    onSyncData,
    isSyncDataLoading,
    syncData,
  };
};

export default useUploadData;
