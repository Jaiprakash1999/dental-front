import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";

const useGetMcpRecord = () => {
  const patientData = useSelector((state) => state.patientDetails);
  const { patientId } = patientData || {};

  const [mcpRecordData, setMcpRecordData] = useState([]);
  const [isMcpLoading, setIsMcpLoading] = useState(false);

  const getMcpRecord = useCallback(async () => {
    setIsMcpLoading(true);
    try {
      const token = localStorage.getItem("authToken");
      const res = await axios.get(
        `${process.env.REACT_APP_API_KEY}/api/v1/mmu/records/mch-card/${patientId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "ngrok-skip-browser-warning": "hgs",
          },
        }
      );
      setMcpRecordData(res.data);
    } catch (error) {
      console.log(error, "error");
    } finally {
        setIsMcpLoading(false);
    }
  }, [patientId]);

  useEffect(() => {
    if (patientId !== undefined) {
        getMcpRecord();
    }
  }, [patientId, getMcpRecord]);

  return {
    mcpRecordData,
    isMcpLoading,
    getMcpRecord,
  };
};

export default useGetMcpRecord;
