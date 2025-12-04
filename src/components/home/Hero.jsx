import React, { useState } from "react";
import { Search } from "lucide-react";

const Hero = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <section className="relative min-h-[80vh] flex items-center overflow-hidden bg-white pt-24">
      {/* Background Image */}
      <img
        src="https://images.pexels.com/photos/8281064/pexels-photo-8281064.jpeg"
        alt="Visa Travel Background"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Stronger Gradient Overlay */}
      <div className="absolute inset-0 bg-linear-to-r from-white via-white/95 to-white/10 z-0" />

      {/* Hero Content */}
      <div className="relative z-10 container mx-auto px-5 sm:px-6 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* Left Section */}
        <div className="flex flex-col justify-center max-w-xl lg:max-w-2xl">
          <div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-blue-900 leading-tight tracking-tight">
              GET THE VISA.
              <br />
              WITHOUT ANY
              <br />
              STRESS.
            </h1>

            <p className="text-gray-700 text-base sm:text-lg mt-4 leading-relaxed">
              Whether it’s Japan, France, or Dubai.
              <br />
              <span className="text-gray-600">
                Chennai Visa Service makes your visa process easy, fast, and
                fully online.
              </span>
            </p>

            {/* Search Bar */}
            <div className="flex items-center bg-white border border-gray-200 rounded-full shadow-lg w-full max-w-lg mt-6">
              <Search className="ml-4 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Where to, Captain? The world is yours."
                className="flex-1 px-3 py-2 sm:py-3 outline-none text-gray-700 placeholder-gray-400 text-sm sm:text-base"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button className="bg-yellow-400 text-blue-900 p-2 sm:p-3 rounded-full hover:bg-yellow-300 transition-all mr-2">
                <Search size={20} />
              </button>
            </div>

            <p className="text-gray-500 text-xs sm:text-sm mt-3">
              Search your visa by country - e.g., Japan, France, Dubai...
            </p>
          </div>

          {/* Bottom Card */}
          <div className="mt-10 sm:mt-14 bg-white shadow-xl rounded-2xl p-4 sm:p-5 w-56 sm:w-64">
            <div className="flex items-center gap-3 mb-2">
              <div className="text-2xl sm:text-3xl font-bold text-blue-900">
                120+
              </div>
              <div className="flex -space-x-2">
                <img
                  src="https://randomuser.me/api/portraits/women/65.jpg"
                  alt="traveler1"
                  className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 border-white"
                />
                <img
                  src="https://randomuser.me/api/portraits/men/32.jpg"
                  alt="traveler2"
                  className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 border-white"
                />
                <img
                  src="https://randomuser.me/api/portraits/women/12.jpg"
                  alt="traveler3"
                  className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 border-white"
                />
              </div>
            </div>
            <p className="font-semibold text-blue-900 text-xs sm:text-sm">
              Trusted by Travelers
            </p>
            <p className="text-gray-600 text-xs">
              120+ successful visa journeys and counting!
            </p>
          </div>
        </div>

        {/* Right Section */}
        {/* <div className="hidden md:flex justify-end items-center relative">
          <img
            src="/path-to-your-image/490b64d6-c21b-46b5-a699-9f9e7c369bdc.png"
            alt="Traveler Woman"
            className="max-h-[480px] lg:max-h-[520px] object-contain relative z-10 translate-y-0 lg:translate-y-2"
          />
        </div> */}
      </div>
    </section>
  );
};

export default Hero;
