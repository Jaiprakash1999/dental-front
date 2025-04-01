import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";

const useCreateABHAaddressByAadhaar = ({
  id,
  activeState,
  setActiveState = () => {},
  inputABHAaddress,
}) => {
  const [suggestedABHA, setSuggestedABHA] = useState({});
  const [isSuggestionABHALoading, setIsSuggestionABHALoading] = useState(false);
  const [isCreatingABHAaddress, setIsCeateABHAaddress] = useState(false);

  const getSuggestedABHAaddress = useCallback(async () => {
    setIsSuggestionABHALoading(true);
    try {
      const token = localStorage.getItem("authToken");
      const res = await axios.get(
        "/v2/danzo/abhaCreation/byAadhaar/suggestion",
        { params: { id: id }, headers: { Authorization: token } }
      );
      setSuggestedABHA(res.data);
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
    setIsSuggestionABHALoading(false);
  }, [id]);

  const onCreateCustomABHAaddress = useCallback(async () => {
    setIsCeateABHAaddress(true);
    try {
      const token = localStorage.getItem("authToken");
      const res = await axios.post(
        "/v2/danzo/abhaCreation/byAadhaar/create/custom",
        {
          id: id,
          abhaAddress: inputABHAaddress.selectedABHAaddress,
          preffered: inputABHAaddress.preferredAbhaAddress,
        },
        { headers: { Authorization: token } }
      );
      setActiveState("abha_card");
      console.log(res.data, "res of custom abha address");
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
    setIsCeateABHAaddress(false);
  }, [id, setActiveState, inputABHAaddress]);

  useEffect(() => {
    if (activeState === "create_abha_address" && id !== undefined) {
      getSuggestedABHAaddress();
    }
  }, [getSuggestedABHAaddress, id, activeState]);

  return {
    suggestedABHA,
    isSuggestionABHALoading,
    onCreateCustomABHAaddress,
    isCreatingABHAaddress,
  };
};

export default useCreateABHAaddressByAadhaar;
