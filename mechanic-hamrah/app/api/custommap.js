"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Button, Spinner } from "@nextui-org/react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

// Custom icon for the marker
const customIcon = new L.Icon({
  iconUrl:
    "https://www.vhv.rs/dpng/d/1-11823_circle-location-icon-png-transparent-png.png",
  iconSize: [28, 28],
  iconAnchor: [14, 28], // Center the icon
  popupAnchor: [0, -28],
});

function MapIrMap({ onMapClick }) {
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [markerPosition, setMarkerPosition] = useState(null); // برای ذخیره موقعیت علامت

  const handleLocationClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });
          setLoading(false);
        },
        (error) => {
          setError("خطا در دریافت موقعیت جغرافیایی.");
          setLoading(false);
        }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
      setLoading(false);
    }
  };

  const handleMapClick = (event) => {
    const { lat, lng } = event.latlng; // دریافت مختصات کلیک شده
    setMarkerPosition({ lat, lng }); // ذخیره موقعیت جدید
    if (onMapClick) {
      onMapClick({ lat, lng }); // فراخوانی تابع ارسال موقعیت
    }
  };

  useEffect(() => {
    handleLocationClick();
  }, []);

  return (
    <div className="relative p-4 text-center justify-center">
      {loading ? (
        <div
          className="flex justify-center items-center"
          style={{ height: "70vh" }}
        >
          <Spinner size="lg" />
        </div>
      ) : (
        <MapContainer
          center={[location.latitude, location.longitude]}
          zoom={15}
          style={{ height: "70vh", width: "100%" }}
          whenCreated={(map) => map.on("click", handleMapClick)} // اضافه کردن رویداد کلیک به نقشه
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {location && (
            <Marker
              position={[location.latitude, location.longitude]}
              icon={customIcon}
            >
              <Popup>موقعیت شما</Popup>
            </Marker>
          )}
          {markerPosition && ( // نمایش علامت در موقعیت جدید
            <Marker
              position={[markerPosition.lat, markerPosition.lng]}
              icon={customIcon}
            >
              <Popup>موقعیت انتخاب شده</Popup>
            </Marker>
          )}
        </MapContainer>
      )}
      <div className="flex-row-reverse flex">
        <Button
          onClick={handleLocationClick}
          className="w-12 h-12 shadow-2xl p-2 overflow-hidden rounded-full"
          color="primary"
        >
          موقعیت شما
        </Button>
      </div>
      {error && <div className="text-red-500 mt-4">{error}</div>}
    </div>
  );
}

export default MapIrMap;
