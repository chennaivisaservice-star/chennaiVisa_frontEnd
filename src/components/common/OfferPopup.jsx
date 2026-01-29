import React, { useEffect, { useState } } from "react";

const OfferPopup = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const lastShown = localStorage.getItem("offerPopupShown");

    const today = new Date().toDateString();

    if (lastShown !== today) {
      setTimeout(() => {
        setShow(true);
        localStorage.setItem("offerPopupShown", today);
      }, 3000); // show after 3 seconds
    }
  }, []);

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[999] bg-black/50 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-xl w-[90%] max-w-md p-6 relative animate-scaleIn">

        {/* Close Button */}
        <button
          onClick={() => setShow(false)}
          className="absolute top-3 right-3 text-gray-500 hover:text-black text-xl"
        >
          ✕
        </button>

        {/* Heading */}
        <h2 className="text-2xl font-bold text-blue-900 text-center">
          🎉 Special Visa Offer
        </h2>

        {/* Subtext */}
        <p className="text-center text-gray-600 mt-2">
          Apply today & get exclusive discount on visa processing
        </p>

        {/* Offer Box */}
        <div className="bg-yellow-100 mt-4 p-4 rounded-lg text-center">
          <p className="text-lg font-semibold text-blue-900">
            Flat ₹500 OFF
          </p>
          <p className="text-sm text-gray-700">
            On all visa services
          </p>
        </div>

        {/* CTA */}
        <button
          onClick={() => setShow(false)}
          className="mt-5 w-full bg-yellow-400 text-blue-900 py-3 rounded-lg font-semibold hover:bg-yellow-300 transition"
        >
          Claim Offer
        </button>

      </div>
    </div>
  );
};

export default OfferPopup;
