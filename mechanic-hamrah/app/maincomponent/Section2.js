"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";

const Section2 = () => {
  const initialTestimonials = [
    {
      name: "علی",
      avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
      feedback: "خدمات عالی بود!",
    },
    {
      name: "مریم",
      avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024q",
      feedback: "بسیار راضی هستم.",
    },
    {
      name: "حسین",
      avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024f",
      feedback: "کار حرفه‌ای و سریع انجام شد.",
    },
    {
      name: "سمیرا",
      avatar: "https://i.pravatar.cc/150?u=a042581f4e29026025a",
      feedback: "پشتیبانی عالی و خدمات بی‌نظیر.",
    },
    {
      name: "احمد",
      avatar: "https://i.pravatar.cc/150?u=a042581f4e29026025b",
      feedback: "بسیار عالی بود.",
    },
    {
      name: "سارا",
      avatar: "https://i.pravatar.cc/150?u=a042581f4e29026025n",
      feedback: "تجربه‌ی فوق‌العاده‌ای بود.",
    },
    {
      name: "رضا",
      avatar: "https://i.pravatar.cc/150?u=a042581f4e29026025d",
      feedback: "تیم بسیار حرفه‌ای.",
    },
    {
      name: "فاطمه",
      avatar: "https://i.pravatar.cc/150?u=a042581f4e29026025e",
      feedback: "بسیار سریع و کارآمد.",
    },
    {
      name: "مهدی",
      avatar: "https://i.pravatar.cc/150?u=a042581f4e29026025f",
      feedback: "پشتیبانی عالی.",
    },
    {
      name: "زهرا",
      avatar: "https://i.pravatar.cc/150?u=a042581f4e29026025y",
      feedback: "کیفیت خدمات بسیار بالا بود.",
    },
  ];

  const [testimonials, setTestimonials] = useState(initialTestimonials);
  const controls = useAnimation();

  useEffect(() => {
    // شروع انیمیشن حرکت مداوم
    controls.start({
        x: ["0", "-730%"], 
       
      transition: {
        duration: 30, 
        ease: "linear",
        repeatType: "reverse",
        repeat: Infinity
      },
    });
  }, [controls]);

  return (
    <div className="py-16 my-10 bg-gradient-to-t from-blue-200 to-slate-0">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
          نظرات کاربران
        </h2>
        <motion.div className="grid grid-flow-col w-[100%] gap-8 overflow-hidden">
          {testimonials.map((testimonial, index) => (
            <motion.div
              animate={controls}
              key={index}
              className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center w-56 transition-transform duration-300 ease-in-out transform hover:scale-105"
            >
              <Image
                className="rounded-full mb-4"
                src={testimonial.avatar}
                width={80}
                height={80}
                alt="avatar"
              />
              <h3 className="text-xl font-bold mb-2">{testimonial.name}</h3>
              <p className="text-gray-700 text-center">
                {testimonial.feedback}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Section2;
