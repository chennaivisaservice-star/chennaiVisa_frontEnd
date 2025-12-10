// src/components/common/WhatsappFloatingButton.jsx

import React from "react";

const WhatsappIcon = ({ size = 20 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 32"
    width={size}
    height={size}
    aria-label="WhatsApp Logo"
  >
    {/* Only the glyph, no background circle here */}
    <path
      fill="white"
      d="M16 3C9.9 3 5 7.9 5 14c0 2.1.6 4.1 1.8 5.9L5 27l7.3-1.8C13.9 25.8 14.9 26 16 26c6.1 0 11-4.9 11-11S22.1 3 16 3zm0 2c5 0 9 4 9 9s-4 9-9 9c-1 .0-2-.2-3-.6l-.4-.2-4.3 1.1 1.2-4.2-.3-.4C8.9 17.4 8.5 15.7 8.5 14c0-5 4-9 7.5-9zm4.2 11.7c-.2-.1-1.4-.7-1.6-.7s-.4-.1-.6.1c-.2.3-.7 1-.8 1.1-.1.1-.3.2-.6.1-1.2-.4-2.2-1.1-3-2.1-.2-.3-.5-.6-.2-.9.2-.2.3-.4.4-.5.1-.1.2-.3.3-.4.1-.2.1-.3 0-.5-.1-.1-.6-1.4-.8-1.9-.2-.5-.4-.5-.6-.5h-.5c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.4s1 2.7 1.1 2.9c.1.2 2 3.1 5 4.2.7.3 1.3.5 1.7.6.7.2 1.3.2 1.8.1.6-.1 1.9-.8 2.1-1.5.3-.7.3-1.3.2-1.5-.1-.2-.3-.3-.6-.4z"
    />
  </svg>
);

const WhatsappFloatingButton = () => {
  // Replace with your actual WhatsApp number (no +, no spaces)
  const whatsappLink = "https://wa.me/919999999999";

  return (
    <a
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        zIndex: 1000,
        width: "64px",
        height: "64px",
        borderRadius: "50%",
        backgroundColor: "#ffffff",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        boxShadow: "0 12px 24px rgba(0, 0, 0, 0.25)", // outer soft shadow
        cursor: "pointer",
      }}
    >
      <div
        style={{
          width: "44px",
          height: "44px",
          borderRadius: "50%",
          backgroundColor: "#25D366", // WhatsApp green inner circle
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <WhatsappIcon size={22} />
      </div>
    </a>
  );
};

export default WhatsappFloatingButton;
