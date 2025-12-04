import React from "react";

const VisaBanner = () => {
  return (
    <section className="relative bg-gradient-to-r from-blue-50 to-blue-100 h-[70vh] md:h-[55vh] lg:h-[50vh] flex items-center overflow-hidden pt-20 md:pt-24">
      {/* Yellow accent bar */}
      <div className="absolute bottom-0 left-0 right-0 h-4 bg-yellow-400"></div>

      {/* Decorative circles */}
      <div className="absolute top-6 right-10 w-12 h-12 bg-yellow-400 rounded-full opacity-10"></div>
      <div className="absolute bottom-10 left-10 w-10 h-10 bg-yellow-400 rounded-full opacity-10"></div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Text */}
          <div className="text-center lg:text-left px-4 lg:px-8 z-20">
            <h1 className="text-2xl md:text-3xl font-bold text-blue-900 mb-3 leading-snug">
              Contact Us
            </h1>
            <p className="text-base md:text-lg text-blue-900 font-medium mb-4">
              We're here to help you with your visa applications.
            </p>

            <button className="bg-yellow-400 text-blue-900 px-6 py-2 rounded-full font-semibold hover:bg-yellow-300 transition-all transform hover:scale-105">
              Apply Now
            </button>
          </div>

          {/* Image */}
          <div className="relative flex justify-center lg:justify-end px-4 lg:px-8">
            <img
              src="https://images.pexels.com/photos/4662438/pexels-photo-4662438.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="Couple traveling with luggage"
              className="flex-shrink-0 w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg rounded-lg shadow-lg object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default VisaBanner;
