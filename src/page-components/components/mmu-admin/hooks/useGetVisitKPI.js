import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const { REACT_APP_API_KEY } = process.env || {};

const useGetVisitKPI = ({ selectedFilter = {} }) => {
  const navigate = useNavigate();
  const [visitKPIdata, setVisitKPIdata] = useState({});
  const [isVisitKPIloading, setIsVisitKPIloading] = useState(false);

  const getVisitKPI = async () => {
    const token = localStorage.getItem("authToken");
    setIsVisitKPIloading(true);
    try {
      const res = await axios.get(
        `${REACT_APP_API_KEY}/api/v1/mmu/analytics/geo-analytics/kpis`,
        {
          params: {
            state:
              selectedFilter.state === "" ? undefined : selectedFilter.state,
            district:
              selectedFilter.district === ""
                ? undefined
                : selectedFilter.district,
            tehsil:
              selectedFilter.tehshil === ""
                ? undefined
                : selectedFilter.tehshil,
            startDate:
              selectedFilter.startDate === ""
                ? undefined
                : selectedFilter.startDate,
            endDate:
              selectedFilter.endDate === ""
                ? undefined
                : selectedFilter.endDate,
            mandal:
              selectedFilter.mandalName === ""
                ? undefined
                : selectedFilter.mandalName,
            gramPanchyat:
              selectedFilter.gramPanchayatName === ""
                ? undefined
                : selectedFilter.gramPanchayatName,
            habitat:
              selectedFilter.habitatName === ""
                ? undefined
                : selectedFilter.habitatName,
          },
          headers: {
            Authorization: `Bearer ${token}`,
            "ngrok-skip-browser-warning": "hgs",
          },
        }
      );
      setVisitKPIdata(res.data);
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
      setIsVisitKPIloading(false);
    }
  };

  useEffect(() => {
    getVisitKPI();
    // eslint-disable-next-line
  }, []);

  return {
    isVisitKPIloading,
    visitKPIdata,
    getVisitKPI,
  };
};

export default useGetVisitKPI;
