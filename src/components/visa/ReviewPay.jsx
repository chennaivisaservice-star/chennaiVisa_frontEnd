// // // import React, { useEffect, useState } from "react";
// // // import { useNavigate } from "react-router-dom";

// // // // Load Razorpay script
// // // const useRazorpayScript = () => {
// // //   useEffect(() => {
// // //     const script = document.createElement("script");
// // //     script.src = "https://checkout.razorpay.com/v1/checkout.js";
// // //     script.async = true;
// // //     document.body.appendChild(script);

// // //     return () => {
// // //       document.body.removeChild(script);
// // //     };
// // //   }, []);
// // // };

// // // export default function ReviewPay() {
// // //   const navigate = useNavigate();
// // //   const [isProcessing, setIsProcessing] = useState(false);
// // //   useRazorpayScript();

// // //   const payNow = async () => {
// // //     setIsProcessing(true);

// // //     const response = await fetch(
// // //       import.meta.env.VITE_API_LOCAL_URL + "/create-order",
// // //       {
// // //         method: "POST",
// // //         headers: {
// // //           "Content-Type": "application/json",
// // //         },
// // //         body: JSON.stringify({
// // //           amount: 500,
// // //           currency: "INR",
// // //           receipt: "receipt#1",
// // //           notes: {},
// // //         }),
// // //       }
// // //     );

// // //     const order = await response.json();

// // //     const options = {
// // //       key: "rzp_test_Rk1cUlbT1flWi9",
// // //       amount: order.amount,
// // //       currency: order.currency,
// // //       name: "Chennai Visa",
// // //       description: "Visa payment Transaction",
// // //       order_id: order.id,
// // //       // callback_url: 'http://localhost:3000/payment-success', // Your success URL+
// // //       theme: {
// // //         color: "#F37254",
// // //       },
// // //       handler: function (response) {
// // //         console.log("ord id " + response.razorpay_order_id);
// // //         console.log("payment id " + response.razorpay_payment_id);
// // //         console.log("singnature id" + response.razorpay_signature);
// // //         fetch(import.meta.env.VITE_API_LOCAL_URL + "/verify-payment", {
// // //           method: "POST",
// // //           headers: {
// // //             "Content-Type": "application/json",
// // //           },
// // //           body: JSON.stringify({
// // //             razorpay_order_id: response.razorpay_order_id,
// // //             razorpay_payment_id: response.razorpay_payment_id,
// // //             razorpay_signature: response.razorpay_signature,
// // //           }),
// // //         })
// // //           .then((res) => res.json())
// // //           .then((data) => {
// // //             if (data.status === "ok") {
// // //               setIsProcessing(false);
// // //               alert("Payment Successful.");
// // //               navigate("/", {
// // //                 state: {
// // //                   paymentId: data.razorpay_payment_id,
// // //                 },
// // //               });
// // //             } else {
// // //               alert("Payment verification failed");
// // //             }
// // //           })
// // //           .catch((error) => {
// // //             console.error("Error:", error);
// // //             alert("Error verifying payment");
// // //           });
// // //       },
// // //     };

// // //     const rzp = new Razorpay(options);
// // //     rzp.open();
// // //   };

// // //   return (
// // //     <div className="p-4 max-w-lg mx-auto bg-white shadow-xl rounded-xl">
// // //       <h2 className="text-2xl font-bold mb-4 text-gray-800">Final Payment</h2>
// // //       <p className="text-xl font-semibold mb-6">Amount Due: ₹500.00</p>

// // //       <button
// // //         onClick={payNow}
// // //         disabled={isProcessing}
// // //         className={`w-full ${
// // //           isProcessing ? "bg-gray-400" : "bg-indigo-600 hover:bg-indigo-700"
// // //         } text-white font-semibold py-3 px-4 rounded-lg shadow-md transition duration-300`}
// // //       >
// // //         {isProcessing ? "Processing..." : "Pay Now"}
// // //       </button>
// // //     </div>
// // //   );
// // // }

