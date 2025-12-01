// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

// // Load Razorpay script
// const useRazorpayScript = () => {
//   useEffect(() => {
//     const script = document.createElement("script");
//     script.src = "https://checkout.razorpay.com/v1/checkout.js";
//     script.async = true;
//     document.body.appendChild(script);

//     return () => {
//       document.body.removeChild(script);
//     };
//   }, []);
// };

// export default function ReviewPay() {
//   const navigate = useNavigate();
//   const [isProcessing, setIsProcessing] = useState(false);
//   useRazorpayScript();

//   const payNow = async () => {
//     setIsProcessing(true);

//     const response = await fetch(
//       import.meta.env.VITE_API_LOCAL_URL + "/create-order",
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           amount: 500,
//           currency: "INR",
//           receipt: "receipt#1",
//           notes: {},
//         }),
//       }
//     );

//     const order = await response.json();

//     const options = {
//       key: "rzp_test_Rk1cUlbT1flWi9",
//       amount: order.amount,
//       currency: order.currency,
//       name: "Chennai Visa",
//       description: "Visa payment Transaction",
//       order_id: order.id,
//       // callback_url: 'http://localhost:3000/payment-success', // Your success URL+
//       theme: {
//         color: "#F37254",
//       },
//       handler: function (response) {
//         console.log("ord id " + response.razorpay_order_id);
//         console.log("payment id " + response.razorpay_payment_id);
//         console.log("singnature id" + response.razorpay_signature);
//         fetch(import.meta.env.VITE_API_LOCAL_URL + "/verify-payment", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             razorpay_order_id: response.razorpay_order_id,
//             razorpay_payment_id: response.razorpay_payment_id,
//             razorpay_signature: response.razorpay_signature,
//           }),
//         })
//           .then((res) => res.json())
//           .then((data) => {
//             if (data.status === "ok") {
//               setIsProcessing(false);
//               alert("Payment Successful.");
//               navigate("/", {
//                 state: {
//                   paymentId: data.razorpay_payment_id,
//                 },
//               });
//             } else {
//               alert("Payment verification failed");
//             }
//           })
//           .catch((error) => {
//             console.error("Error:", error);
//             alert("Error verifying payment");
//           });
//       },
//     };

//     const rzp = new Razorpay(options);
//     rzp.open();
//   };

//   return (
//     <div className="p-4 max-w-lg mx-auto bg-white shadow-xl rounded-xl">
//       <h2 className="text-2xl font-bold mb-4 text-gray-800">Final Payment</h2>
//       <p className="text-xl font-semibold mb-6">Amount Due: ₹500.00</p>

//       <button
//         onClick={payNow}
//         disabled={isProcessing}
//         className={`w-full ${
//           isProcessing ? "bg-gray-400" : "bg-indigo-600 hover:bg-indigo-700"
//         } text-white font-semibold py-3 px-4 rounded-lg shadow-md transition duration-300`}
//       >
//         {isProcessing ? "Processing..." : "Pay Now"}
//       </button>
//     </div>
//   );
// }

// src/pages/ReviewPay.jsx
// ReviewPay.jsx
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import LoginModal from "../../components/auth/LoginModal";
import { useApp } from "../../context/ApplicationContext";
import { useAuth } from "../../context/AuthContext";

