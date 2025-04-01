import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const { REACT_APP_API_KEY } = process.env;

const useAddScreeingForm = ({
  screeningFormInfo = {},
  getAllPatientRecord = () => {},
  setActiveHealthTab = () => {},
}) => {
  const navigate = useNavigate();

  const [isAddingScreeing, setIsAddingScreening] = useState(false);
  const patientData = useSelector((state) => state.patientDetails);
  const { patientId } = patientData || {};

  const { labTest, diagnosis, notes } = screeningFormInfo || {};

  const onSubmitScreeningForm = async () => {
    setIsAddingScreening(true);
    try {
      const token = localStorage.getItem("authToken");
      await axios.post(
        `${REACT_APP_API_KEY}/api/v1/mmu/records/screening-form`,
        {
          patientId: patientId,
          diagnosis: diagnosis,
          labInvestigations: labTest,
          notes: notes,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "ngrok-skip-browser-warning": "hgs",
          },
        }
      );

      toast.success("Screening Form is submitted successfully !");
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
      setIsAddingScreening(false);
    }
  };

  const onUpdateScreeningForm = async (id) => {
    setIsAddingScreening(true);
    try {
      const token = localStorage.getItem("authToken");
      await axios.put(
        `${REACT_APP_API_KEY}/api/v1/mmu/records/screening-form/update/${id}`,
        {
          diagnosis: diagnosis,
          labInvestigations: labTest,
          notes: notes,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "ngrok-skip-browser-warning": "hgs",
          },
        }
      );

      toast.success("Screening Form is updated successfully !");
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
      setIsAddingScreening(false);
    }
  };

  return { isAddingScreeing, onSubmitScreeningForm, onUpdateScreeningForm };
};

export default useAddScreeingForm;
