import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { setDashboardDrawer } from "../../../../../../../redux-store/slice/checkInDrawerSlice";
import { useNavigate } from "react-router-dom";
const { REACT_APP_API_KEY } = process.env;

const useAddPatientWithoutAbha = ({
  patientInfo,
  setPatientInfo = () => {},
  setPatient = () => {},
  setExistingPatientModal = () => {},
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const mmuUnitName = useSelector((state) => state.mmuUnitName);
  const [isAddPatientLoading, setIsAddPatientLoading] = useState(false);
  const [existingPatientList, setExistingPatientList] = useState({});

  const onAddNew = async (e, value = false) => {
    e.preventDefault();
    setIsAddPatientLoading(true);
    try {
      const token = localStorage.getItem("authToken");
      const res = await axios.post(
        `${REACT_APP_API_KEY}/api/v1/mmu/patient`,
        {
          name: patientInfo?.name,
          fatherName: patientInfo?.fatherName,
          bloodGroup:
            patientInfo?.bloodGroup === `Don't Know` ||
            patientInfo?.bloodGroup === ""
              ? null
              : patientInfo?.bloodGroup,
          photo: patientInfo?.photo,
          phoneNumber:
            patientInfo?.phoneNumber === "" ? null : patientInfo?.phoneNumber,
          dateOfBirth: +patientInfo?.dateOfBirth,
          monthOfBirth: +patientInfo?.monthOfBirth,
          yearOfBirth: +patientInfo?.yearOfBirth,
          gender: patientInfo?.gender,
          address: patientInfo?.address === "" ? null : patientInfo?.address,
          mmuUnit: mmuUnitName,
          district: patientInfo?.district,
          state: patientInfo?.state,
          pincode: patientInfo?.pincode,
          tehsil: patientInfo?.tehsil,
          city: patientInfo?.city,
          patientTag:
            patientInfo?.patientTag === "ANC/PNC"
              ? "Pregnancy"
              : patientInfo?.patientTag,
          warning: value,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "ngrok-skip-browser-warning": "hgs",
          },
        }
      );
      if (res.status === 200) {
        setExistingPatientList(res.data);
        setExistingPatientModal(true);
      } else {
        setPatient(res.data?.savedPatient);
        toast.success("Patient added successfully !", {
          position: "top-center",
        });
        setTimeout(() => {
          setPatientInfo({
            name: "",
            phoneNumber: "",
            age: "",
            dob: "",
            pincode: "",
            gender: "",
          });
        }, 1000);
        setTimeout(() => {
          dispatch(
            setDashboardDrawer({
              skipABHA: false,
              checkInDrawer: true,
              userDrawer: false,
            })
          );
        }, 1000);
      }
    } catch (error) {
      console.error(error, "error");
      const errorMessage = error.response?.data?.message;
      if (!error.response) {
        toast.error("Oops, something went wrong");
      } else {
        const messageContent = Array.isArray(errorMessage) ? (
          <ul className="ms-2 list-disc">
            {errorMessage.map((msg, index) => (
              <li key={index}>{msg}</li>
            ))}
          </ul>
        ) : (
          errorMessage || "An unknown error occurred"
        );
        toast.error(messageContent);
        if (error.response?.data?.statusCode === 401) {
          localStorage.removeItem("authToken");
          setTimeout(() => {
            navigate("/");
          }, 1000);
        }
      }
    }
    setIsAddPatientLoading(false);
  };

  return {
    onAddNew,
    isAddPatientLoading,
    existingPatientList,
  };
};

export default useAddPatientWithoutAbha;
