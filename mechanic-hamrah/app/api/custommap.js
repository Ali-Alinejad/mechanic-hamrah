"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Button, Spinner } from "@nextui-org/react";
import Head from "next/head";

// آدرس API نشان
const NESHAN_API_URL = "https://api.neshan.org/v1";
const NESHAN_API_KEY = "web.e27fb33bea394b0c81f058ad18481f53"; // کلید API نشان خود را وارد کنید

function CustomMap() {
  const [location, setLocation] = useState(null);
  const [nearbyPlaces, setNearbyPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchNearbyPlaces = async (latitude, longitude) => {
    try {
      setLoading(true);
      const response = await axios.get(`${NESHAN_API_URL}/search`, {
        params: {
          term: "mechanic",
          lat: latitude,
          lng: longitude,
        },
        headers: {
          Authorization: `Bearer ${NESHAN_API_KEY}`, // کلید API نشان خود را وارد کنید
        },
      });
      setNearbyPlaces(response.data.items);
    } catch (err) {
      console.error(err);
      setError("خطا در دریافت مکانهای نزدیک.");
    } finally {
      setLoading(false);
    }
  };

  const handleLocationClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });
          fetchNearbyPlaces(latitude, longitude);
        },
        (error) => {
          setError("خطا در دریافت موقعیت جغرافیایی.");
        }
      );
    }
  };

  useEffect(() => {
    handleLocationClick();
  }, []);

  useEffect(() => {
    const initializeMap = () => {
      if (location && window.nmp_mapboxgl) {
        const map = new window.nmp_mapboxgl.Map("map", {
          center: [location.longitude, location.latitude],
          zoom: 15,
          mapKey: NESHAN_API_KEY,
        });

        new window.nmp_mapboxgl.Marker()
          .setLngLat([location.longitude, location.latitude])
          .setPopup(new window.nmp_mapboxgl.Popup().setText("موقعیت شما"))
          .addTo(map);

        nearbyPlaces.forEach((place) => {
          new window.nmp_mapboxgl.Marker()
            .setLngLat([place.location.x, place.location.y])
            .setPopup(new window.nmp_mapboxgl.Popup().setText(place.title))
            .addTo(map);
        });

        return () => map.remove(); // Cleanup on unmount
      } else {
        console.error("Neshan library is not loaded.");
      }
    };

    const intervalId = setInterval(() => {
      if (window.nmp_mapboxgl) {
        clearInterval(intervalId);
        initializeMap();
      }
    }, 500);

    return () => clearInterval(intervalId);
  }, [location, nearbyPlaces]);

  return (
    <>
      <Head>
        <link
          rel="stylesheet"
          href="https://static.neshan.org/sdk/mapboxgl/v1.13.2/neshan-sdk/v1.1.3/index.css"
        />
        <script src="https://static.neshan.org/sdk/mapboxgl/v1.13.2/neshan-sdk/v1.1.3/index.js"></script>
      </Head>
      <div className="relative p-4 text-center justify-center">
        {loading ? (
          <div
            className="flex justify-center items-center"
            style={{ height: "70vh" }}
          >
            <Spinner size="lg" />
          </div>
        ) : (
          <div id="map" style={{ height: "70vh", width: "100%" }}></div>
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
    </>
  );
}

export default CustomMap;
