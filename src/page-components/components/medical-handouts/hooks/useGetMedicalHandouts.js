import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const { REACT_APP_API_KEY } = process.env || {};

const useGetMedicalHandouts = ({ searchValue }) => {
  const navigate = useNavigate();
  const [allHandouts, setAllHandouts] = useState([]);
  const [isHandoutsLoading, setIsHandoutsLoading] = useState(false);
  const [isTagLoading, setIsTagLoading] = useState(false);
  const [allMedicalTags, setAllMedicalTags] = useState([]);
  const [isHandoutsByTag, setIsHandoutsByTag] = useState(false);

  const getMedicalTags = useCallback(async () => {
    setIsTagLoading(true);
    try {
      const token = localStorage.getItem("authToken");
      const res = await axios.get(
        `${REACT_APP_API_KEY}/api/v1/mmu/cortex/searchTags`,
        {
          params: { query: searchValue },
          headers: {
            Authorization: `Bearer ${token}`,
            "ngrok-skip-browser-warning": "hgs",
          },
        }
      );
      setAllMedicalTags(res.data);
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
      setIsTagLoading(false);
    }
  }, [searchValue, navigate]);

  const getHandoutsById = useCallback(
    async (id) => {
      try {
        const token = localStorage.getItem("authToken");
        const res = await axios.get(
          `${REACT_APP_API_KEY}/api/v1/mmu/cortex/handout`,
          {
            params: { id: id },
            headers: {
              Authorization: `Bearer ${token}`,
              "ngrok-skip-browser-warning": "hgs",
            },
            responseType: "blob",
          }
        );

        const pdfUrl = URL.createObjectURL(res.data);
        window.open(pdfUrl, "_blank");
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
    },
    [navigate]
  );

  const getAllMedicalHandoubtsByTag = useCallback(
    async (tag, language) => {
      setIsHandoutsByTag(true);
      try {
        const token = localStorage.getItem("authToken");
        const res = await axios.get(
          `${REACT_APP_API_KEY}/api/v1/mmu/cortex/getHandoutsByTag`,
          {
            params: { tag: tag },
            headers: {
              Authorization: `Bearer ${token}`,
              "ngrok-skip-browser-warning": "hgs",
            },
          }
        );
        const allMedicalHandouts = res.data;
        const selectedLanguageHandouts = allMedicalHandouts.find(
          (item) => item.language === language
        );
        const id = selectedLanguageHandouts?.id;
        if (id !== undefined) {
          await getHandoutsById(id);
        } else {
          toast.error("Handout is not available in selected Language !", {
            className: "w-max",
          });
        }
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
        setIsHandoutsByTag(false);
      }
    },
    [getHandoutsById, navigate]
  );

  const getAllHandouts = async () => {
    setIsHandoutsLoading(true);
    const token = localStorage.getItem("authToken");
    try {
      const res = await axios.get(
        `${REACT_APP_API_KEY}/api/v1/mmu/cortex/allHandouts`,
        {
          // params: { query: inputValue },
          headers: {
            Authorization: `Bearer ${token}`,
            "ngrok-skip-browser-warning": "hgs",
          },
        }
      );
      setAllHandouts(res.data);
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
      setIsHandoutsLoading(false);
    }
  };

  useEffect(() => {
    getMedicalTags();
  }, [getMedicalTags, searchValue]);

  useEffect(() => {
    getAllHandouts();
    // eslint-disable-next-line
  }, []);

  return {
    allHandouts,
    isHandoutsLoading,
    allMedicalTags,
    isTagLoading,
    getAllMedicalHandoubtsByTag,
    isHandoutsByTag,
  };
};

export default useGetMedicalHandouts;
