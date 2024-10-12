"use client";

import React, { useState } from "react";

function Filter() {
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleOptionChange = (option) => {
    setSelectedOptions((prev) =>
      prev.includes(option)
        ? prev.filter((o) => o !== option)
        : [...prev, option]
    );
  };

  const handleApply = () => {
    console.log("Selected options:", selectedOptions);
    // Implement your apply logic here
  };

  return (
    <div className="mt-10 mx-auto bg-gradient-to-r from-blue-500 to-blue-700 flex flex-col justify-center p-5 rounded-lg shadow-2xl w-full max-w-md">
      <h2 className="text-white text-3xl mb-6 font-extrabold text-center">
        فیلتر خدمات
      </h2>
      <ul className="border border-white rounded-lg p-3 bg-white shadow-lg divide-y divide-gray-200">
        {["یدک کش", "تعمیراتی", "مکانیک سیار", "آپاراتی"].map((option) => (
          <li
            key={option}
            className="p-3 hover:bg-blue-50 rounded transition duration-200"
          >
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                name="filterOptions"
                value={option}
                checked={selectedOptions.includes(option)}
                onChange={() => handleOptionChange(option)}
                className="mr-3 accent-blue-600"
              />
              <span className="text-gray-800 font-semibold">{option}</span>
            </label>
          </li>
        ))}
      </ul>
      <button
        onClick={handleApply}
        className="mt-6 w-full bg-white text-blue-500 font-bold py-2 px-4 rounded-lg hover:bg-blue-200 hover:shadow-md transition duration-200"
      >
        اعمال
      </button>
    </div>
  );
}

export default Filter;
