"use client";

import Image from "next/image";

const Section2 = () => {
  const testimonials = [
    {
      name: "علی",
      avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
      feedback: "خدمات عالی بود!",
    },
    {
      name: "مریم",
      avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024e",
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
  ];

  return (
    <div className="py-16 my-10 bg-gray-100">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
          نظرات کاربران
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center"
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
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Section2;
