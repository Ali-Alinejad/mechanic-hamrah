"use client";

import { useState } from "react";
import { Button, Input, Textarea } from "@nextui-org/react";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import Navigation from "../components/Navigation";

function LocationMarker({ setLatlng, setSelectedLocation }) {
  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      setLatlng({ lat, lng });
      setSelectedLocation({ lat, lng });
    },
  });

  return null;
}
const customIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
  iconSize: [35, 35],
  iconAnchor: [17, 35],
  popupAnchor: [0, -35],
});
function Page() {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [shopName, setShopName] = useState("");
  const [shopNumber, setShopNumber] = useState("");
  const [workingHours, setWorkingHours] = useState("");
  const [rating, setRating] = useState("");
  const [latlng, setLatlng] = useState({ lat: "", lng: "" });

  const isFormValid = () => {
    return shopName && shopNumber && workingHours && rating && latlng.lat && latlng.lng;
  };

  return (
    <>
      <Navigation />
      <div className="flex justify-center items-start bg-gradient-to-tr from-blue-600 to-violet-600 min-h-screen w-full">
        <div className="flex flex-row-reverse w-full max-w-6xl mx-auto space-x-4">
          <div className="w-[40%] m-4 p-6 bg-white rounded-lg shadow-xl rtl">
            <h1 className="text-3xl font-bold mb-6 text-gray-800">اطلاعات مغازه</h1>
            <form className="space-y-6">
              <Input
                clearable
                underlined
                label="نام مغازه"
                placeholder="نام مغازه را وارد کنید"
                required
                value={shopName}
                onChange={(e) => setShopName(e.target.value)}
              />
              <Input
                clearable
                underlined
                label="شماره مغازه"
                placeholder="شماره مغازه را وارد کنید"
                required
                value={shopNumber}
                onChange={(e) => setShopNumber(e.target.value)}
              />
              <Textarea
                label="ساعت فعالیت"
                placeholder="ساعات فعالیت را وارد کنید"
                required
                value={workingHours}
                onChange={(e) => setWorkingHours(e.target.value)}
              />
              <Input
                type="number"
                clearable
                underlined
                label="امتیاز دهی"
                placeholder="امتیاز خود را وارد کنید (0 تا 5)"
                min={0}
                max={5}
                required
                value={rating}
                onChange={(e) => setRating(e.target.value)}
              />
              <div className="flex flex-row gap-1">
                <Input
                  type="number"
                  clearable
                  underlined
                  label="عرض جغرافیایی"
                  placeholder="35.1024"
                  readOnly
                  value={latlng.lat}
                />
                <Input
                  type="number"
                  clearable
                  underlined
                  label="طول جغرافیایی"
                  placeholder="51.1024"
                  readOnly
                  value={latlng.lng}
                />
              </div>
              <Button 
                type="submit" 
                className="w-full mt-6" 
                color="primary"
                isDisabled={!isFormValid()}
              >
                ذخیره اطلاعات
              </Button>
            </form>
          </div>
          <div className="w-[60%] ml-2">
            <div className="h-fit bg-gray-300 rounded-lg mt-4">
              <MapContainer
                center={[35.661521, 51.395466]}
                zoom={15}
                className="h-[70vh] w-[100%] overflow-hidden"
              >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                
                {selectedLocation && (
                  <Marker position={selectedLocation} icon={customIcon}>
                    <Popup>
                      مغازه در اینجا قرار دارد.
                    </Popup>
                  </Marker>
        

                )}
                
                {/* افزودن کامپوننت LocationMarker */}
                <LocationMarker setLatlng={setLatlng} setSelectedLocation={setSelectedLocation} />
                
              </MapContainer>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Page;