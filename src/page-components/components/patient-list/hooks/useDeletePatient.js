import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const { REACT_APP_API_KEY } = process.env || {};

const useDeletePatient = ({ getPatientList = () => {} }) => {
  const navigate = useNavigate();
  const [isPatientDeleting, setIsUserDeleting] = useState(false);

  const onDelete = async (id) => {
    const token = localStorage.getItem("authToken");
    setIsUserDeleting(true);
    try {
      await axios.delete(`${REACT_APP_API_KEY}/api/v1/mmu/patient/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "ngrok-skip-browser-warning": "hgs",
        },
      });
      toast.success("Patient Deleted Successfully !");
      setTimeout(() => {
        getPatientList();
      }, 500);
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
      setIsUserDeleting(false);
    }
  };

  return { onDelete, isPatientDeleting };
};

export default useDeletePatient;
