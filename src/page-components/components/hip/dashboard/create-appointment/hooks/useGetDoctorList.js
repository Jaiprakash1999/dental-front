import axios from "axios";
import  { useCallback, useState } from "react";
import { toast } from "react-toastify";
const { REACT_APP_API_KEY } = process.env;

const useGetDoctorList = () => {
  const [doctorList, setDoctorList] = useState([]);
  const [isDoctorListLoading, setIsLoading] = useState(false);

  const getDoctorList = useCallback(async () => {
    const token = localStorage.getItem("authToken");
    setIsLoading(true);
    try {
      const res = await axios.get(`${REACT_APP_API_KEY}/api/v1/mmu/doctor`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "ngrok-skip-browser-warning": "hgs",
        },
      });
      const formattedData = res.data.map((item) => ({
        label: item?.doctorName,
        value: item?.doctorName,
        id: item?.doctorId,
      }));
      setDoctorList(formattedData);
    } catch (error) {
      console.error("Error fetching doctor list:", error);
      toast.error("Error fetching doctor list");
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { getDoctorList, doctorList, isDoctorListLoading };
};

export default useGetDoctorList;
