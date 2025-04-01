import axios from "axios";
import moment from "moment";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const { REACT_APP_API_KEY } = process.env || {};

const calculateDobFromAge = (age) => {
  const currentYear = new Date().getFullYear();
  const birthYear = currentYear - age;
  return new Date(birthYear, 0, 1); // Assume DOB is January 1st for simplicity
};

const useUpdatePatientDetail = ({
  getPatientList = () => {},
  editAbleForm,
  setIsEditable,
}) => {
  const navigate = useNavigate();
  const [isUpdating, setIsUserDeleting] = useState(false);

  const onUpdate = async () => {
    const token = localStorage.getItem("authToken");
    setIsUserDeleting(true);
    try {
      const { address, gender, bloodGroup, patientTag, id, age, habitatId } =
        editAbleForm;
      const newAge = calculateDobFromAge(age);
      const foramatedAge = moment(newAge).format("yyyy-MM-DD");
      const [year, month, date] = foramatedAge.split("-");
      const dataToSend = {
        id,
        address: address === "" ? null : address,
        gender,
        bloodGroup,
        patientTag: patientTag === "ANC/PNC" ? "Pregnancy" : patientTag,
        habitat: habitatId === undefined ? undefined : +habitatId,
        yearOfBirth: +year,
        monthOfBirth: +month,
        dateOfBirth: +date,
        warning: false,
      };
      await axios.patch(`${REACT_APP_API_KEY}/api/v1/mmu/patient`, dataToSend, {
        headers: {
          Authorization: `Bearer ${token}`,
          "ngrok-skip-browser-warning": "hgs",
        },
      });
      toast.success("Patient Details Updated Successfully !");
      setTimeout(() => {
        getPatientList();
        setIsEditable(false);
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

  return { onUpdate, isUpdating };
};

export default useUpdatePatientDetail;
