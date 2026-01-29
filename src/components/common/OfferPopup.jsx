import React, { useEffect, useState } from "react";

const OfferPopup = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const lastShown = localStorage.getItem("offerPopupShown");
    const today = new Date().toDateString();

    if (lastShown !== today) {
      setTimeout(() => {
        setShow(true);
        localStorage.setItem("offerPopupShown", today);
      }, 2500); // show after 2.5 sec
    }
  }, []);

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[999] bg-black/60 flex items-center justify-center px-3">
      <div className="bg-white w-full max-w-md rounded-xl p-6 relative shadow-xl animate-scaleIn">

        {/* Close */}
        <button
          onClick={() => setShow(false)}
          className="absolute top-3 right-3 text-xl text-gray-500 hover:text-black"
        >
          ✕
        </button>

        {/* Title */}
        <h2 className="text-2xl font-bold text-center text-blue-900">
          🎉 Special Travel Offers
        </h2>

        <p className="text-center text-gray-600 mt-2">
          Book with us & save more on your travel needs
        </p>

        {/* Offers */}
        <div className="mt-5 space-y-3">

          <div className="flex justify-between bg-yellow-100 px-4 py-3 rounded-lg">
            <span>Travel Insurance</span>
            <strong>₹500 OFF</strong>
          </div>

          <div className="flex justify-between bg-yellow-100 px-4 py-3 rounded-lg">
            <span>Hotel Booking</span>
            <strong>₹500 OFF</strong>
          </div>

          <div className="flex justify-between bg-blue-50 px-4 py-3 rounded-lg">
            <span>USA Visa Appointment Slots</span>
            <strong>Available</strong>
          </div>

        </div>

        {/* CTA */}
        <button
          onClick={() => setShow(false)}
          className="mt-6 w-full bg-yellow-400 text-blue-900 py-3 rounded-lg font-semibold hover:bg-yellow-300 transition"
        >
          Claim Offer
        </button>

      </div>
    </div>
  );
};

export default OfferPopup;
