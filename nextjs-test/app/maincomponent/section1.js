"use client";

import { Button, Spinner } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Navigation from "../components/Navigation";

function Section1() {
  const [loading, setLoading] = useState(true);

  const sections = [
    { id: 1, label: "مکانیکی", bgColor: "bg-red-500" },
    { id: 2, label: "یدک کش", bgColor: "bg-blue-500" },
    { id: 3, label: "متخصص", bgColor: "bg-green-500" },
    { id: 4, label: "آپاراتی", bgColor: "bg-yellow-500" },
  ];

  const images = [
    {
      id: 1,
      src: "https://static.vecteezy.com/system/resources/previews/007/788/906/large_2x/auto-repair-shop-red-suv-car-is-lift-in-garage-for-repair-and-maintenance-service-auto-service-with-lifted-vehicle-car-body-lifted-in-workshop-for-inspection-car-check-up-at-service-station-photo.jpg",
    },
    {
      id: 2,
      src: "https://thumbs.dreamstime.com/b/red-broken-car-red-towing-truck-closeup-photo-vehicle-mechanical-problem-road-broken-car-towing-truck-124264503.jpg",
    },
    {
      id: 3,
      src: "https://aghayeemdad.com/wp-content/uploads/2020/08/%DA%86%DA%AF%D9%88%D9%86%D9%87-%D8%A8%D8%A7-%D9%85%DA%A9%D8%A7%D9%86%DB%8C%DA%A9-%D8%AE%D9%88%D8%AF-%D8%B5%D8%AD%D8%A8%D8%AA-%DA%A9%D9%86%DB%8C%D8%AF-768x512.jpg",
    },
    {
      id: 4,
      src: "https://hypertire.com/files/uploads/article/26e29e6e75a7e3dab9bf96026bf9f92e.jpg",
    },
  ];

  return (
    <>
      <Navigation />
      <h1 className="text-center  justify-center pt-12 text-4xl w-full bg-blue-700 text-white h-40"> نزدیک ترین خدمات  به شما </h1>
      <div className="text-center h-[75vh] w-[80%] mx-auto mt-10">
        <div className="grid md:grid-cols-4 gap-4">
          {sections.map((section) => {
            const image = images.find((img) => img.id === section.id);
            return (
              <div
                key={section.id}
                className={`h-[37vh] border-2 relative ${section.bgColor} rounded-lg overflow-hidden shadow-2xl`}
              >
                <div className="absolute inset-0 bg-black opacity-40"></div>

                {loading && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Spinner />
                  </div>
                )}

                <Image
                  className="text-center mx-auto overflow w-full h-full object-cover"
                  src={image.src}
                  width={800}
                  height={400}
                  onLoad={() => setLoading(false)}
                  alt={section.label} // توضیح تصویر
                />
                <Link href="/account">
                  <Button
                    className="absolute text-xl bg-white top-[40%] rounded-md shadow-md left-[27%] w-[40%] h-12 hover:bg-gray-200 transition duration-300"
                    onClick={() => console.log("not login")}
                  >
                    {section.label}
                  </Button>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Section1;
