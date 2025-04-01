import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";

const useGetABHAcard = ({ id }) => {
  const [abhaCardImage, setAbhaCardImage] = useState(null);
  const [isAbhaCardDataLoading, setIsAbhaCardDataLoading] = useState(false);

  const getAbhaCard = async () => {
    setIsAbhaCardDataLoading(true);

    try {
      const token = localStorage.getItem("authToken");
      const res = await axios.get(
        `/v2/danzo/abhaValidation/profile/account/abhaCard/${id}`,
        {
          headers: {
            Authorization: token,
            "ngrok-skip-browser-warning": "hgs",
          },
          responseType: "blob",
        }
      );
      const imageURL = URL.createObjectURL(res.data);
      setAbhaCardImage(imageURL);

      // Create a URL for the blob
      const blobUrl = window.URL.createObjectURL(new Blob([res.data]));

      // Create a temporary <a> tag to trigger the download
      const link = document.createElement("a");
      link.href = blobUrl;
      link.setAttribute("download", "abha_card.jpg"); // Set download attribute with filename
      document.body.appendChild(link);
      link.click(); // Programmatically click the link to trigger the download
      // Clean up
      link.remove();
      setIsAbhaCardDataLoading(false);
    } catch (error) {
      console.error(error, "error");
      setIsAbhaCardDataLoading(false);
    }
  };

  return {
    abhaCardImage,
    isAbhaCardDataLoading,
    getAbhaCard,
  };
};

export default useGetABHAcard;
