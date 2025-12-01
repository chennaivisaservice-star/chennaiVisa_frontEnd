// src/pages/ApplyVisa.jsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useParams, useNavigate, Link, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useApp } from "../../context/ApplicationContext";
import LoginModal from "../../components/auth/LoginModal";
import {
  Calendar,
  Plus,
  ArrowLeft,
  ArrowRight,
  AlertCircle,
} from "lucide-react";
import { visaProducts } from "../../data/visaProducts";

/* helpers */
function formatMoney(n) {
  return new Intl.NumberFormat("en-IN").format(n);
}

export default function ApplyVisa() {
  const { slug, purpose } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const { user } = useAuth();
  const {
    dates,
    travellers: appTravellers = [],
    visaMeta,
    setDates,
    removeTraveller,
  } = useApp();

  const [localTravellers, setLocalTravellers] = useState(appTravellers || []);
  const [loadingTravellers, setLoadingTravellers] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  const productId = location.state?.productId;
  const navState = productId ? { state: { productId } } : {};

  // product state & loading
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loadingProduct, setLoadingProduct] = useState(false);

  const API = import.meta.env.VITE_API_LOCAL_URL || "http://localhost:3000";

  // --- load product: try local visaProducts first, then fallback to fetch by productId ---
  useEffect(() => {
    let mounted = true;
    async function loadProduct() {
      setLoadingProduct(true);

      // Try to find product in local visaProducts (fast path)
      try {
        const allForCountry = visaProducts?.[slug] || {};
        const baseList = allForCountry?.[purpose] || [];
        let productFromStatic = null;
        if (productId) {
          productFromStatic = baseList.find(
            (p) => String(p.id) === String(productId)
          );
        } else {
          // If no productId, pick first product for the purpose (graceful fallback)
          productFromStatic = baseList[0] || null;
        }

        if (productFromStatic) {
          if (mounted) setSelectedProduct(productFromStatic);
          setLoadingProduct(false);
          return;
        }

        // If not found in static data and we have a productId, fetch from API
        if (productId) {
          const res = await fetch(
            `${API}/api/product/${encodeURIComponent(productId)}`
          );
          if (!res.ok) {
            throw new Error("Failed to fetch product");
          }
          const prod = await res.json();
          if (mounted) setSelectedProduct(prod);
        } else {
          // No productId and nothing in static data
          if (mounted) setSelectedProduct(null);
        }
      } catch (err) {
        console.error("Failed fetching product", err);
        if (mounted) setSelectedProduct(null);
      } finally {
        if (mounted) setLoadingProduct(false);
      }
    }

    loadProduct();
    return () => {
      mounted = false;
    };
  }, [productId, slug, purpose, API]);

  // keep local travellers in sync with appTravellers (if app updates)
  useEffect(() => {
    setLocalTravellers(appTravellers || []);
  }, [appTravellers]);
  const handleAddTraveler = () => {
    if (!dates.start || !dates.end) {
      alert("Please fill out your travelling dates");
      return;
    }
    navigate(`/visa/${slug}/${purpose}/traveller/new`, navState);
  };
  
  // calculated values
  const baseVisaPrice = Number(selectedProduct?.price || 0);
  const currency = selectedProduct?.currency || "₹";
  const totalPrice = useMemo(
    () => localTravellers.length * baseVisaPrice,
    [localTravellers.length, baseVisaPrice]
  );

  // refs for date inputs (kept for parity)
  const startRef = useRef(null);
  const endRef = useRef(null);

  // load travellers from your backend (getTravellersToday)

  const rmvTraveller = (idx) => {
    removeTraveller(idx);
  };

  const handleNext = async () => {
    // console.log(JSON.stringify(localTravellers));
    if (!user) {
      setShowLogin(true);
      return;
    }
    if (!localTravellers.length) return;

    try {
      const res = await fetch(`${API}/api/addTraveller`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: localTravellers }),
      });

      if (!res.ok) {
        const txt = await res.text();
        throw new Error(txt || "Failed to save traveller");
      }

      navigate(`/visa/${slug}/${purpose}/review`, navState);
    } catch (err) {
      console.log(err);
      return;
    }
  };

  // Loading / error states
  if (loadingProduct) {
    return (
      <div className="min-h-[40vh] flex items-center justify-center">
        Loading…
      </div>
    );
  }

  if (!selectedProduct) {
    return (
      <div className="max-w-5xl mx-auto p-8 text-center">
        <h2 className="text-xl font-semibold text-red-600">
          Error: Visa product not found or selected.
        </h2>
        <button
          onClick={() => navigate(`/visa/${slug}/${purpose}`)}
          className="mt-4 px-4 py-2 bg-gray-200 rounded-lg text-gray-700 hover:bg-gray-300"
        >
          Go Back to Visa Options
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-10">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-600 mb-4 flex flex-wrap gap-1">
        <Link to="/" className="hover:text-blue-600">
          Home
        </Link>
        <span>/</span>
        <Link to={`/visa/${slug}`} className="hover:text-blue-600 capitalize">
          {slug}
        </Link>
        <span>/</span>
        <span className="text-gray-800 font-medium capitalize">{purpose}</span>
      </nav>

      {/* Header progress */}
      <div className="flex items-center gap-6 mb-6 text-sm">
        <div className="flex items-center gap-2 font-semibold text-blue-900">
          <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-blue-100">
            1
          </span>
          Add Traveller Details
        </div>
        <div className="h-px flex-1 bg-gray-200" />
        <div className="flex items-center gap-2 text-gray-400">
          <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-gray-100">
            2
          </span>
          Review & Payment
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">
        {/* Left */}
        <div className="space-y-6">
          {/* Select travel dates */}
          <section className="rounded-2xl border border-gray-200 bg-white p-4 sm:p-5">
            <h3 className="font-medium text-gray-900 mb-2">
              Select Travel Dates
            </h3>

            <div className="flex items-center gap-2 rounded-xl border border-gray-200 px-3 py-2">
              <Calendar className="w-5 h-5 text-blue-500" />
              <input
                ref={startRef}
                type="date"
                value={dates?.start || ""}
                onChange={(e) => setDates({ ...dates, start: e.target.value })}
                className="bg-transparent outline-none px-2 py-2 text-gray-700"
              />
              <span className="text-gray-400">—</span>
              <input
                ref={endRef}
                type="date"
                value={dates?.end || ""}
                onChange={(e) => setDates({ ...dates, end: e.target.value })}
                className="bg-transparent outline-none px-2 py-2 text-gray-700"
              />
            </div>

            <div className="mt-3 text-xs text-blue-700 bg-blue-50 border border-blue-100 rounded-lg px-3 py-2 inline-flex items-center gap-2">
              <AlertCircle className="w-4 h-4" />
              Unsure about your dates? Share tentative dates & our team will
              help you plan accordingly.
            </div>

            <div className="mt-2 text-xs">
              <span className="px-2 py-1 rounded-full bg-purple-100 text-purple-700">
                Travel Period:{" "}
                {dates?.start && dates?.end
                  ? `${dates.start} → ${dates.end}`
                  : "Not selected"}
              </span>
            </div>
          </section>

          {/* Who’s travelling */}
          <section className="rounded-2xl border border-gray-200 bg-white p-4 sm:p-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-medium text-gray-900">
                Who’s travelling?{" "}
                <span className="ml-2 text-sm text-blue-600">
                  ({currency}
                  {formatMoney(baseVisaPrice)} per applicant)
                </span>
              </h3>

              <div className="flex gap-2">
                {/* <button
                  onClick={loadTravellers}
                  className="px-4 py-2 rounded-full border bg-gray-100 text-gray-700 hover:bg-gray-200"
                  disabled={loadingTravellers}
                >
                  {loadingTravellers ? "Loading..." : "Load Travellers"}
                </button> */}

                <button
                  onClick={handleAddTraveler}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-900 text-white hover:bg-blue-800"
                >
                  <Plus className="w-4 h-4" /> Add New Traveler
                </button>
              </div>
            </div>

            {localTravellers.length === 0 ? (
              <div className="rounded-xl border border-dashed border-gray-300 text-center p-10">
                <p className="text-gray-600 font-medium">
                  No Travellers Available!
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  After adding a traveller, you can proceed to the next step.
                </p>
                <button
                  className="mt-4 px-5 py-2 rounded-full bg-blue-900 text-white hover:bg-blue-800"
                  onClick={handleAddTraveler}
                >
                  Add Your First Traveler
                </button>
              </div>
            ) : (
              <ul className="divide-y">
                {localTravellers.map((t, idx) => (
                  <>
                    <button
                      onClick={() => rmvTraveller(t.id)}
                      className="text-red-500 font-bold mr-3"
                    >
                      X
                    </button>
                    <li
                      key={t.id || idx}
                      className="py-3 flex items-center justify-between"
                    >
                      <div>
                        <div className="font-medium text-gray-900">
                          {t.firstName} {t.lastName}
                        </div>
                        <div className="text-xs text-gray-500">
                          {t.gender} • {String(t.dob).substring(0, 10)} •{" "}
                          {t.passportNumber}
                        </div>
                      </div>
                      <div className="text-right text-sm text-gray-500">
                        {t.email}
                      </div>
                    </li>
                  </>
                ))}
              </ul>
            )}
          </section>

          {/* Footer */}
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate(`/visa/${slug}/${purpose}`)}
              className="inline-flex items-center gap-2 rounded-full border px-5 py-2.5 bg-white text-slate-700 hover:bg-slate-50"
            >
              <ArrowLeft className="w-4 h-4" /> Back
            </button>

            <button
              onClick={handleNext}
              disabled={localTravellers.length === 0}
              className={`inline-flex items-center gap-2 rounded-full px-6 py-2.5 ${
                localTravellers.length
                  ? "bg-slate-900 text-white hover:bg-slate-800"
                  : "bg-slate-200 text-slate-500 cursor-not-allowed"
              }`}
            >
              Next Step <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Right summary */}
        <aside className="rounded-2xl border border-gray-200 bg-white p-4 sm:p-5 h-max">
          <h4 className="text-sm font-semibold text-gray-900 mb-3">Summary</h4>

          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <span className="inline-block h-5 w-5 rounded bg-gradient-to-r from-pink-500 to-yellow-400" />
              <div className="font-medium">
                {selectedProduct?.title ||
                  visaMeta?.title ||
                  `${slug} ${purpose} Visa`}
              </div>
            </div>

            {selectedProduct?.deliveryDate && (
              <div className="text-blue-700 bg-blue-50 px-2 py-1 rounded">
                Get your visa by: {selectedProduct.deliveryDate}
              </div>
            )}

            {selectedProduct?.stayDays && (
              <div className="text-purple-700 bg-purple-50 px-2 py-1 rounded">
                Max Stay: {selectedProduct.stayDays} days
              </div>
            )}

            <div className="pt-2 border-t mt-2 flex justify-between">
              <div>
                Visa Fee ({localTravellers.length}{" "}
                {localTravellers.length === 1 ? "Applicant" : "Applicants"})
              </div>
              <span className="font-semibold">
                {currency}
                {formatMoney(totalPrice)}
              </span>
            </div>

            <div className="flex justify-between">
              <div>Service Fee</div>
              <span className="font-medium">{currency}0</span>
            </div>

            <div className="pt-2 border-t mt-2 flex justify-between text-base font-bold text-slate-900">
              <div>Total Amount</div>
              <span>
                {currency}
                {formatMoney(totalPrice)}
              </span>
            </div>
          </div>
        </aside>
      </div>

      <LoginModal isOpen={showLogin} onClose={() => setShowLogin(false)} />
    </div>
  );
}
