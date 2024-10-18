"use client"; // اطمینان حاصل کنید که این در بالای فایل است

import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix default marker icon for Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

// Footer Component
const Footer = () => {
    return (
      <>
    <footer className="text-center bg-white border-t-2 shadow-inner border-blue-700 dark:bg-neutral-700 dark:text-white/75 lg:text-left">
      <div className="flex items-center justify-around border-b-1 border-blue-700 p-6 dark:border-white/10 lg:justify-between">
        <div className="me-12 lg:block">
          <span>ارتباط با ما در شبکه های مجازی</span>
        </div>

        <div className="flex justify-center">
          {/* Social Media Icons */}
          <a href="#!" className="me-6 [&>svg]:h-4 [&>svg]:w-4">
            {/* Facebook Icon */}
            <svg
              className="scale-[2] mx-4 hover:scale-[1.7] hover:text-blue-700 transition-all duration-300"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 488 512"
            >
              <path d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 ..."/>
            </svg>
          </a>

          <a href="#!" className="me-6 [&>svg]:h-4 [&>svg]:w-4">
            {/* Instagram Icon */}
            <svg
              className="scale-[2] hover:scale-[1.7] hover:text-blue-700 transition-all duration-300"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 448 512"
            >
              <path d="M100.3 ..."/>
            </svg>
          </a>

          <a href="#!" className="[&>svg]:h-4 [&>svg]:w-4">
            {/* Twitter Icon */}
            <svg
              className="scale-[2] mx-4 hover:scale-[1.7] hover:text-blue-700 transition-all duration-300"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 496 512"
            >
              <path d="M165.9 ..."/>
            </svg>
          </a>
        </div>
      </div>

      <div className="mx-6 py-10 text-center md:text-left">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">

          <div >
            <h6 className="mb-4 flex  items-center justify-center font-semibold uppercase md:justify-start text-blue-700">
              با مکانیک
            </h6>
            <p className="text-right">
              رضایت شما هدف ماست ارسال هرگونه انتقاد و پیشنهادات توسط درگاه زیر امکان پذیر است
            </p>
            <Input
              type="text"
              className="m-2 p-2 text-right rtl"
              aria-multiline
              color="secondary"
              alt="نظر شما"
            />
            <Button color="primary" className="ml-6">
              ارسال
            </Button>
          </div>

         <div>
            <h6 class="mb-4 flex justify-center font-semibold text-blue-700 uppercase md:justify-start">
              ارتباط با ما
            </h6>
            <p class="mb-4 flex items-center justify-center md:justify-start">
              <span class="me-3 [&>svg]:h-5 [&>svg]:w-5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" />
                  <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z" />
                </svg>
              </span>
              ایران، تهران
            </p>
            <p class="mb-4 flex items-center justify-center md:justify-start">
              <span class="me-3 [&>svg]:h-5 [&>svg]:w-5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
                  <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
                </svg>
              </span>
              ba.mechanic@gmail.com
            </p>
            <p class="mb-4 flex items-center justify-center md:justify-start">
              <span class="me-3 [&>svg]:h-5 [&>svg]:w-5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z"
                    clip-rule="evenodd"
                  />
                </svg>
              </span>
              +98 933 136 6961
            </p>
          </div>
        </div>

          <div className="col-span-full">
            <h6 className="mb-4 flex justify-center font-semibold text-blue-700 uppercase md:justify-start">
              موقعیت ما
            </h6>
            <MapContainer center={[35.6892, 51.389]} zoom={13} style={{ height: "200px", width: "40%" }}>
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              />
              <Marker position={[35.6892, 51.389]}>
                <Popup>ما اینجا هستیم!</Popup>
              </Marker>
            </MapContainer>
          </div>

        </div>


      <div className="bg-black/5 p-6 text-center">
        <span>© 2024 Copyright:</span>
        <a className="font-semibold" href="https://tw-elements.com/">Ba mechanic</a>
      </div>
    </footer>
      </>
  );
};

export default Footer;
  