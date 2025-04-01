import React from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css"; // Import Leaflet CSS
// Import the marker icon images
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import ListLoader from "../../common-components/ListLoader";
import { useTranslation } from "react-i18next";

// Fix for marker icons not displaying
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const AddressMapView = ({ visitKPIdata = [], isVisitKPIloading }) => {
  // const position = [
  //   {
  //     latitude: 28.5645,
  //     longitude: 77.191,
  //   },
  //   {
  //     latitude: 28.5611,
  //     longitude: 77.195,
  //   },
  //   {
  //     latitude: 28.5592,
  //     longitude: 77.198,
  //   },
  //   {
  //     latitude: 28.5633,
  //     longitude: 77.201,
  //   },
  //   {
  //     latitude: 28.565,
  //     longitude: 77.193,
  //   },
  //   {
  //     latitude: 28.562,
  //     longitude: 77.197,
  //   },
  //   {
  //     latitude: 28.5605,
  //     longitude: 77.199,
  //   },
  //   {
  //     latitude: 28.564,
  //     longitude: 77.19,
  //   },
  //   {
  //     latitude: 28.566,
  //     longitude: 77.192,
  //   },
  //   {
  //     latitude: 28.5615,
  //     longitude: 77.194,
  //   },
  // ];
  const { t } = useTranslation();
  const data = visitKPIdata?.[0] || {};
  const { latitude = 0, longitude = 0 } = data || {};

  return (
    <div
      className="bg-white z-0"
      style={{ boxShadow: "0px 0px 5px rgba(0,0,0,0.2)" }}
    >
      {isVisitKPIloading ? (
        <ListLoader />
      ) : (
        <MapContainer
          center={[latitude, longitude]}
          zoom={13}
          style={{ height: "100%", width: "100%" }} // Ensure the map has a defined size
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />

          {visitKPIdata.map((item, index) => (
            <Marker key={index} position={[item?.latitude, item?.longitude]}>
              <Popup>
                {t("Latitude")}: {item?.latitude?.toFixed(5)}, {t("Longitude")}:
                {item?.longitude?.toFixed(5)}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      )}
    </div>
  );
};

export default AddressMapView;
