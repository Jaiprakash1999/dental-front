import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const { REACT_APP_API_KEY } = process.env;

const useGetAllPatient = ({
  inputValue = "",
  currentPage = 1,
  filterName = {},
}) => {
  const navigate = useNavigate();
  const [patientList, setPatientList] = useState({});
  const [isPatientListLoading, setIsPatientListLoading] = useState(false);

  const {
    patientTag,
    gender,
    minAge,
    maxAge,
    registrationStartDate,
    registrationEndDate,
    lastVisitStartDate,
    lastVisitEndDate,
    lastChiefComplaint,
  } = filterName || {};

  const params = useMemo(() => {
    const searchParams = new URLSearchParams();

    const appendArrayToParams = (key, array) => {
      if (Array.isArray(array) && array.length) {
        array.forEach((item) => searchParams.append(key, item));
      }
    };

    const appendParam = (key, value) => {
      if (value !== undefined && value !== null && value !== "") {
        searchParams.append(key, value);
      }
    };

    appendArrayToParams("patientTag", patientTag);
    appendArrayToParams("gender", gender);
    appendParam("minAge", minAge);
    appendParam("maxAge", maxAge);
    appendParam("registrationStartDate", registrationStartDate);
    appendParam("registrationEndDate", registrationEndDate);
    appendParam("lastVisitStartDate", lastVisitStartDate);
    appendParam("lastVisitEndDate", lastVisitEndDate);
    appendParam("lastChiefComplaint", lastChiefComplaint);
    appendParam("query", inputValue);
    appendParam("page", currentPage - 1);

    return searchParams;
  }, [
    patientTag,
    gender,
    minAge,
    maxAge,
    registrationStartDate,
    registrationEndDate,
    lastVisitStartDate,
    lastVisitEndDate,
    lastChiefComplaint,
    inputValue,
    currentPage,
  ]);

  const getPatientList = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const res = await axios.get(
        `${REACT_APP_API_KEY}/api/v1/mmu/patient/search`,
        {
          params: params,
          headers: {
            Authorization: `Bearer ${token}`,
            "ngrok-skip-browser-warning": "hgs",
          },
        }
      );
      setPatientList(res.data);
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
    setIsPatientListLoading(false);
  };

  const onShowMore = async (id) => {
    try {
      const token = localStorage.getItem("authToken");
      const res = await axios.get(
        `${REACT_APP_API_KEY}/api/v1/mmu/patient/details/${id}`,
        {
          params: {},
          headers: {
            Authorization: `Bearer ${token}`,
            "ngrok-skip-browser-warning": "hgs",
          },
        }
      );
      const data = res.data;

      setPatientList((prev) => {
        const patients = prev.patients.map((item) => {
          return item.id === id ? { ...item, ...data } : item;
        });
        return { total: prev.total, patients: patients };
      });
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
  };

  useEffect(() => {
    getPatientList();
    // eslint-disable-next-line
  }, [inputValue, currentPage]);

  return {
    patientList,
    getPatientList,
    isPatientListLoading,
    onShowMore,
  };
};

export default useGetAllPatient;
