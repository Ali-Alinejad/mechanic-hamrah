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
import { supabase } from "../../SupaBase/supabaseClient";

const MapContainer = dynamic(() => import("react-leaflet").then((mod) => mod.MapContainer), { ssr: false });
const Marker = dynamic(() => import("react-leaflet").then((mod) => mod.Marker), { ssr: false });
const Popup = dynamic(() => import("react-leaflet").then((mod) => mod.Popup), { ssr: false });
const TileLayer = dynamic(() => import("react-leaflet").then((mod) => mod.TileLayer), { ssr: false });

import L from "leaflet";


const userLocationIcon = new L.Icon({
  iconUrl:
    "https://www.iconpacks.net/icons/2/free-location-icon-2955-thumb.png",
  iconSize: [35, 35],
  iconAnchor: [17, 35],
  popupAnchor: [0, -35],
});

export default function ModalCheck({ list }) {
  const [isOpen, setIsOpen] = useState(false); 

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);


 const location = {
  latitude: list?.lat || 35.6895, // Default to Tehran's coordinates
  longitude: list?.long || 51.3890,
};

  async function AcceptClass() {
    const { data, error } = await supabase
      .from('Type') 
      .update({ check: 'true', pending : 'false' })
      .eq('id', list?.id)
      .select();


    if (error) {
      console.error("Error updating record:", error);
    } else {
      console.log("Record updated:", data);
    }
  }

  async function RejectClass() {
    const { data, error } = await supabase
      .from('Type') 
      .update({ check: 'false', pending : 'false' })
      .eq('id', list?.id)
      .select();


    if (error) {
      console.error("Error updating record:", error);
    } else {
      console.log("Record updated:", data);
    }
  }
  return (
    <>
      <Button onPress={openModal} color="primary">نمایش</Button>
      <Modal
        backdrop="opaque"
        classNames={{
          base: "border-[#292f46] bg-gray-700 text-white",
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
                  <div className="col-span-1 md:col-span-2 h-[400px] overflow-hidden">
                    <div className="h-fit bg-gray-300 rounded-lg mt-4">
                      <MapContainer
                        center={[location.latitude, location.longitude]}
                        zoom={16}
                        className="h-[100%] w-[100%] overflow-hidden"
                      >
                        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                        <Marker position={[location.latitude, location.longitude]} icon={userLocationIcon}>
                          <Popup>مغازه در اینجا قرار دارد.</Popup>
                        </Marker>
                      </MapContainer>
                    </div>
                  </div>

           
                  <div className="col-span-1 md:col-span-2 grid grid-cols-2 gap-8 justify-items-center">
                    <div className="col-span-1 flex flex-col justify-center items-center">
                      <h5 className="text-gray-400 text-sm font-semibold">نام</h5>
                      <p className="pt-2">{list?.name || "ندارد"}</p>
                    </div>
                    <div className="col-span-1 flex flex-col justify-center items-center">
                      <h5 className="text-gray-400 text-sm font-semibold">نام کاربری</h5>
                      <p className="pt-2">{list?.username || "ندارد"}</p>
                    </div>
                    <div className="col-span-1 flex flex-col justify-center items-center">
                      <h5 className="text-gray-400 text-sm font-semibold">جیمیل</h5>
                      <p className="pt-2">{list?.email || "ندارد"}</p>
                    </div>
                    <div className="col-span-1 flex flex-col justify-center items-center">
                      <h5 className="text-gray-400 text-sm font-semibold">تاریخ ثبت</h5>
                      <p className="pt-2">{list?.date || "ندارد"}</p>
                    </div>
                    <div className="col-span-1 flex flex-col justify-center items-center">
                      <h5 className="text-gray-400 text-sm font-semibold">نوع ثبت</h5>
                      <p className="pt-2">{list?.type || "مشخص نشده"}</p>
                    </div>
                    <div className="col-span-1 flex flex-col justify-center items-center">
                      <h5 className="text-gray-400 text-sm font-semibold">آدرس</h5>
                      <p className="pt-2">{list?.address || "ندارد"}</p>
                    </div>
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger"  onPress={() => {
                    RejectClass(); 
                    closeModal(); 
                  }} >مردود</Button>
                <Button
                
                  className="text-white bg-green-600"
                  onPress={() => {
                    AcceptClass(); 
                    closeModal();
                  }}
                >
                  تایید
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
