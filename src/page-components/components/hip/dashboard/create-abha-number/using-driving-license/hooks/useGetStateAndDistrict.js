import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";

const useGetStateAndDistrict = ({ statecode }) => {
  const [allStates, setAllStates] = useState([]);
  const [allDistricts, setAllDistricts] = useState([]);
  const [isStatesLoading, setIsStatesLoading] = useState(false);
  const [isDistrictLoading, setIsDistrictLoading] = useState(false);

  const getAllStates = useCallback(async () => {
    setIsStatesLoading(true);
    try {
      const res = await axios.get("https://dev.abdm.gov.in/cm/states");
      setAllStates(res.data);
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
    setIsStatesLoading(false);
  }, []);

  const getAllDistricts = useCallback(async () => {
    setIsDistrictLoading(true);
    try {
      const res = await axios.get(
        `https://dev.abdm.gov.in/cm/${statecode}/districts`
      );
      setAllDistricts(res.data);
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
    setIsDistrictLoading(false);
  }, [statecode]);

  useEffect(() => {
    getAllStates();
  }, [getAllStates]);

  useEffect(() => {
    if (statecode !== undefined) {
      getAllDistricts();
    }
  }, [statecode, getAllDistricts]);

  return { allDistricts, allStates, isDistrictLoading, isStatesLoading };
};

export default useGetStateAndDistrict;
