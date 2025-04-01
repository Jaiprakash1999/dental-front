import axios from "axios";
import { useCallback, useContext, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPatientVisitList } from "../../../../../../redux-store/slice/patientVisitList";
import { filterListContext } from "../HIPdashboard";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const { REACT_APP_API_KEY } = process.env || {};

const useGetAllVisit = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentDate = useSelector((state) => state.patientVisitDate);
  const [isPatientVisitLoading, setIsPatientVisitLoading] = useState(true);
  const filterState = useContext(filterListContext);
  const {
    selectedFilters,
    currentPage = 1,
    searchInput = "",
  } = filterState || {};

  const { visitStatus = [], tags = [], gender = [] } = selectedFilters || {};

  const params = useMemo(() => {
    const searchParams = new URLSearchParams();
    const appendArrayToParams = (key, array) => {
      array.forEach((item) => {
        searchParams.append(key, item.value);
      });
    };
    searchParams.append("visitDate", currentDate);
    searchParams.append("query", searchInput);
    appendArrayToParams("visitStatus", visitStatus);
    appendArrayToParams("tags", tags);
    appendArrayToParams("gender", gender);

    // Check if any filter is applied
    const isAnyFilterApplied =
      visitStatus.length || tags.length || gender.length;

    // Append page only if no filter is applied
    if (!isAnyFilterApplied) {
      searchParams.append("page", currentPage - 1);
    }

    return searchParams;
  }, [currentDate, visitStatus, searchInput, tags, gender, currentPage]);

  const getAllPatientVisit = useCallback(async () => {
    try {
      const token = localStorage.getItem("authToken");
      const res = await axios.get(
        `${REACT_APP_API_KEY}/api/v1/mmu/visit/search`,
        {
          params: params,
          headers: {
            Authorization: `Bearer ${token}`,
            "ngrok-skip-browser-warning": "hgs",
          },
        }
      );
      dispatch(setPatientVisitList(res.data));
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
      dispatch(setPatientVisitList([]));
    }
    setIsPatientVisitLoading(false);
  }, [dispatch, params, navigate]);

  return {
    isPatientVisitLoading,
    getAllPatientVisit,
    params,
  };
};

export default useGetAllVisit;
