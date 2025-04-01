import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const { REACT_APP_API_KEY } = process.env;

const useAddPostNatalCare = ({
  postNatalCare = {},
  getAllPatientRecord = () => {},
  setActiveHealthTab = () => {},
}) => {
  const navigate = useNavigate();
  const [isPostNatalLoading, setIsAntenatalLoading] = useState(false);
  const patientData = useSelector((state) => state.patientDetails);
  const { patientId } = patientData || {};

  const onSubmitPostNatal = async () => {
    setIsAntenatalLoading(true);
    try {
      const token = localStorage.getItem("authToken");
      await axios.post(
        `${REACT_APP_API_KEY}/api/v1/mmu/records/post-natal-care`,
        {
          patientId: patientId,
          ...postNatalCare,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "ngrok-skip-browser-warning": "hgs",
          },
        }
      );

      toast.success("Post Natal Care form is submitted successfully !");
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

  const onUpdatePostNatal = async (id) => {
    setIsAntenatalLoading(true);
    try {
      const token = localStorage.getItem("authToken");
      await axios.put(
        `${REACT_APP_API_KEY}/api/v1/mmu/records/post-natal-care/${id}`,
        {
          ...postNatalCare,
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

      toast.success("Post Natal Care record is updated successfully !");
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

  return { isPostNatalLoading, onSubmitPostNatal, onUpdatePostNatal };
};

export default useAddPostNatalCare;
