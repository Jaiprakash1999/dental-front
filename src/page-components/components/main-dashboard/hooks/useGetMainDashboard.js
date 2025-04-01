import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const { REACT_APP_API_KEY } = process.env || {};

const useGetMainDashboard = ({ selectedFilter = {} }) => {
  const navigate = useNavigate();
  const [mainDashboardKPI, setMainDashboardKPI] = useState([]);
  const [isMainKPIloading, setIsMainKPIloading] = useState(false);

  const getMainDashboardKPI = async () => {
    const token = localStorage.getItem("authToken");
    setIsMainKPIloading(true);
    try {
      const res = await axios.get(
        `${REACT_APP_API_KEY}/api/v1/mmu/analytics/main-dashboard`,
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
            tags: selectedFilter.tags === "" ? undefined : selectedFilter.tags,
            mmuUnit:
              selectedFilter.mmuUnitName === ""
                ? undefined
                : selectedFilter.mmuUnitName,
          },
          headers: {
            Authorization: `Bearer ${token}`,
            "ngrok-skip-browser-warning": "hgs",
          },
        }
      );
      setMainDashboardKPI(res.data);
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
      setIsMainKPIloading(false);
    }
  };

  useEffect(() => {
    getMainDashboardKPI();
    // eslint-disable-next-line
  }, []);

  return {
    isMainKPIloading,
    mainDashboardKPI,
    getMainDashboardKPI,
  };
};

export default useGetMainDashboard;
