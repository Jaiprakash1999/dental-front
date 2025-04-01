import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const { REACT_APP_API_KEY } = process.env;

const useGetAllRecord = ({
  vaccinationPage,
  vitalPage,
  screeningPage,
  pregnancyOverviewPage,
  prescriptionPage,
  antenatalCarePage,
  postNatalCarePage,
  careOfBabyPage,
}) => {
  const navigate = useNavigate();
  const [patientRecord, setPatientRecord] = useState({});
  const [isRecordLoading, setIsRecordLoading] = useState(false);
  const patientData = useSelector((state) => state.patientDetails);

  const { patientId } = patientData || {};

  const getAllPatientRecord = useCallback(async () => {
    setIsRecordLoading(true);
    try {
      const token = localStorage.getItem("authToken");
      const res = await axios.get(
        `${REACT_APP_API_KEY}/api/v1/mmu/records/${patientId}`,
        {
          params: {
            vaccinationPage: vaccinationPage - 1,
            vitalPage: vitalPage - 1,
            screeningPage: screeningPage - 1,
            pregnancyOverviewPage: pregnancyOverviewPage - 1,
            prescriptionPage: prescriptionPage - 1,
            antenatalCarePage: antenatalCarePage - 1,
            postNatalCarePage: postNatalCarePage - 1,
            careOfBabyPage: careOfBabyPage - 1,
          },

          headers: {
            Authorization: `Bearer ${token}`,
            "ngrok-skip-browser-warning": "hgs",
          },
        }
      );
      setPatientRecord(res.data?.records);
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
    }
    setIsRecordLoading(false);
  }, [
    patientId,
    vaccinationPage,
    vitalPage,
    screeningPage,
    pregnancyOverviewPage,
    prescriptionPage,
    antenatalCarePage,
    postNatalCarePage,
    careOfBabyPage,
    navigate,
  ]);

  useEffect(() => {
    if (patientId !== undefined) {
      getAllPatientRecord();
    }
  }, [
    patientId,
    getAllPatientRecord,
    vaccinationPage,
    vitalPage,
    screeningPage,
    pregnancyOverviewPage,
    prescriptionPage,
    antenatalCarePage,
    postNatalCarePage,
    careOfBabyPage,
  ]);

  return {
    patientRecord,
    isRecordLoading,
    getAllPatientRecord,
  };
};

export default useGetAllRecord;
