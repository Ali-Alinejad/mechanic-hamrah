"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Button, Spinner } from "@nextui-org/react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix for marker icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

// تعریف آیکون سفارشی
const customIcon = new L.Icon({
  iconUrl:
    "https://www.vhv.rs/dpng/d/1-11823_circle-location-icon-png-transparent-png.png", // مسیر به آیکون سفارشی شما
  iconSize: [28, 28], // سایز آیکون
  iconAnchor: [17, 35], // محل لنگر آیکون
  popupAnchor: [0, -35], // محل باز شدن پاپ‌آپ
});

function MapIrMap() {
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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
