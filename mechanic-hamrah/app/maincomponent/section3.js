function Section3() {
  return (
      <div
          className="relative w-full h-[60vh] bg-cover bg-center"
          style={{
              backgroundImage:
                  "url('https://gwrench.com/wp-content/uploads/2023/11/VistaCarMechanicNearMe.jpg')",
          }}
      >
          
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>

          <div className="relative flex flex-col justify-center items-center px-8 md:px-12 h-full text-white">
              <h1 className="text-4xl font-extrabold tracking-wide">
                  کنار شما
              </h1>
              <h2 className="text-5xl mt-4">
                  <span className=" font-semibold">
                      در سختی‌ها
                  </span>
              </h2>
              <h2 className="text-7xl mt-4">
                  <span className="text-blue-400 font-semibold">
                      مکانیک همراه
                  </span>
              </h2>
              <p className="text-lg mt-4 mb-6">
                  خدمات حرفه‌ای در هر زمان و مکان
              </p>
              <button className="bg-blue-500 text-white px-6 py-3 text-sm md:text-base rounded-lg shadow-lg hover:bg-blue-600 transition-all transform hover:scale-105">
                  بیشتر بدانید
              </button>
          </div>
      </div>
  );
}

export default Section3;
