import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPrescriptionData } from "../../../../../redux-store/slice/prescriptionDataSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const { REACT_APP_API_KEY } = process.env;

const useGetMedicalHandoubts = () => {
  const navigate = useNavigate();
  const [medicalHandoubts, setMedicalHandoubts] = useState([]);
  const [isMedicalHandobts, setIsMedicalHandoubts] = useState(false);
  const [diagnosisTag, setDiagnosisTag] = useState([]);
  const [isDiagnosisTagLaoding, setIsDiagnosisLoading] = useState(false);
  const dispatch = useDispatch();

  const prescriptionData = useSelector((state) => state.prescriptionData);

  const { diagnosis = [], medicalTags = [] } = prescriptionData || {};

  const getMedicalHandoubts = useCallback(async () => {
    const value =
      medicalTags[0] === undefined
        ? diagnosis[0]?.toUpperCase()
        : medicalTags[0];

    setIsMedicalHandoubts(true);
    try {
      const token = localStorage.getItem("authToken");
      const res = await axios.get(
        // `https://v2.dev-api.parchaa.com/api/user/handouts/getHandouts/${value}`,
        `${REACT_APP_API_KEY}/api/v1/mmu/cortex/getHandoutsByTag`,
        {
          params: { tag: value === undefined ? "" : value },
          headers: {
            Authorization: `Bearer ${token}`,
            "ngrok-skip-browser-warning": "hgs",
          },
        }
      );
      setMedicalHandoubts(res.data);
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
    setIsMedicalHandoubts(false);
  }, [diagnosis, medicalTags, navigate]);

  const handleRemoveOption = (optionToRemove) => {
    const updatedHandouts = medicalHandoubts.filter(
      (option) => option.id !== optionToRemove.id
    );
    setMedicalHandoubts(updatedHandouts);
  };

  const getMedicalTags = useCallback(
    async (inputValue) => {
      setIsDiagnosisLoading(true);

      try {
        const token = localStorage.getItem("authToken");
        const res = await axios.get(
          // `https://v2.dev-api.parchaa.com/api/user/handouts/searchTags/${value}`,
          `${REACT_APP_API_KEY}/api/v1/mmu/cortex/searchTags`,
          {
            params: { query: inputValue },
            headers: {
              Authorization: `Bearer ${token}`,
              "ngrok-skip-browser-warning": "hgs",
            },
          }
        );
        setDiagnosisTag(res.data);
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
      setIsDiagnosisLoading(false);
    },
    [navigate]
  );

  const getHandoutsById = useCallback(
    async (id) => {
      try {
        const token = localStorage.getItem("authToken");
        const res = await axios.get(
          `${REACT_APP_API_KEY}/api/v1/mmu/cortex/handout`,
          {
            params: { id: id },
            headers: {
              Authorization: `Bearer ${token}`,
              "ngrok-skip-browser-warning": "hgs",
            },
            responseType: "blob",
          }
        );

        const pdfUrl = URL.createObjectURL(res.data);
        window.open(pdfUrl, "_blank");
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
    },
    [navigate]
  );

  useEffect(() => {
    getMedicalHandoubts();
  }, [getMedicalHandoubts, medicalTags, diagnosis]);

  useEffect(() => {
    dispatch(
      setPrescriptionData({
        ...prescriptionData,
        medicalTags: [],
      })
    );
    // eslint-disable-next-line
  }, [diagnosis]);

  const addHandoubtsToPrint = (item) => {
    dispatch(
      setPrescriptionData({
        ...prescriptionData,
        medicalHandoubts: [item, ...prescriptionData.medicalHandoubts],
      })
    );
  };

  const removeHandobutsToPrint = (item) => {
    const updatedHandouts = prescriptionData.medicalHandoubts.filter(
      (option) => option.id !== item.id
    );
    dispatch(
      setPrescriptionData({
        ...prescriptionData,
        medicalHandoubts: updatedHandouts,
      })
    );
  };

  const onAddStampToPrint = () => {
    dispatch(
      setPrescriptionData({
        ...prescriptionData,
        stamp: !prescriptionData.stamp,
      })
    );
  };

  const onAddSignatureToPrint = () => {
    dispatch(
      setPrescriptionData({
        ...prescriptionData,
        signature: !prescriptionData.signature,
      })
    );
  };

  return {
    getMedicalHandoubts,
    medicalHandoubts,
    isMedicalHandobts,
    getMedicalTags,
    diagnosisTag,
    isDiagnosisTagLaoding,
    getHandoutsById,
    handleRemoveOption,
    addHandoubtsToPrint,
    removeHandobutsToPrint,
    onAddSignatureToPrint,
    onAddStampToPrint,
    setMedicalHandoubts,
  };
};

export default useGetMedicalHandoubts;
