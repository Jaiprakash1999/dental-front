import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import { setDashboardDrawer } from "../../../../../../../redux-store/slice/checkInDrawerSlice";

const useAddPatientViaAbhaInHIP = ({
  id,
  setPatient = () => {},
  abhaAddress = "",
}) => {
  const dispatch = useDispatch();
  const [isAddPatientViaABHAinHIPLoading, setIsAddPtientViaABHAinHIPLoading] =
    useState(false);

  const onAddPatientinHIPviaABHA = useCallback(async () => {
    let api = "/v2/danzo/abhaValidation/profile/account/registerPatient";
    if (abhaAddress.length === 0) {
      api = "/v2/danzo/abhaValidation/profile/account/registerPatient";
    } else {
      api = "/v2/danzo/m1/abhaVerification/registerPatient";
    }
    setIsAddPtientViaABHAinHIPLoading(true);
    try {
      const token = localStorage.getItem("authToken");
      const res = await axios.post(`${api}/${id}`, undefined, {
        headers: {
          Authorization: token,
          "ngrok-skip-browser-warning": "hgs",
        },
      });
      setPatient(res.data);
      toast.success(`${res.data.name} is successfully registered`);
      setTimeout(() => {
        dispatch(
          setDashboardDrawer({
            userDrawer: false,
            checkInDrawer: true,
            skipABHA: false,
            createABHAbyAadhaar: false,
            createABHAaddress: false,
          })
        );
      }, 1000);
      console.log(res, "res of add patient");
    } catch (error) {
      toast.error("Opps somthing went wrong !");
      console.error(error, "error");
    }
    setIsAddPtientViaABHAinHIPLoading(false);
  }, [id, setPatient, dispatch, abhaAddress.length]);

  return { isAddPatientViaABHAinHIPLoading, onAddPatientinHIPviaABHA };
};

export default useAddPatientViaAbhaInHIP;
