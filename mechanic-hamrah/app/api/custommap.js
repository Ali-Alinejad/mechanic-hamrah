"use client";
import { supabase } from "../SupaBase/supabaseClient";
import { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import { Button, Spinner } from "@nextui-org/react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

const userLocationIcon = new L.Icon({
  iconUrl:
    "https://www.iconpacks.net/icons/2/free-location-icon-2955-thumb.png",
  iconSize: [35, 35],
  iconAnchor: [17, 35],
  popupAnchor: [0, -35],
});

const customIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
  iconSize: [35, 35],
  iconAnchor: [17, 35],
  popupAnchor: [0, -35],
});

function LocationMarker({ onClick }) {
  const [position, setPosition] = useState(null);
  const map = useMapEvents({
    click(e) {
      setPosition(e.latlng);
      onClick(e.latlng.lat, e.latlng.lng);
    },
  });
  return position === null ? null : (
    <Marker position={position} icon={customIcon}>
      <Popup>موقعیت انتخابی شما</Popup>
    </Marker>
  );
}

function MapIrMap({ onClick, selectedLocation }) {
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [locations, setLocations] = useState([]);

  const handleLocationClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });
          setLoading(false);
        },
        (error) => {
          console.error("خطا در دریافت موقعیت جغرافیایی:", error);
          setError("خطا در دریافت موقعیت جغرافیایی.");
          setLoading(false);
        }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
      setLoading(false);
    }
  };

  const fetchLocations = async () => {
   let { data, error } = await supabase.from("Type").select("*");
    if (error) {
      console.error("Error fetching locations:", error);
    } else {
      console.log("Fetched locations:", data);
      setLocations(data);
    }
  };

  useEffect(() => {
    handleLocationClick();
    fetchLocations();
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
              icon={userLocationIcon}
            >
              <Popup>موقعیت شما</Popup>
            </Marker>
          )}
          {selectedLocation && (
            <Marker
              position={[selectedLocation.lat, selectedLocation.lng]}
              icon={customIcon}
            >
              <Popup>موقعیت انتخابی</Popup>
            </Marker>
          )}
          {locations.map((loc) => (
            <Marker
              key={loc.id}
              position={[loc.lat, loc.lon]}
              icon={customIcon}
            >
              <Popup>
                <strong>{loc.name}</strong>
                <br />
                آدرس: {loc.address}
              </Popup>
            </Marker>
          ))}
          <LocationMarker onClick={onClick} />
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
