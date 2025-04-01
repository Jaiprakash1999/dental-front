import axios from "axios";
import { useCallback, useState } from "react";
import { toast } from "react-toastify";

const useGetAdrs = () => {
  const [adrs, setAdrs] = useState([]);
  const [isAdrsLoading, setIsAdrsLoading] = useState(true);

  const getAdrs = useCallback(async (medication = "", index) => {
    const token = localStorage.getItem("authToken");
    const medicationLower = medication.toLowerCase();
    try {
      const res = await axios.get(
        `https://v2.dev-api.parchaa.com/v2/cortex/adr`,
        {
          params: { medication: medicationLower },
          headers: {
            Authorization: token,
            Accept: "*/*",
          },
        }
      );
      setAdrs((prev) => ({ ...prev, [index]: res.data }));
    } catch (error) {
      console.error(error, "error");
      toast.error("Oops, something went wrong", {
        position: "top-center",
      });
    } finally {
      setIsAdrsLoading(false);
    }
  }, []);

  return {
    adrs,
    isAdrsLoading,
    getAdrs,
  };
};

export default useGetAdrs;
