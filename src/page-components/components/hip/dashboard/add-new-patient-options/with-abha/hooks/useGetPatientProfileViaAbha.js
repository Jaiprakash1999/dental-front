import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";

const useGetPatientProfileViaAbha = ({
  id,
  activeRegisterState,
  abhaAddress = "",
}) => {
  const [patientProfile, setPatientProfile] = useState({});
  const [isProfileLoading, setIsProfileLoading] = useState(false);

  const getPatientProfile = useCallback(async () => {
    let api = "/v2/danzo/abhaValidation/profile/account";
    if (abhaAddress.length === 0) {
      api = "/v2/danzo/abhaValidation/profile/account";
    } else {
      api = "/v2/danzo/m1/abhaVerification/getProfile";
    }
    setIsProfileLoading(true);
    try {
      const token = localStorage.getItem("authToken");
      const res = await axios.get(`${api}/${id}`, {
        headers: {
          Authorization: token,
          "ngrok-skip-browser-warning": "hgs",
        },
      });
      setPatientProfile(res.data);
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error, "error");
    }
    setIsProfileLoading(false);
  }, [id, abhaAddress.length]);

  useEffect(() => {
    if (id !== undefined && activeRegisterState === "abha_card") {
      getPatientProfile();
    }
  }, [id, getPatientProfile, activeRegisterState]);

  return { patientProfile, isProfileLoading };
};

export default useGetPatientProfileViaAbha;
