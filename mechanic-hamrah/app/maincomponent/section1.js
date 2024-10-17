"use client";

import { Button, Spinner } from "@nextui-org/react";
import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion"; // اضافه کردن framer-motion

function Section1() {
  const [loading, setLoading] = useState(true);

  const sections = [
    {
      id: 1,
      label: "مکانیکی",
      des: "تیم ما شامل بهترین مکانیک‌ها است که با تجربه و تخصص خود به شما کمک می‌کنند تا مشکلات خودرویتان را به سرعت حل کنید.",
    },
    {
      id: 2,
      label: "یدک کش",
      des: "خدمات یدک کشی ما به صورت 24 ساعته در دسترس شماست تا در مواقع اضطراری به شما کمک کند.",
    },
    {
      id: 3,
      label: "متخصص",
      des: "متخصصان ما در زمینه‌های مختلف خودرو آماده‌اند تا بهترین خدمات را به شما ارائه دهند.",
    },
    {
      id: 4,
      label: "آپاراتی",
      des: "تیم آپاراتی ما با تجهیزات پیشرفته و مهارت‌های حرفه‌ای، خدمات با کیفیتی را ارائه می‌دهد.",
    },
  ];

  const images = [
    {
      id: 1,
      src: "https://static.vecteezy.com/system/resources/previews/007/788/906/large_2x/auto-repair-shop-red-suv-car-is-lift-in-garage-for-repair-and-maintenance-service-auto-service-with-lifted-vehicle-car-body-lifted-in-workshop-for-inspection-car-check-up-at-service-station-photo.jpg",
    },
    {
      id: 2,
      src: "https://png.pngtree.com/thumb_back/fh260/background/20240409/pngtree-crashed-car-loading-into-tow-truck-after-traffic-accident-on-road-image_15651796.jpg",
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
      <h1 className="text-center pt-12 text-4xl w-full text-blue-600 font-semibold">
        نزدیک ترین خدمات به شما
      </h1>

      <div className="text-center w-[80%] mx-auto mt-20">
        <div className="grid md:grid-cols-1 gap-10">
          {sections.map((section, index) => {
            const image = images.find((img) => img.id === section.id);
            return (
              <motion.div
                key={section.id}
                className={`flex items-center ${
                  index % 2 === 0 ? "flex-row" : "flex-row-reverse"
                } h-[40vh] border-b border-gray-300 p-4 shadow-lg transition-transform transform hover:scale-105`}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }} // انیمیشن خروج
                viewport={{ once: false }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.2,
                }}
              >
                <div className="relative w-1/2 h-full">
                  {loading && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Spinner />
                    </div>
                  )}
                  <Image
                    className="w-full h-full object-cover rounded-lg"
                    src={image.src}
                    width={800}
                    height={400}
                    onLoad={() => setLoading(false)}
                    alt={section.label}
                    loading="lazy"
                  />
                </div>
                <div className="w-1/2 p-4 text-gray-800">
                  <h2 className="text-xl font-bold text-blue-500">
                    {section.label}
                  </h2>
                  <p className="mt-2 text-gray-600">{section.des}</p>
                  {/* اضافه کردن دکمه برای تعامل بیشتر */}
                  <Button color="primary" className="mt-4">
                    اطلاعات بیشتر
                  </Button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Section1;
