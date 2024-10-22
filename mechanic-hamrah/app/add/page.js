"use client";

import MapIrMap from "../api/custommap";
import Navigation from "../components/Navigation";
import { Button, Input, Textarea } from "@nextui-org/react";
import { useState } from "react";

function Page() {
  const [selectedLocation, setSelectedLocation] = useState(null);

  const handleMapClick = (lat, lng) => {
    setSelectedLocation({ lat, lng });
    console.log(selectedLocation);

  };

  return (
    <>
      <Navigation />
      <div className="flex justify-center items-start bg-gradient-to-tr from-blue-600 to-violet-600 min-h-screen w-full">
        <div className="flex flex-row-reverse w-full max-w-6xl mx-auto space-x-4">
          <div className="w-[40%] m-4 p-6 bg-white rounded-lg shadow-xl rtl">
            <h1 className="text-3xl font-bold mb-6 text-gray-800">
              اطلاعات مغازه
            </h1>
            <form className="space-y-6">
              <div>
                <Input
                  clearable
                  underlined
                  label="نام مغازه"
                  placeholder="نام مغازه را وارد کنید"
                  required
                />
              </div>
              <div>
                <Input
                  clearable
                  underlined
                  label="شماره مغازه"
                  placeholder="شماره مغازه را وارد کنید"
                  required
                />
              </div>
              <div>
                <Textarea
                  label="ساعت فعالیت"
                  placeholder="ساعات فعالیت را وارد کنید"
                  required
                />
              </div>
              <div>
                <Input
                  type="number"
                  clearable
                  underlined
                  label="امتیاز دهی"
                  placeholder="امتیاز خود را وارد کنید (0 تا 5)"
                  min={0}
                  max={5}
                  required
                />
              </div>
              <Button type="submit" className="w-full mt-6" color="primary">
                ذخیره اطلاعات
              </Button>
            </form>
            {selectedLocation && (
              <div className="mt-6 p-4 bg-blue-100 rounded-lg shadow">
                <p>
                  <strong>عرض جغرافیایی:</strong> {selectedLocation.lat}
                </p>
                <p>
                  <strong>طول جغرافیایی:</strong> {selectedLocation.lng}
                </p>
              </div>
            )}
          </div>
          <div className="w-[60%] ml-2">
            <div className="h-fit bg-gray-300 rounded-lg mt-4">
              <MapIrMap
                onClick={handleMapClick}
                selectedLocation={selectedLocation}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Page;