// // // src/pages/ReviewPay.jsx
// // // ReviewPay.jsx
// // import React, { useEffect, useState } from "react";
// // import { useNavigate, useLocation } from "react-router-dom";
// // import LoginModal from "../../components/auth/LoginModal";
// // import { useApp } from "../../context/ApplicationContext";
// // import { useAuth } from "../../context/AuthContext";

// // const useRazorpayScript = () => {
// //   useEffect(() => {
// //     const existing = document.querySelector(
// //       'script[src="https://checkout.razorpay.com/v1/checkout.js"]'
// //     );
// //     if (existing) return;
// //     const script = document.createElement("script");
// //     script.src = "https://checkout.razorpay.com/v1/checkout.js";
// //     script.async = true;
// //     document.body.appendChild(script);
// //   }, []);
// // };

// // function formatMoney(n) {
// //   return new Intl.NumberFormat("en-IN").format(n);
// // }

// // export default function ReviewPay() {
// //   const navigate = useNavigate();
// //   const location = useLocation();
// //   const { travellers } = useApp();
// //   const { user } = useAuth();
// //   useRazorpayScript();

// //   // IMPORTANT: backend base URL (set VITE_API_LOCAL_URL in .env to http://localhost:3000)
// //   const API = import.meta.env.VITE_API_LOCAL_URL || "http://localhost:3000";

// //   const productId = location.state?.productId;

// //   const [product, setProduct] = useState(null);
// //   const [isProcessing, setIsProcessing] = useState(false);
// //   const [loading, setLoading] = useState(true);
// //   const [fetchError, setFetchError] = useState("");

// //   useEffect(() => {
// //     if (!productId) {
// //       setLoading(false);
// //       setProduct(null);
// //       setFetchError(
// //         "No product selected. Please go back and select a visa product."
// //       );
// //       return;
// //     }

// //     let mounted = true;
// //     setLoading(true);
// //     setFetchError("");

// //     fetch(`${API}/api/product/${encodeURIComponent(productId)}`)
// //       .then(async (res) => {
// //         const ct = res.headers.get("content-type") || "";
// //         const text = await res.text().catch(() => null);

// //         if (!res.ok) {
// //           throw new Error(`Product fetch failed (${res.status}) ${text || ""}`);
// //         }

// //         // guard: if server returned HTML (index.html or error page), bail with helpful message
// //         if (
// //           ct.includes("text/html") ||
// //           (typeof text === "string" && text.trim().startsWith("<"))
// //         ) {
// //           throw new Error(
// //             `Expected JSON but server returned HTML. Ensure backend at ${API} is running and the route /api/product/:id returns JSON. Server response preview: ${String(
// //               text
// //             ).slice(0, 300)}`
// //           );
// //         }

// //         // parse JSON from the text we already read
// //         try {
// //           return JSON.parse(text);
// //         } catch (err) {
// //           throw new Error("Failed to parse product JSON from server response.");
// //         }
// //       })
// //       .then((data) => {
// //         if (!mounted) return;
// //         setProduct(data);
// //       })
// //       .catch((err) => {
// //         console.error("ReviewPay: product fetch error:", err);
// //         if (mounted) setFetchError(String(err.message || err));
// //         setProduct(null);
// //       })
// //       .finally(() => mounted && setLoading(false));

// //     return () => (mounted = false);
// //   }, [productId, API]);

// //   if (loading) return <div className="p-4">Loading...</div>;

// //   if (!product) {
// //     return (
// //       <div className="p-8 max-w-lg mx-auto bg-white shadow-xl rounded-xl">
// //         <h2 className="text-xl font-semibold">No product selected</h2>
// //         <p className="text-sm text-gray-500 mt-2">
// //           Go back and select a visa product first.
// //         </p>

// //         {fetchError && (
// //           <div className="mt-4 text-sm text-red-600">
// //             {fetchError}
// //             <div className="mt-2 text-xs text-slate-500">
// //               If you opened this route directly, choose a visa in the options
// //               page.
// //             </div>
// //           </div>
// //         )}

// //         <div className="mt-4 flex gap-2">
// //           <button
// //             onClick={() => navigate(-1)}
// //             className="px-4 py-2 bg-gray-100 rounded"
// //           >
// //             Back
// //           </button>
// //           <button
// //             onClick={() => navigate("/visa")}
// //             className="px-4 py-2 bg-blue-600 text-white rounded"
// //           >
// //             Browse Visas
// //           </button>
// //         </div>
// //       </div>
// //     );
// //   }

