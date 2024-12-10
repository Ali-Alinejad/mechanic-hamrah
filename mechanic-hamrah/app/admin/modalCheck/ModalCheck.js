"use client"; // Ensure this runs on the client side in Next.js

import { useState, useEffect } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";
import dynamic from "next/dynamic";

// Dynamically import the MapContainer and other map-related components
const MapContainer = dynamic(() => import("react-leaflet").then((mod) => mod.MapContainer), { ssr: false });
const Marker = dynamic(() => import("react-leaflet").then((mod) => mod.Marker), { ssr: false });
const Popup = dynamic(() => import("react-leaflet").then((mod) => mod.Popup), { ssr: false });
const TileLayer = dynamic(() => import("react-leaflet").then((mod) => mod.TileLayer), { ssr: false });

import L from "leaflet";

// Define a custom icon for the user location
const userLocationIcon = new L.Icon({
  iconUrl:
    "https://www.iconpacks.net/icons/2/free-location-icon-2955-thumb.png",
  iconSize: [35, 35],
  iconAnchor: [17, 35],
  popupAnchor: [0, -35],
});

export default function ModalCheck() {
  const [isOpen, setIsOpen] = useState(false); // State for modal visibility

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  // Generate random latitude and longitude for the location
  const location = {
    latitude: 31.7683 + (Math.random() - 0.5) * 0.1, // Random offset from a central point (e.g., Tel Aviv, Israel)
    longitude: 35.2137 + (Math.random() - 0.5) * 0.1,
  };

  const fixedLocation = { latitude: 31.7683, longitude: 35.2137 };

  return (
    <>
      <Button onPress={openModal} color="primary">نمایش</Button>
      <Modal
        backdrop="opaque"
        classNames={{
          base: "border-[#292f46] bg-gray-700 text-white ",
          header: "border-b-[1px] border-[#292f46]",
          footer: "border-t-[1px] border-[#292f46]",
          closeButton: "hover:bg-white/5 text-white active:bg-white/10",
        }}
        isOpen={isOpen}
        onOpenChange={(open) => setIsOpen(open)}
        size="5xl"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col justify-center items-center gap-1">نمایش اطلاعات</ModalHeader>
              <ModalBody>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  {/* نقشه در اینجا */}
                  <div className="col-span-1 md:col-span-2 h-[400px] overflow-hidden">
                    <MapContainer
                      center={[location.latitude, location.longitude]}
                      zoom={15}
                      style={{ height: "100%", width: "100%", maxHeight: "400px" }} // تنظیم maxHeight
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
                    </MapContainer>
                  </div>

                  {/* اطلاعات دیگر */}
                  <div className="col-span-1 md:col-span-2 grid grid-cols-2 gap-8 justify-items-center">
                    <div className="col-span-1 flex flex-col justify-center items-center">
                      <h5  className=" text-gray-400 text-sm font-semibold">نام</h5 >
                      <p className="pt-2">علی علی نژاد</p>
                    </div>
                    <div className="col-span-1 flex flex-col justify-center items-center">
                      <h5  className=" text-gray-400 text-sm font-semibold">نام کاربری</h5 >
                      <p className="pt-2">user123</p>
                    </div>
                    <div className="col-span-1 flex flex-col justify-center items-center">
                      <h5  className=" text-gray-400 text-sm font-semibold">جیمیل</h5 >
                      <p className="pt-2">ali@example.com</p>
                    </div>
                    <div className="col-span-1 flex flex-col justify-center items-center">
                      <h5  className=" text-gray-400 text-sm font-semibold">تاریخ ثبت</h5 >
                      <p className="pt-2">2023-12-25</p>
                    </div>
                    <div className="col-span-1 flex flex-col justify-center items-center">
                      <h5  className=" text-gray-400 text-sm font-semibold">نوع ثبت</h5 >
                      <p className="pt-2 ">نوع 1 </p>
                    </div>
                    <div className="col-span-1 flex flex-col justify-center items-center">
                      <h5  className=" text-gray-400 text-sm font-semibold">آدرس</h5 >
                      <p className="pt-2">خیابان مثال، تهران</p>
                    </div>
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={closeModal}>
                  Close
                </Button>
                <Button color="primary" onPress={closeModal}>
                  Action
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
