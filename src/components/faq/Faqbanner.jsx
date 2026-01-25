import React from "react";

const Faqbanner = () => {
  return (
    <section className="relative bg-linear-to-r from-blue-50 to-blue-100 h-[70vh] md:h-[55vh] lg:h-[70vh] flex items-center overflow-hidden pt-20 md:pt-24">
      {/* Yellow accent bar */}
      <div className="absolute bottom-0 left-0 right-0 h-3 bg-yellow-400"></div>

      {/* Decorative circles */}
      <div className="absolute top-8 right-16 w-12 h-12 bg-yellow-400 rounded-full opacity-10"></div>
      <div className="absolute bottom-10 left-16 w-10 h-10 bg-yellow-400 rounded-full opacity-10"></div>

      {/* Content */}
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Text */}
          <div className="text-center lg:text-left lg:pr-10">
            <h1 className="text-3xl md:text-4xl font-bold text-blue-900 mb-3 leading-snug">
              Chennai Visa Center
            </h1>
            <p className="text-lg md:text-xl text-blue-900 font-medium mb-4">
              Ask us anything!
            </p>
          </div>

          {/* Image */}
          <div className="relative flex justify-center lg:justify-end">
            <img
              src="https://images.pexels.com/photos/11022636/pexels-photo-11022636.jpeg"
              alt="Couple traveling with luggage"
              className="w-3/4 max-w-md rounded-lg shadow-lg object-cover lg:mr-6"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Faqbanner;
