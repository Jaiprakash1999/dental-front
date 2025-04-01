import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const useInitiateAnsCard = () => {
  const [isInitiatingAns, setIsInitiatingAns] = useState(false);
  const patientData = useSelector((state) => state?.patientDetails || {});

  const ansCardInitiate = async (ansRecord) => {
    console.log(ansRecord)
    setIsInitiatingAns(true); // Show loading state before API call

    try {
        console.log("in try block")
      const token = localStorage.getItem("authToken");
    //   if (!token) {
    //     throw new Error("Authentication token is missing");
    //   }

      await axios.post(
        `${process.env.REACT_APP_API_KEY}/api/v1/mmu/records/ans-card/initiate`,
        { ...ansRecord },
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
      setIsInitiatingAns(false); // Ensure state is reset after API call
    }
  };

  return { ansCardInitiate, patientData, isInitiatingAns };
};

export default useInitiateAnsCard;
