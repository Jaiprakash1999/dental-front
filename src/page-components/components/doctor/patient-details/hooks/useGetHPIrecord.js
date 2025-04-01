import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
// import { toast } from "react-toastify";

const useGetHPIrecord = () => {
  const patientData = useSelector((state) => state.patientDetails);
  const { abhaId } = patientData || {};
  const [isHPIloading, setIsHPIloading] = useState(false);
  const [hpiData, setHpiData] = useState([]);

  const getHPIquestionari = useCallback(async () => {
    setIsHPIloading(true);
    const token = localStorage.getItem("authToken");
    try {
      const res = await axios.get(`/api/healthCheck/getRecords`, {
        params: { abhaAddress: abhaId },
        headers: { Authorization: `Bearer ${token}` },
      });
      setHpiData(res.data);
    } catch (error) {
      // toast.error(error?.response?.data?.message);
      setHpiData([]);
    }
    setIsHPIloading(false);
  }, [abhaId]);

  useEffect(() => {
    if (abhaId !== null && abhaId !== undefined) {
      getHPIquestionari();
    }
  }, [abhaId, getHPIquestionari]);

  return {
    isHPIloading,
    hpiData,
  };
};

export default useGetHPIrecord;
