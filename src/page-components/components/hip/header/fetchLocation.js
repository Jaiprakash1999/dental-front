import axios from "axios";

const fetchAddressFromCoordinates = async (latitude, longitude) => {
  try {
    const resp = await axios.get(
      `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
    );

    return resp.data;
  } catch (error) {
    console.log("Failed to fetch address:", error);
  }
};
export const fetchLocation = (getLocation) => {
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        const res = await fetchAddressFromCoordinates(latitude, longitude);
        getLocation(res);
      },
      (err) => {
        console.log(`Error fetching location: ${err.message}`);
      },
      {
        enableHighAccuracy: true, // Use high-accuracy mode (if available)
        timeout: 10000, // Timeout after 10 seconds
        maximumAge: 0, // Do not use cached position
      }
    );
  } else {
    console.log("Geolocation is not supported by your browser.");
  }
};
