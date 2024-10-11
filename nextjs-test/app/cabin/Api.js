// components/CustomMap.js
"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { Spinner, Button, Select } from "@nextui-org/react";

// Fix for marker icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

const DEFAULT_LOCATION = { latitude: 35.6892, longitude: 51.389 }; // Tehran coordinates

function CustomMap() {
  const [location, setLocation] = useState(DEFAULT_LOCATION);
  const [error, setError] = useState(null);
  const [nearbyPlaces, setNearbyPlaces] = useState([]);

  const fetchLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });
          await fetchNearbyPlaces(latitude, longitude);
        },
        (err) => {
          setError(err.message);
        }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  };

  const fetchNearbyPlaces = async (latitude, longitude) => {
    try {
      const response = await axios.get(`https://api.neshan.org/v1/tehran`, {
        params: {
          term: "mechanic",
          lat: latitude,
          lng: longitude,
        },
        headers: {
          Authorization: `web.d75fd16c5f544668a4869e77d7debdb9`,
        },
      });
      setNearbyPlaces(response.data.items);
    } catch (err) {
      console.error(err);
      setError("خطا در دریافت مکان‌های نزدیک، دوباره تلاش کنید");
    }
  };

  useEffect(() => {
    fetchNearbyPlaces(location.latitude, location.longitude);
  }, [location]);

  return (
    <div className="p-4 text-center justify-center">
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      <div >
        <MapContainer
        
          center={[location.latitude, location.longitude]}
          zoom={17}
          style={{ height: "70vh", width: "100%" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={[location.latitude, location.longitude]}>
            <Popup>موقعیت پیش‌فرض شما</Popup>
          </Marker>
          {nearbyPlaces.map((place, index) => (
            <Marker key={index} position={[place.location.y, place.location.x]}>
              <Popup>{place.title}</Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
}

export default CustomMap;
