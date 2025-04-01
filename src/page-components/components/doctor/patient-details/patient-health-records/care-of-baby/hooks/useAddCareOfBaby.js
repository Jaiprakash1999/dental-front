import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const { REACT_APP_API_KEY } = process.env;

const useAddCareOfBaby = ({
  careOfBabyInfo = {},
  getAllPatientRecord = () => {},
  setActiveHealthTab = () => {},
}) => {
  const navigate = useNavigate();
  const [isBabyCareLoading, setIsAntenatalLoading] = useState(false);
  const patientData = useSelector((state) => state.patientDetails);
  const { patientId } = patientData || {};

  const onSubmitBabyCare = async () => {
    setIsAntenatalLoading(true);
    try {
      const token = localStorage.getItem("authToken");
      await axios.post(
        `${REACT_APP_API_KEY}/api/v1/mmu/records/care-of-baby`,
        {
          patientId: patientId,
          ...careOfBabyInfo,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "ngrok-skip-browser-warning": "hgs",
          },
        }
      );

      toast.success("Care of baby form is submitted successfully !");
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
      setIsAntenatalLoading(false);
    }
  };

  const onUpdateBabyCare = async (id) => {
    setIsAntenatalLoading(true);
    try {
      const token = localStorage.getItem("authToken");
      await axios.put(
        `${REACT_APP_API_KEY}/api/v1/mmu/records/care-of-baby/${id}`,
        {
          ...careOfBabyInfo,
          id: undefined,
          updatedBy: undefined,
          isDelete: undefined,
          createdBy: undefined,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "ngrok-skip-browser-warning": "hgs",
          },
        }
      );

      toast.success("Care of baby record is updated successfully !");
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
      setIsAntenatalLoading(false);
    }
  };

  return { isBabyCareLoading, onSubmitBabyCare, onUpdateBabyCare };
};

export default useAddCareOfBaby;
