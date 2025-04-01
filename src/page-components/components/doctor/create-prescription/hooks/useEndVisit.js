import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  initialState,
  setPrescriptionData,
} from "../../../../../redux-store/slice/prescriptionDataSlice";
import { firstLetterCapital } from "../../../../utils/firstLetterCapital";
const { REACT_APP_API_KEY } = process.env;

const useEndVisit = ({ onClose = () => {} }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isEndVisitLoading, setIsEndVisitLoading] = useState(false);

  const onEndVisit = async (e, status, id) => {
    e.preventDefault();
    setIsEndVisitLoading(true);
    try {
      const token = localStorage.getItem("authToken");
      await axios.put(
        `${REACT_APP_API_KEY}/api/v1/mmu/visit/editStatus/${id}`,
        {
          visitStatus: status,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "ngrok-skip-browser-warning": "hgs",
          },
        }
      );
      toast.success(`Visit ${firstLetterCapital(status)} Successfully !`);
      setTimeout(() => {
        onClose();
        dispatch(setPrescriptionData(initialState));
        navigate("/welcome");
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
    }
    setIsEndVisitLoading(false);
  };

  return {
    onEndVisit,
    isEndVisitLoading,
  };
};

export default useEndVisit;
