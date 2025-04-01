import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const { REACT_APP_API_KEY } = process.env;

const useAddWellnessRecord = ({
  wellnessRecordInfo = {},
  getAllPatientRecord = () => {},
  setActiveHealthTab = () => {},
}) => {
  const navigate = useNavigate();
  const [isAddingWellness, setIsAddingWellness] = useState(false);
  const patientData = useSelector((state) => state.patientDetails);
  const { id } = patientData || {};

  const {
    height,
    weight,
    temperature,
    pulseRate,
    bloodPressure,
    lungs,
    respiratoryRate,
    spo2,
    heart,
    hemoglobinInPercent,
    notes,
  } = wellnessRecordInfo || {};

  const onSubmittingWellness = async () => {
    setIsAddingWellness(true);
    try {
      const token = localStorage.getItem("authToken");
      await axios.post(
        `${REACT_APP_API_KEY}/api/v1/mmu/records/vital-form/vital`,
        {
          visitId: id,
          weightInKg: +weight,
          heightInCm: +height,
          heart: heart,
          lungs: lungs,
          tempInCelsius: +temperature,
          bloodPressure: bloodPressure,
          spo2InPercent: +spo2,
          respiratoryRateInBpm: +respiratoryRate,
          pulseRateInBpm: +pulseRate,
          hemoglobinInPercent: +hemoglobinInPercent,
          notes: notes,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "ngrok-skip-browser-warning": "hgs",
          },
        }
      );

      toast.success("Vital record is submitted successfully !");
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
      setIsAddingWellness(false);
    }
  };

  return { isAddingWellness, onSubmittingWellness };
};

export default useAddWellnessRecord;
