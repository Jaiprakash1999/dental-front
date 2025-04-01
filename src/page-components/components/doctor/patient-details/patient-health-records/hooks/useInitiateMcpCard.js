import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const useInitiateMcpCard = () => {
  const [isInitiatingMcp, setIsInitiatingMcp] = useState(false);
  const patientData = useSelector((state) => state?.patientDetails || {});

  const mcpCardInitiate = async (mcpRecord) => {
    console.log(mcpRecord)
    setIsInitiatingMcp(true); // Show loading state before API call

    try {
        console.log("in try block")
      const token = localStorage.getItem("authToken");
    //   if (!token) {
    //     throw new Error("Authentication token is missing");
    //   }

      await axios.post(
        `${process.env.REACT_APP_API_KEY}api/v1/mmu/records/mch-card/initiate`,
        { ...mcpRecord },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "ngrok-skip-browser-warning": "hgs",
          },
        }
      );
      
      toast.success("MCP Card Initiated Successfully!");
    } catch (error) {

      toast.error(error?.response?.data?.message || "Failed to initiate MCP Card");
    } finally {
      setIsInitiatingMcp(false); // Ensure state is reset after API call
    }
  };

  return { mcpCardInitiate, patientData, isInitiatingMcp };
};

export default useInitiateMcpCard;
