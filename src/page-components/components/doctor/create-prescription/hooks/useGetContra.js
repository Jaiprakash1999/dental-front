import axios from "axios";
import { useCallback, useState } from "react";
import { toast } from "react-toastify";

const useGetContra = () => {
  const [contra, setContra] = useState([]);
  const [isContraLoading, setIsContraLoading] = useState(true);

  const getContra = useCallback(async (medication = "", index) => {
    const token = localStorage.getItem("authToken");
    const medicationLower = medication.toLowerCase();
    try {
      const res = await axios.get(
        `https://v2.dev-api.parchaa.com/v2/cortex/contraindication`,
        {
          params: { medication: medicationLower },
          headers: {
            Authorization: token,
            Accept: "*/*",
          },
        }
      );
      setContra((prev) => ({ ...prev, [index]: res.data }));
    } catch (error) {
      console.error(error, "error");
      toast.error("Oops, something went wrong", {
        position: "top-center",
      });
    } finally {
      setIsContraLoading(false);
    }
  }, []);

  return {
    contra,
    isContraLoading,
    getContra,
  };
};

export default useGetContra;
