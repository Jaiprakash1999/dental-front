import { useState } from "react";

const GPSReader = () => {
  const [coordinates, setCoordinates] = useState({ lat: null, lon: null });

  const fetchLocation = async () => {
    try {
      // Request a port but only allow USB devices (exclude Bluetooth devices)
      const ports = await navigator.serial.getPorts();

      if (ports.length === 0) {
        console.log("No serial devices found. Plug in your GPS dongle.");
        return;
      }

      // Filter ports by USB vendor ID (Modify based on your GPS dongle)
      const gpsPort = ports.find((port) => port.getInfo().usbVendorId);

      if (!gpsPort) {
        console.log("No USB GPS device found. Ensure it's connected.");
        return;
      }

      // Open the GPS serial port
      await gpsPort.open({ baudRate: 9600 });

      const reader = gpsPort.readable.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        const data = decoder.decode(value);
        console.log("GPS Data:", data); // Parse this data for latitude/longitude
      }
    } catch (err) {
      console.error("Error accessing GPS dongle:", err);
    }
  };

  const connectGPS = async () => {
    try {
      const port = await navigator.serial.requestPort(); // Prompt user to select a serial device
      await port.open({ baudRate: 9600 }); // Adjust baud rate based on GPS device

      const reader = port.readable.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        const data = decoder.decode(value);
        console.log("Raw GPS Data:", data);

        const parsedCoords = parseNMEAData(data);
        if (parsedCoords) setCoordinates(parsedCoords);
      }
      console.log("errowdafa");

      reader.releaseLock();
    } catch (err) {
      console.error("Error connecting to GPS:", err);
    }
  };

  const parseNMEAData = (data) => {
    const match = data.match(/\$GPGGA,[^,]*,(\d+\.\d+),N,(\d+\.\d+),E/);
    if (match) {
      return {
        lat: convertToDecimal(match[1]),
        lon: convertToDecimal(match[2]),
      };
    }
    return null;
  };

  const convertToDecimal = (nmeaCoord) => {
    const degrees = parseInt(nmeaCoord.slice(0, 2), 10);
    const minutes = parseFloat(nmeaCoord.slice(2));
    return degrees + minutes / 60;
  };

  return (
    <div>
      <button onClick={fetchLocation}>Connect GPS</button>
      <p>Latitude: {coordinates.lat}</p>
      <p>Longitude: {coordinates.lon}</p>
    </div>
  );
};

export default GPSReader;