const useRazorpayScript = () => {
  useEffect(() => {
    const existing = document.querySelector(
      'script[src="https://checkout.razorpay.com/v1/checkout.js"]'
    );
    if (existing) return;
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);
};

function formatMoney(n) {
  return new Intl.NumberFormat("en-IN").format(n);
}

export default function ReviewPay() {
  const navigate = useNavigate();
  const location = useLocation();
  const { travellers } = useApp();
  const { user } = useAuth();
  useRazorpayScript();

  // IMPORTANT: backend base URL (set VITE_API_LOCAL_URL in .env to http://localhost:3000)
  const API = import.meta.env.VITE_API_LOCAL_URL || "http://localhost:3000";

  const productId = location.state?.productId;

  const [product, setProduct] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState("");

  useEffect(() => {
    if (!productId) {
      setLoading(false);
      setProduct(null);
      setFetchError(
        "No product selected. Please go back and select a visa product."
      );
      return;
    }

    let mounted = true;
    setLoading(true);
    setFetchError("");

    fetch(`${API}/api/product/${encodeURIComponent(productId)}`)
      .then(async (res) => {
        const ct = res.headers.get("content-type") || "";
        const text = await res.text().catch(() => null);

        if (!res.ok) {
          throw new Error(`Product fetch failed (${res.status}) ${text || ""}`);
        }

        // guard: if server returned HTML (index.html or error page), bail with helpful message
        if (
          ct.includes("text/html") ||
          (typeof text === "string" && text.trim().startsWith("<"))
        ) {
          throw new Error(
            `Expected JSON but server returned HTML. Ensure backend at ${API} is running and the route /api/product/:id returns JSON. Server response preview: ${String(
              text
            ).slice(0, 300)}`
          );
        }

        // parse JSON from the text we already read
        try {
          return JSON.parse(text);
        } catch (err) {
          throw new Error("Failed to parse product JSON from server response.");
        }
      })
      .then((data) => {
        if (!mounted) return;
        setProduct(data);
      })
      .catch((err) => {
        console.error("ReviewPay: product fetch error:", err);
        if (mounted) setFetchError(String(err.message || err));
        setProduct(null);
      })
      .finally(() => mounted && setLoading(false));

    return () => (mounted = false);
  }, [productId, API]);

  if (loading) return <div className="p-4">Loading...</div>;

  if (!product) {
    return (
      <div className="p-8 max-w-lg mx-auto bg-white shadow-xl rounded-xl">
        <h2 className="text-xl font-semibold">No product selected</h2>
        <p className="text-sm text-gray-500 mt-2">
          Go back and select a visa product first.
        </p>

        {fetchError && (
          <div className="mt-4 text-sm text-red-600">
            {fetchError}
            <div className="mt-2 text-xs text-slate-500">
              If you opened this route directly, choose a visa in the options
              page.
            </div>
          </div>
        )}

        <div className="mt-4 flex gap-2">
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 bg-gray-100 rounded"
          >
            Back
          </button>
          <button
            onClick={() => navigate("/visa")}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Browse Visas
          </button>
        </div>
      </div>
    );
  }

  const qty = Math.max(1, travellers.length || 1);
  const total = (product.price || 0) * qty; // rupees
  const razorpayAmount = Math.round(total * 100); // paise

  const payNow = async () => {
    setIsProcessing(true);
    try {
      // server-side create-order endpoint — use API base
      const res = await fetch(`${API}/create-order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId,
          qty,
        }),
      });

      if (!res.ok) {
        const txt = await res.text().catch(() => "");
        throw new Error(`Failed to create order (${res.status}) ${txt}`);
      }

      const order = await res.json();

      const options = {
        key:
          order.key ||
          import.meta.env.VITE_RAZORPAY_KEY_ID ,
        amount: order.amount, // paise returned by server
        currency: order.currency || "INR",
        name: "Chennai Visa",
        description: product.title || "Visa Payment",
        order_id: order.id,
        theme: { color: "#F37254" },
        handler: function (response) {
          // Post verification to server
          fetch(`${API}/verify-payment`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              productId,
              qty,
            }),
          })
            .then((r) => r.json())
            .then((data) => {
              setIsProcessing(false);
              if (data.status === "ok") {
                alert("Payment SuccessFull")
                navigate("/", {
                  state: { paymentId: data.razorpay_payment_id },
                });
              } else {
                alert("Payment verification failed. Please contact support.");
              }
            })
            .catch((err) => {
              console.error("verify-payment error:", err);
              alert("Error verifying payment. Please contact support.");
            });
        },
        prefill: {
          name: user?.name || "",
          email: user?.email || "",
          contact: user?.phone || "",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error("Payment error", err);
      alert(String(err.message || err) || "Could not initiate payment.");
      setIsProcessing(false);
    }
  };

  return (
    <div className="p-4 max-w-lg mx-auto bg-white shadow-xl rounded-xl">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Final Payment</h2>
      <p className="text-xl font-semibold mb-6">
        Amount Due: ₹{formatMoney(total)}
      </p>

      <button
        onClick={payNow}
        disabled={isProcessing}
        className={`w-full ${
          isProcessing ? "bg-gray-400" : "bg-indigo-600 hover:bg-indigo-700"
        } text-white font-semibold py-3 px-4 rounded-lg shadow-md transition duration-300`}
      >
        {isProcessing ? "Processing..." : "Pay Now"}
      </button>
    </div>
  );
}
