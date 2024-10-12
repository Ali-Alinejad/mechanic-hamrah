"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { Button, Spinner } from "@nextui-org/react";

// آیکون سفارشی
const customIcon = L.icon({
  iconUrl:
    "https://png.pngtree.com/png-vector/20220416/ourmid/pngtree-circle-location-icon-in-blue-and-white-color-png-image_4545017.png",
  iconSize: [31, 31],
  iconAnchor: [12, 41],
});

function CustomMap() {
  const [location, setLocation] = useState(null);
  const [nearbyPlaces, setNearbyPlaces] = useState([]);
  const [loading, setLoading] = useState(true); // حالت بارگذاری

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
    } finally {
      setLoading(false); // پایان بارگذاری
    }
  };

  const handleLocationClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ latitude, longitude });
        fetchNearbyPlaces(latitude, longitude);
      });
    }
  };

  useEffect(() => {
    handleLocationClick(); // بارگذاری موقعیت کاربر در ابتدا
  }, []);

  return (
    <div className="relative p-4 text-center justify-center">
      {loading ? ( // نمایش اسپینر تا زمان بارگذاری موقعیت
        <div
          className="flex justify-center items-center"
          style={{ height: "70vh" }}
        >
          <Spinner size="lg" />
        </div>
      ) : (
        <MapContainer
          center={[location.latitude, location.longitude]}
          zoom={17}
          style={{ height: "70vh", width: "100%" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {location && (
            <Marker
              position={[location.latitude, location.longitude]}
              icon={customIcon}
            >
              <Popup>موقعیت شما</Popup>
            </Marker>
          )}
          {nearbyPlaces.map((place, index) => (
            <Marker
              key={index}
              position={[place.location.y, place.location.x]}
              icon={customIcon}
              eventHandlers={{
                click: () => {
                  const map = useMap();
                  map.setView([place.location.y, place.location.x], 17);
                  alert(`بارگذاری مکان ${place.title}`);
                },
              }}
            >
              <Popup>{place.title}</Popup>
            </Marker>
          ))}
        </MapContainer>
      )}

    
      <Button
        onClick={handleLocationClick}
        className="absolute bottom-[-40px] right-10 w-12 h-12 shadow-2xl p-2 overflow-hidden rounded-full"
        color="primary"
      >
        موقعیت شما
      </Button>
    </div>
  );
}

export default CustomMap;
