"use client";
import { supabase } from "../SupaBase/supabaseClient";
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


const getDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; 
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c; 
};

function MapIrMap({ onClick }) {
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

          {locations.map((loc) => {
            // محاسبه فاصله
            const distance = getDistance(
              location.latitude,
              location.longitude,
              loc.lat,
              loc.lon
            ).toFixed(2);

            return (
              <Marker
                key={loc.id}
                position={[loc.lat, loc.lon]}
                icon={customIcon}
              >
                <Popup>
                  <div className="w-fit">
                    <div className="shadow-lg rounded-lg bg-white">
                      <div className="bg-blue-600 text-white rounded-t-lg p-4">
                        <h3 className="text-lg font-semibold">{loc.name}</h3>
                      </div>
                      <div className="p-4">
                        <p className="text-gray-700 mb-2">
                          آدرس: {loc.address}
                        </p>

                        <div className="flex items-center justify-between mt-2 mb-2">
                          <span className="text-gray-600 font-medium">
                            تلفن:
                          </span>
                          <input
                            className="w-full border border-gray-300 rounded-md p-2"
                            value={
                              loc.status ? loc.phone : "کاربر غیر فعال است"
                            }
                            readOnly
                          />
                        </div>
                        <div className="flex items-center justify-between bg-blue-50 p-2 rounded-md shadow-sm mb-2">
                          <span className="text-blue-600 font-bold">نوع:</span>
                          <span className="bg-blue-200 text-blue-800 px-2 py-1 rounded-full">
                            {loc.type}
                          </span>
                        </div>
                        <div
                          className={`mt-2 p-2 rounded-md shadow-sm ${
                            loc.status ? "bg-green-50" : "bg-red-50"
                          }`}
                        >
                          <div className="flex justify-around w-full">
                            <span> ⭐{loc.score}</span>
                            <span
                              className={`font-bold ${
                                loc.status ? "text-green-600" : "text-red-600"
                              }`}
                            >
                              {loc.status ? "فعال" : " غیر فعال"}
                            </span>
                          </div>
                        </div>
                        <p className="text-gray-700 p-1">
                          فاصله تا شما: {distance < 1 ? distance * 1000 : Math.round(distance)} {" "}
                          {distance < 1 ? "متر" : "کیلومتر"}
                        </p>
                      </div>
                    </div>
                  </div>
                </Popup>
              </Marker>
            );
          })}
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
