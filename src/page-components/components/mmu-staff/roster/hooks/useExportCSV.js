import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const { REACT_APP_API_KEY } = process.env || {};

const useExportCSV = () => {
  const navigate = useNavigate();
  const [isCSVloading, setIsCSVloading] = useState(false);

  const onDownloadCSV = async (tableName) => {
    setIsCSVloading(true);
    const token = localStorage.getItem("authToken");
    try {
      const response = await axios.post(
        `${REACT_APP_API_KEY}/api/v1/mmu/data-backup/${tableName}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "ngrok-skip-browser-warning": "hgs",
          },
          responseType: "blob",
        }
      );
      // Create a blob from the response
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      const filename = `${tableName}${new Date().toISOString()}.csv`;
      link.setAttribute("download", filename);
      document.body.appendChild(link);
      link.click();
      link.remove();
      toast.success("data downloaded successfully!");
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
      setIsCSVloading(false);
    }
  };

  return { isCSVloading, onDownloadCSV };
};

export default useExportCSV;
