import React from "react";

const VisaBanner = () => {
  return (
    <section className="relative bg-linear-to-r from-blue-50 to-blue-100 h-[70vh] md:h-[70vh] lg:h-[70vh] flex items-center overflow-hidden pt-20 md:pt-24">
      {/* Yellow accent bar */}
      <div className="absolute bottom-0 left-0 right-0 h-4 bg-yellow-400"></div>

      {/* Decorative circles */}
      <div className="absolute top-6 right-10 w-12 h-12 bg-yellow-400 rounded-full opacity-10"></div>
      <div className="absolute bottom-10 left-10 w-10 h-10 bg-yellow-400 rounded-full opacity-10"></div>

      {/* Content */}
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          {/* Text */}
          <div className="text-center lg:text-left">
            <h1 className="text-2xl md:text-3xl font-bold text-blue-900 mb-3 leading-snug">
              Apply for all Tourist visas online in one place - Chennai Visa
              Service
            </h1>
            <p className="text-base md:text-lg text-blue-900 font-medium mb-4">
              Find Your Next Destination
            </p>

            <button className="bg-yellow-400 text-blue-900 px-6 py-2 rounded-full font-semibold hover:bg-yellow-300 transition-all transform hover:scale-105">
              Apply Now
            </button>
          </div>

          {/* Image */}
          <div className="relative flex justify-center lg:justify-end">
            <img
              src="https://images.pexels.com/photos/4922356/pexels-photo-4922356.jpeg"
              alt="Couple traveling with luggage"
              className="w-4/5 max-w-sm rounded-lg shadow-lg object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default VisaBanner;