// //   const qty = Math.max(1, travellers.length || 1);
// //   const total = (product.price || 0) * qty; // rupees
// //   const razorpayAmount = Math.round(total * 100); // paise

// //   const payNow = async () => {
// //     setIsProcessing(true);
// //     try {
// //       // server-side create-order endpoint — use API base
// //       const res = await fetch(`${API}/create-order`, {
// //         method: "POST",
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify({
// //           productId,
// //           qty,
// //         }),
// //       });

// //       if (!res.ok) {
// //         const txt = await res.text().catch(() => "");
// //         throw new Error(`Failed to create order (${res.status}) ${txt}`);
// //       }

// //       const order = await res.json();

// //       const options = {
// //         key:
// //           order.key ||
// //           import.meta.env.VITE_RAZORPAY_KEY_ID ,
// //         amount: order.amount, // paise returned by server
// //         currency: order.currency || "INR",
// //         name: "Chennai Visa",
// //         description: product.title || "Visa Payment",
// //         order_id: order.id,
// //         theme: { color: "#F37254" },
// //         handler: function (response) {
// //           // Post verification to server
// //           fetch(`${API}/verify-payment`, {
// //             method: "POST",
// //             headers: { "Content-Type": "application/json" },
// //             body: JSON.stringify({
// //               razorpay_order_id: response.razorpay_order_id,
// //               razorpay_payment_id: response.razorpay_payment_id,
// //               razorpay_signature: response.razorpay_signature,
// //               productId,
// //               qty,
// //             }),
// //           })
// //             .then((r) => r.json())
// //             .then((data) => {
// //               setIsProcessing(false);
// //               if (data.status === "ok") {
// //                 alert("Payment SuccessFull")
// //                 navigate("/", {
// //                   state: { paymentId: data.razorpay_payment_id },
// //                 });
// //               } else {
// //                 alert("Payment verification failed. Please contact support.");
// //               }
// //             })
// //             .catch((err) => {
// //               console.error("verify-payment error:", err);
// //               alert("Error verifying payment. Please contact support.");
// //             });
// //         },
// //         prefill: {
// //           name: user?.name || "",
// //           email: user?.email || "",
// //           contact: user?.phone || "",
// //         },
// //       };

// //       const rzp = new window.Razorpay(options);
// //       rzp.open();
// //     } catch (err) {
// //       console.error("Payment error", err);
// //       alert(String(err.message || err) || "Could not initiate payment.");
// //       setIsProcessing(false);
// //     }
// //   };

// //   return (
// //     <div className="p-4 max-w-lg mx-auto bg-white shadow-xl rounded-xl">
// //       <h2 className="text-2xl font-bold mb-4 text-gray-800">Final Payment</h2>
// //       <p className="text-xl font-semibold mb-6">
// //         Amount Due: ₹{formatMoney(total)}
// //       </p>

// //       <button
// //         onClick={payNow}
// //         disabled={isProcessing}
// //         className={`w-full ${
// //           isProcessing ? "bg-gray-400" : "bg-indigo-600 hover:bg-indigo-700"
// //         } text-white font-semibold py-3 px-4 rounded-lg shadow-md transition duration-300`}
// //       >
// //         {isProcessing ? "Processing..." : "Pay Now"}
// //       </button>
// //     </div>
// //   );
// // }

// // src/pages/ReviewPay.jsx
// import React, { useEffect, useState } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import LoginModal from "../../components/auth/LoginModal";
// import { useApp } from "../../context/ApplicationContext";
// import { useAuth } from "../../context/AuthContext";

// /* load razorpay script if not present */
// const useRazorpayScript = () => {
//   useEffect(() => {
//     const existing = document.querySelector(
//       'script[src="https://checkout.razorpay.com/v1/checkout.js"]'
//     );
//     if (existing) return;
//     const script = document.createElement("script");
//     script.src = "https://checkout.razorpay.com/v1/checkout.js";
//     script.async = true;
//     document.body.appendChild(script);
//     return () => {
//       // don't remove script on unmount - keep it for later use
//     };
//   }, []);
// };

// function formatMoney(n) {
//   return new Intl.NumberFormat("en-IN").format(n || 0);
// }

// export default function ReviewPay() {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { travellers: appTravellers = [] } = useApp();
//   const { user } = useAuth();
//   useRazorpayScript();

//   const API = import.meta.env.VITE_API_LOCAL_URL || "http://localhost:3000";

//   const productId = location.state?.productId;
//   const [product, setProduct] = useState(null);
//   const [isProcessing, setIsProcessing] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [fetchError, setFetchError] = useState("");
//   const [qty, setQty] = useState(0); // computed quantity

//   // fetch product (same guard as before)
//   useEffect(() => {
//     if (!productId) {
//       setLoading(false);
//       setProduct(null);
//       setFetchError(
//         "No product selected. Please go back and select a visa product."
//       );
//       return;
//     }

//     let mounted = true;
//     setLoading(true);
//     setFetchError("");

//     fetch(`${API}/api/product/${encodeURIComponent(productId)}`)
//       .then(async (res) => {
//         const ct = res.headers.get("content-type") || "";
//         const text = await res.text().catch(() => null);
//         if (!res.ok) {
//           throw new Error(`Product fetch failed (${res.status}) ${text || ""}`);
//         }

//         if (
//           ct.includes("text/html") ||
//           (typeof text === "string" && text.trim().startsWith("<"))
//         ) {
//           throw new Error(
//             `Expected JSON but server returned HTML. Ensure backend is running and /api/product/:id returns JSON. Server preview: ${String(
//               text
//             ).slice(0, 300)}`
//           );
//         }

//         try {
//           return JSON.parse(text);
//         } catch (err) {
//           throw new Error("Failed to parse product JSON from server response.");
//         }
//       })
//       .then((data) => {
//         if (!mounted) return;
//         setProduct(data);
//       })
//       .catch((err) => {
//         console.error("ReviewPay: product fetch error:", err);
//         if (mounted) setFetchError(String(err.message || err));
//         setProduct(null);
//       })
//       .finally(() => mounted && setLoading(false));

//     return () => (mounted = false);
//   }, [productId, API]);

//   // compute quantity (robust): prefer appTravellers, then localStorage, then backend
//   useEffect(() => {
//     async function computeQty() {
//       // 1) prefer appTravellers (set by ApplyVisa if you persist)
//       if (Array.isArray(appTravellers) && appTravellers.length > 0) {
//         setQty(appTravellers.length);
//         return;
//       }

//       // 2) try to read travellers from localStorage (if ApplyVisa saved them)
//       try {
//         const raw = localStorage.getItem("travellers");
//         if (raw) {
//           const parsed = JSON.parse(raw);
//           if (Array.isArray(parsed) && parsed.length > 0) {
//             setQty(parsed.length);
//             return;
//           }
//         }
//       } catch (e) {
//         // ignore parse errors
//       }

//       // 3) try to read a stored totalPrice and derive qty if product price available
//       try {
//         const totalPriceRaw = localStorage.getItem("totalPrice");
//         if (totalPriceRaw && product?.price) {
//           const totalNum = Number(totalPriceRaw);
//           const priceEach = Number(product.price || 0);
//           if (priceEach > 0 && !Number.isNaN(totalNum)) {
//             const derivedQty = Math.max(1, Math.round(totalNum / priceEach));
//             setQty(derivedQty);
//             return;
//           }
//         }
//       } catch (e) {
//         // ignore
//       }

//       // 4) fallback: call backend getTravellersToday with parentEmail from localStorage
//       try {
//         const stored = localStorage.getItem("userSession");
//         const parentEmail = stored ? JSON.parse(stored)?.email || null : null;
//         if (parentEmail) {
//           const res = await fetch(
//             `${API}/getTravellersToday?parentEmail=${encodeURIComponent(
//               parentEmail
//             )}`
//           );
//           if (res.ok) {
//             const data = await res.json();
//             const arr = Array.isArray(data.travellers) ? data.travellers : [];
//             setQty(arr.length || 1);
//             // optionally save to localStorage for future
//             try {
//               localStorage.setItem("travellers", JSON.stringify(arr));
//             } catch {}
//             return;
//           }
//         }
//       } catch (err) {
//         console.warn("Could not fetch travellers from backend fallback:", err);
//       }

//       // final fallback
//       setQty(1);
//     }

//     computeQty();
//     // recompute when appTravellers or product changes
//   }, [appTravellers, product, API]);

//   if (loading) return <div className="p-4">Loading...</div>;

//   if (!product) {
//     return (
//       <div className="p-8 max-w-lg mx-auto bg-white shadow-xl rounded-xl">
//         <h2 className="text-xl font-semibold">No product selected</h2>
//         <p className="text-sm text-gray-500 mt-2">
//           Go back and select a visa product first.
//         </p>

//         {fetchError && (
//           <div className="mt-4 text-sm text-red-600">
//             {fetchError}
//             <div className="mt-2 text-xs text-slate-500">
//               If you opened this route directly, choose a visa in the options
//               page.
//             </div>
//           </div>
//         )}

//         <div className="mt-4 flex gap-2">
//           <button
//             onClick={() => navigate(-1)}
//             className="px-4 py-2 bg-gray-100 rounded"
//           >
//             Back
//           </button>
//           <button
//             onClick={() => navigate("/visa")}
//             className="px-4 py-2 bg-blue-600 text-white rounded"
//           >
//             Browse Visas
//           </button>
//         </div>
//       </div>
//     );
//   }

//   const qtyToUse = Math.max(1, Number(qty || 0));
//   const total = (Number(product.price || 0) || 0) * qtyToUse;
//   const razorpayAmount = Math.round(total * 100); // paise

//   const payNow = async () => {
//     setIsProcessing(true);
//     try {
//       const res = await fetch(`${API}/create-order`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ productId, qty: qtyToUse }),
//       });

//       if (!res.ok) {
//         const txt = await res.text().catch(() => "");
//         throw new Error(`Failed to create order (${res.status}) ${txt}`);
//       }

//       const order = await res.json();

//       // Build Razorpay options from server response
//       const options = {
//         key: order.key || import.meta.env.VITE_RAZORPAY_KEY_ID || "",
//         amount: order.amount || razorpayAmount,
//         currency: order.currency || "INR",
//         name: "Chennai Visa",
//         description: product.title || "Visa Payment",
//         order_id: order.id,
//         theme: { color: "#F37254" },
//         prefill: {
//           name: user?.name || "",
//           email: user?.email || "",
//           contact: user?.phone || "",
//         },
//         // called when user completes payment successfully (client receives payment ids)
//         handler: function (response) {
//           // send verification to server
//           fetch(`${API}/verify-payment`, {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({
//               razorpay_order_id: response.razorpay_order_id,
//               razorpay_payment_id: response.razorpay_payment_id,
//               razorpay_signature: response.razorpay_signature,
//               productId,
//               qty: qtyToUse,
//             }),
//           })
//             .then((r) => r.json())
//             .then((data) => {
//               setIsProcessing(false);
//               if (data.status === "ok") {
//                 alert("Payment successful.");
//                 navigate("/", {
//                   state: { paymentId: data.razorpay_payment_id },
//                 });
//               } else {
//                 alert("Payment verification failed. Please contact support.");
//               }
//             })
//             .catch((err) => {
//               console.error("verify-payment error:", err);
//               setIsProcessing(false);
//               alert("Error verifying payment. Please contact support.");
//             });
//         },
//         // handle when the user closes the modal without paying
//         modal: {
//           ondismiss: function () {
//             setIsProcessing(false);
//             // optional: notify user or re-enable UI
//             // console.log("Checkout dismissed");
//             alert("Payment cancelled. You can try again.");
//           },
//         },
//       };

//       // open Razorpay
//       const rzp = new window.Razorpay(options);

//       // attach failure handler
//       rzp.on &&
//         rzp.on("payment.failed", function (response) {
//           setIsProcessing(false);
//           console.error("Razorpay payment failed:", response);
//           alert("Payment failed. Please try again or contact support.");
//         });

//       rzp.open();
//     } catch (err) {
//       console.error("Payment error", err);
//       alert(String(err.message || err) || "Could not initiate payment.");
//       setIsProcessing(false);
//     }
//   };

//   return (
//     <div className="p-4 max-w-lg mx-auto bg-white shadow-xl rounded-xl">
//       <h2 className="text-2xl font-bold mb-4 text-gray-800">Final Payment</h2>
//       <p className="text-sm text-gray-600 mb-1">
//         Product: {product.title || product.name}
//       </p>
//       <p className="text-xl font-semibold mb-6">
//         Amount Due: ₹{formatMoney(total)}
//       </p>

//       <div className="mb-4 text-sm text-gray-600">
//         <div>Quantity: {qtyToUse}</div>
//         <div>Unit price: ₹{formatMoney(product.price || 0)}</div>
//       </div>

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
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import LoginModal from "../../components/auth/LoginModal";
import { useApp } from "../../context/ApplicationContext";
import { useAuth } from "../../context/AuthContext";
/* load razorpay script if not present */
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
    // keep script loaded for later use
  }, []);
};

