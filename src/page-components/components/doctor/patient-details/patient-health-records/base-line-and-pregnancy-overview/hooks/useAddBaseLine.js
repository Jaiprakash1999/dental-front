import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const { REACT_APP_API_KEY } = process.env;

const useAddBaseLine = ({
  pregnancyRecord = {},
  getAllPatientRecord = () => {},
  setActiveHealthTab = () => {},
}) => {
  const navigate = useNavigate();
  const [isPergnancyLoading, setIsPergnancyLoading] = useState(false);
  const patientData = useSelector((state) => state.patientDetails);
  const { patientId } = patientData || {};

  const onSubmitPergnancy = async () => {
    setIsPergnancyLoading(true);
    try {
      const token = localStorage.getItem("authToken");
      await axios.post(
        `${REACT_APP_API_KEY}/api/v1/mmu/records/pregnancy-overview`,
        {
          patientId: patientId,
          ...pregnancyRecord,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "ngrok-skip-browser-warning": "hgs",
          },
        }
      );

      toast.success("Pergnancy overview form is submitted successfully !");
      getAllPatientRecord();
      setTimeout(() => {
        setActiveHealthTab("");
      }, 1000);
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
      setIsPergnancyLoading(false);
    }
  };

  const onUpdatePergnancy = async (id) => {
    setIsPergnancyLoading(true);
    try {
      const token = localStorage.getItem("authToken");
      await axios.put(
        `${REACT_APP_API_KEY}/api/v1/mmu/records/pregnancy-overview/${id}`,
        {
          ...pregnancyRecord,
          id: undefined,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "ngrok-skip-browser-warning": "hgs",
          },
        }
      );

      toast.success("Pergnancy overview form is updated successfully !");
      getAllPatientRecord();
      setTimeout(() => {
        setActiveHealthTab("");
      }, 1000);
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
      setIsPergnancyLoading(false);
    }
  };

  return { isPergnancyLoading, onSubmitPergnancy, onUpdatePergnancy };
};

export default useAddBaseLine;
