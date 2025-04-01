import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { setIsSaveTemplate } from "../../../../../redux-store/slice/saveTemplateModal";
import { useNavigate } from "react-router-dom";
const { REACT_APP_API_KEY } = process.env || {};

const useSaveTemplate = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const prescriptionData = useSelector((state) => state.prescriptionData);
  const [templateData, setTemplateData] = useState({});
  const [isSaveTemplateLoading, setIsSaveTemplateLoading] = useState(false);

  const {
    chiefComplaint = [],
    diagnosis = [],
    rxList = [],
    labInvestigations = [],
    // medicalHandoubts = [],
    instructions,
    lifeStyleRecommendations,
    followUpDate,
    templateName,
  } = prescriptionData || {};

  const onSaveTemplate = async (e) => {
    e.preventDefault();
    setIsSaveTemplateLoading(true);
    const token = localStorage.getItem("authToken");
    try {
      const res = await axios.post(
        `${REACT_APP_API_KEY}/api/v1/mmu/template`,
        {
          chiefComplaint: chiefComplaint,
          followUp: followUpDate,
          lifeStyleRecommendations: lifeStyleRecommendations,
          instructions: instructions,
          diagnosis: diagnosis,
          labInvestigations: labInvestigations,
          templateName: templateName,
          rxList: rxList,
        },

        {
          headers: {
            Authorization: `Bearer ${token}`,
            "ngrok-skip-browser-warning": "hgs",
          },
        }
      );
      setTemplateData(res.data);
      toast.success("Template saved successfully !", {
        position: "top-center",
      });
      setTimeout(() => {
        dispatch(setIsSaveTemplate(false));
      }, 2000);
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
      setIsSaveTemplateLoading(false);
    }
  };

  return {
    onSaveTemplate,
    templateData,
    isSaveTemplateLoading,
  };
};

export default useSaveTemplate;
