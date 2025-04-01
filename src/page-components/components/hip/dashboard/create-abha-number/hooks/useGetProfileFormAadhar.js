import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";

const useGetProfileFormAadhar = ({ id, activeState }) => {
  const [patientProfile, setPatientProfile] = useState({});
  const [isProfileLoading, setIsProfileLoading] = useState(false);

  const getPatientProfile = useCallback(async () => {
    setIsProfileLoading(true);
    try {
      const token = localStorage.getItem("authToken");
      const res = await axios.get(
        `/v2/danzo/abhaValidation/profile/account/${id}`,
        {
          headers: {
            Authorization: token,
            "ngrok-skip-browser-warning": "hgs",
          },
        }
      );
      setPatientProfile(res.data);
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error, "error");
    }
    setIsProfileLoading(false);
  }, [id]);

  useEffect(() => {
    if (id !== undefined && activeState === "abha_card") {
      getPatientProfile();
    }
  }, [id, getPatientProfile, activeState]);

  return { patientProfile, isProfileLoading };
};

export default useGetProfileFormAadhar;
