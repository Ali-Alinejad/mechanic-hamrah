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

          {locations.map((loc) => (
            <Marker
              key={loc.id}
              position={[loc.lat, loc.lon]}
              icon={customIcon}
            >
              <Popup>
                <div className="p-3">
                  <NextUI.Card className="shadow-lg rounded-lg">
                    <NextUI.Card.Header className="bg-blue-600 text-white rounded-t-lg">
                      <NextUI.Text h3>{loc.name}</NextUI.Text>
                    </NextUI.Card.Header>
                    <NextUI.Card.Body>
                      <NextUI.Text className="text-gray-700 mb-2">
                        آدرس: {loc.address}
                      </NextUI.Text>
                      <div className="flex items-center justify-between mt-2 mb-2">
                        <NextUI.Text className="text-gray-600 font-medium">
                          تلفن:
                        </NextUI.Text>
                        <NextUI.Input
                          className="w-full"
                          value={loc.status ? loc.phone : "کاربر غیر فعال است"}
                          readOnly
                        />
                      </div>
                      <div className="flex items-center justify-between bg-blue-50 p-2 rounded-md shadow-sm mb-2">
                        <NextUI.Text className="text-blue-600 font-bold">
                          نوع:
                        </NextUI.Text>
                        <NextUI.Badge>{loc.type}</NextUI.Badge>
                      </div>
                      <NextUI.Card.Footer
                        className={`mt-2 p-2 rounded-md shadow-sm ${
                          loc.status ? "bg-green-50" : "bg-red-50"
                        }`}
                      >
                        <div className="flex justify-around w-full">
                          <NextUI.Text>⭐{loc.score}</NextUI.Text>
                          <NextUI.Text
                            className={`font-bold ${
                              loc.status ? "text-green-600" : "text-red-600"
                            }`}
                          >
                            {loc.status ? "فعال" : "غیر فعال"}
                          </NextUI.Text>
                        </div>
                      </NextUI.Card.Footer>
                    </NextUI.Card.Body>
                  </NextUI.Card>
                </div>
              </Popup>
            </Marker>
          ))}
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