function formatMoney(n) {
  return new Intl.NumberFormat("en-IN").format(n || 0);
}

export default function ReviewPay() {
  const navigate = useNavigate();
  const location = useLocation();
  const { travellers: appTravellers = [], clearTravellers } = useApp();
  const { user } = useAuth();
  useRazorpayScript();

  const API = import.meta.env.VITE_API_LOCAL_URL || "http://localhost:3000";

  const productId = location.state?.productId;
  const [product, setProduct] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState("");
  const [qty, setQty] = useState(0); // computed quantity
  const [showLogin, setShowLogin] = useState(false);

  // fetch product (guard and defensive parsing)
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

        if (
          ct.includes("text/html") ||
          (typeof text === "string" && text.trim().startsWith("<"))
        ) {
          throw new Error(
            `Expected JSON but server returned HTML. Ensure backend is running and /api/product/:id returns JSON. Server preview: ${String(
              text
            ).slice(0, 300)}`
          );
        }

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

  // compute quantity (robust): prefer appTravellers, then localStorage, then backend fallback
  useEffect(() => {
    async function computeQty() {
      // 1) prefer appTravellers (set by ApplyVisa if you persist)
      if (Array.isArray(appTravellers) && appTravellers.length > 0) {
        setQty(appTravellers.length);
        return;
      }

      // 2) try to read travellers from localStorage (if ApplyVisa saved them)
      try {
        const raw = localStorage.getItem("travellers");
        if (raw) {
          const parsed = JSON.parse(raw);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setQty(parsed.length);
            return;
          }
        }
      } catch (e) {
        // ignore parse errors
      }

      // 3) try to read a stored totalPrice and derive qty if product price available
      try {
        const totalPriceRaw = localStorage.getItem("totalPrice");
        if (totalPriceRaw && product?.price) {
          const totalNum = Number(totalPriceRaw);
          const priceEach = Number(product.price || 0);
          if (priceEach > 0 && !Number.isNaN(totalNum)) {
            const derivedQty = Math.max(1, Math.round(totalNum / priceEach));
            setQty(derivedQty);
            return;
          }
        }
      } catch (e) {
        // ignore
      }

      // 4) fallback: call backend getTravellersToday with parentEmail from localStorage
      try {
        const stored = localStorage.getItem("userSession");
        const parentEmail = stored ? JSON.parse(stored)?.email || null : null;
        if (parentEmail) {
          const res = await fetch(
            `${API}/getTravellersToday?parentEmail=${encodeURIComponent(
              parentEmail
            )}`
          );
          if (res.ok) {
            const data = await res.json();
            const arr = Array.isArray(data.travellers) ? data.travellers : [];
            setQty(arr.length || 1);
            try {
              localStorage.setItem("travellers", JSON.stringify(arr));
            } catch {}
            return;
          }
        }
      } catch (err) {
        console.warn("Could not fetch travellers from backend fallback:", err);
      }

      // final fallback
      setQty(1);
    }

    computeQty();
  }, [appTravellers, product, API]);

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

  const qtyToUse = Math.max(1, Number(qty || 0));
  const total = (Number(product.price || 0) || 0) * qtyToUse;
  const razorpayAmount = Math.round(total * 100); // paise

  const payNow = async () => {
    if (!user) {
      // not logged in — show login modal or navigate to login
      setShowLogin(true);
      return;
    }

    setIsProcessing(true);
    let order = null;

    try {
      // create order on server - pass qty & productId so server calculates amount reliably
      const res = await fetch(`${API}/create-order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId, qty: qtyToUse }),
      });

      if (!res.ok) {
        const txt = await res.text().catch(() => "");
        throw new Error(`Failed to create order (${res.status}) ${txt}`);
      }

      order = await res.json();

      // Build Razorpay options from server response
      const options = {
        key: order.key || import.meta.env.VITE_RAZORPAY_KEY_ID || "", // server may return key
        amount: order.amount || razorpayAmount, // paise (server should return paise)
        currency: order.currency || "INR",
        name: "Chennai Visa",
        description: product.title || "Visa Payment",
        order_id: order.id,
        theme: { color: "#F37254" },
        prefill: {
          name: user?.name || "",
          email: user?.email || "",
          contact: user?.phone || "",
        },
        // called when user completes payment successfully (client receives payment ids)
        handler: function (response) {
          // send verification to server
          fetch(`${API}/verify-payment`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              productId,
              qty: qtyToUse,
            }),
          })
            .then((r) => r.json())
            .then((data) => {
              setIsProcessing(false);
              // server must validate signature and amount and respond with canonical result
              if (data.status === "ok") {
                // prepare payload to pass to success page
                const payload = {
                  orderId:
                    response.razorpay_order_id || order?.id || data.orderId,
                  paymentId:
                    response.razorpay_payment_id || data.razorpay_payment_id,
                  product: product,
                  qty: qtyToUse,
                  amount: total, // rupees
                  customer: {
                    name: user?.name || "",
                    email: user?.email || "",
                  },
                  createdAt: data.createdAt || new Date().toISOString(),
                };
                clearTravellers();
                // navigate to payment success page with payload
                navigate("/payment-success", { state: payload });
              } else {
                // verification failed
                alert(
                  "Payment verification failed on server. Please contact support or try again."
                );
              }
            })
            .catch((err) => {
              console.error("verify-payment error:", err);
              setIsProcessing(false);
              alert(
                "Error verifying payment. Please contact support if the amount was deducted."
              );
            });
        },
        // handle when the user closes the modal without paying
        modal: {
          ondismiss: function () {
            setIsProcessing(false);
            // Inform user cleanly
            alert("Payment cancelled. You can retry or contact support.");
          },
        },
      };

      // open Razorpay
      const rzp = new window.Razorpay(options);

      // attach failure handler
      if (rzp.on) {
        rzp.on("payment.failed", function (response) {
          setIsProcessing(false);
          console.error("Razorpay payment failed:", response);
          alert("Payment failed. Please try again or contact support.");
        });
      }

      rzp.open();
    } catch (err) {
      console.error("Payment error", err);
      alert(String(err.message || err) || "Could not initiate payment.");
      setIsProcessing(false);
    }
  };

  return (
   <div className="w-full bg-white px-12 py-12">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Final Payment</h2>
      <p className="text-sm text-gray-600 mb-1">
        Product: {product.title || product.name}
      </p>
      <p className="text-xl font-semibold mb-6">
        Amount Due: ₹{formatMoney(total)}
      </p>

      <div className="mb-4 text-sm text-gray-600">
        <div>Quantity: {qtyToUse}</div>
        <div>Unit price: ₹{formatMoney(product.price || 0)}</div>
      </div>

      <button
        onClick={payNow}
        disabled={isProcessing}
        className={`w-full ${
          isProcessing ? "bg-gray-400" : "bg-indigo-600 hover:bg-indigo-700"
        } text-white font-semibold py-3 px-4 rounded-lg shadow-md transition duration-300`}
      >
        {isProcessing ? "Processing..." : "Pay Now"}
      </button>

      <LoginModal isOpen={showLogin} onClose={() => setShowLogin(false)} />
    </div>
  );
}
