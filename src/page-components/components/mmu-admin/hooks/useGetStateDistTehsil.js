import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { MONDAL_NAME } from "../../../constants/Constant";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const { REACT_APP_API_KEY } = process.env || {};

const useGetStateDistTehsil = () => {
  const navigate = useNavigate();
  const [district, setDistrict] = useState([]);
  const [state, setState] = useState([]);
  const [tehsil, setTehsil] = useState([]);
  const [mondal, setMondal] = useState(MONDAL_NAME);

  const getVisitDistTehsilState = useCallback(async () => {
    const stateAPI = `${REACT_APP_API_KEY}/api/v1/mmu/visit/states`;
    const districtAPI = `${REACT_APP_API_KEY}/api/v1/mmu/visit/districts`;
    const tehsilAPI = `${REACT_APP_API_KEY}/api/v1/mmu/visit/tehsils`;

    try {
      const token = localStorage.getItem("authToken");
      const [response1, response2, response3] = await Promise.all([
        axios.get(stateAPI, {
          headers: {
            Authorization: `Bearer ${token}`,
            "ngrok-skip-browser-warning": "hgs",
          },
        }),
        axios.get(districtAPI, {
          headers: {
            Authorization: `Bearer ${token}`,
            "ngrok-skip-browser-warning": "hgs",
          },
        }),
        axios.get(tehsilAPI, {
          headers: {
            Authorization: `Bearer ${token}`,
            "ngrok-skip-browser-warning": "hgs",
          },
        }),
      ]);
      setState(response1.data);
      setDistrict(response2.data);
      setTehsil(response3.data);
      setMondal(MONDAL_NAME);
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
  }, [navigate]);

  useEffect(() => {
    getVisitDistTehsilState();
  }, [getVisitDistTehsilState]);

  return {
    state,
    mondal,
    district,
    tehsil,
  };
};

export default useGetStateDistTehsil;
