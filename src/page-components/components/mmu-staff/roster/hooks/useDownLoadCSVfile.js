import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { downloadCSV } from "../../../../utils/downloadCSV";
import { useNavigate } from "react-router-dom";
const { REACT_APP_API_KEY } = process.env || {};

const useDownLoadCSVfile = ({ selectedHeadID, currentPage }) => {
  const navigate = useNavigate();
  const [isCSVloading, setIsCSVloading] = useState(false);

  const onDownloadCSVfileOfPatient = async () => {
    setIsCSVloading(true);
    try {
      const token = localStorage.getItem("authToken");
      const res = await axios.get(
        `${REACT_APP_API_KEY}/api/v1/mmu/visit/search`,
        {
          params: {
            mmuHead: selectedHeadID,
            page: currentPage - 1,
            pageSize: -1,
          },
          headers: {
            Authorization: `Bearer ${token}`,
            "ngrok-skip-browser-warning": "hgs",
          },
        }
      );
      downloadCSV(
        res.data?.visits,
        `patient_list${new Date().toISOString()}.csv`
      );
      toast.success("Downloaded successfully!");
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

  return { isCSVloading, onDownloadCSVfileOfPatient };
};

export default useDownLoadCSVfile;
