import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { setPatientDetails } from "../../../../redux-store/slice/patientDetails";
import { setPrescriptionData } from "../../../../redux-store/slice/prescriptionDataSlice";
import { toast } from "react-toastify";
const { REACT_APP_API_KEY } = process.env;

const useGetPatientDetails = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const stateData = useLocation();
  const prescriptionData = useSelector((state) => state.prescriptionData);
  const [isPatientDetailsLoading, setIsPatientDetailsLoading] = useState(true);
  const { state } = stateData || {};
  const { id, patientId } = state || {};

  const getPatientDetails = useCallback(async () => {
    let api = `api/v1/mmu/patient/${patientId}`;
    if (patientId === undefined) {
      api = "api/v1/mmu/visit";
    } else {
      api = `api/v1/mmu/patient/${patientId}`;
    }
    try {
      const token = localStorage.getItem("authToken");
      const res = await axios.get(`${REACT_APP_API_KEY}/${api}`, {
        params: {
          id: id === undefined ? undefined : id,
        },
        headers: {
          Authorization: `Bearer ${token}`,
          "ngrok-skip-browser-warning": "hgs",
        },
      });
      let patientData = res.data;
      if (patientData.patientId === undefined) {
        patientData = { ...patientData, patientId: patientId };
      }
      dispatch(setPatientDetails(patientData));
      dispatch(
        setPrescriptionData({
          ...prescriptionData,
          chiefComplaint: res.data?.chiefComplaint,
        })
      );
      setIsPatientDetailsLoading(false);
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
      setIsPatientDetailsLoading(false);
    }
    // eslint-disable-next-line
  }, [id, dispatch, navigate]);

  useEffect(() => {
    getPatientDetails();
  }, [id, getPatientDetails]);

  return { isPatientDetailsLoading };
};

export default useGetPatientDetails;
