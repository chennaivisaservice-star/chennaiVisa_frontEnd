// import React, { useMemo, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { countries } from "../../data/countries";

// const PURPOSE_LABELS = {
//   tourist: "Tourist",
//   business: "Business",
//   transit: "Transit",
//   student: "Student",
//   work: "Work",
// };

// export default function VisaDetail() {
//   const { slug } = useParams();
//   const navigate = useNavigate();

//   const country = useMemo(() => countries.find((c) => c.slug === slug), [slug]);

//   if (!country) {
//     return (
//       <div className="min-h-screen flex items-center justify-center text-slate-600">
//         <p>Country not found.</p>
//       </div>
//     );
//   }

//   const purposeMap = useMemo(() => {
//     if (country.designs && Object.keys(country.designs).length > 0) return country.designs;
//     return { tourist: country.design };
//   }, [country]);

//   const availablePurposes = Object.keys(purposeMap);
//   const [purpose, setPurpose] = useState(availablePurposes[0]);
//   const imgSrc = purposeMap[purpose] || "/visa-tourist-illustration.png";

//   const onSelect = () => navigate(`/visa/${country.slug}/${purpose}`);

//   return (
//     // Top padding to clear fixed navbar
//     <div className="min-h-screen bg-gray-50 pt-24 md:pt-28 pb-10">
//       {/* Shared responsive container so nothing touches the edges on mobile */}
//       <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Breadcrumb */}
//         <nav className="mb-6 flex items-center gap-2 text-sm">
//           <button
//             onClick={() => navigate("/")}
//             className="text-gray-500 hover:text-gray-700 transition-colors"
//           >
//             Home
//           </button>
//           <span className="text-gray-400">›</span>
//           <span className="text-gray-700 font-medium">{country.name}</span>
//         </nav>

//         {/* Title */}
//         <div>
//           <h2 className="text-2xl md:text-[28px] font-semibold text-gray-900 mb-1">
//             {country.name} Visa Application
//           </h2>
//           <p className="text-gray-500 text-sm">Select the Purpose of your visit</p>
//           {(country.price || country.date) && (
//             <p className="text-gray-400 text-sm mt-1">
//               {country.price || ""} {country.price && country.date ? "• " : ""}
//               {country.date || ""}
//             </p>
//           )}
//         </div>

//         {/* Purpose pills */}
//         {availablePurposes.length > 1 && (
//           <div className="mt-4 flex flex-wrap gap-2">
//             {availablePurposes.map((p) => (
//               <button
//                 key={p}
//                 onClick={() => setPurpose(p)}
//                 className={`px-4 py-2 rounded-full text-sm font-medium border transition
//                   ${purpose === p
//                     ? "bg-gray-900 text-white border-gray-900"
//                     : "bg-white text-gray-700 border-gray-200 hover:bg-gray-100"}`}
//               >
//                 {PURPOSE_LABELS[p] || p[0].toUpperCase() + p.slice(1)}
//               </button>
//             ))}
//           </div>
//         )}

//         {/* Card */}
//         <div
//           className="
//             mt-6 bg-white rounded-2xl border border-gray-200 shadow-sm
//             p-4 sm:p-6 md:p-8 lg:p-10
//             transition hover:border-gray-300 hover:shadow-lg
//             focus-within:border-gray-300 focus-within:shadow-lg
//             flex flex-col items-center justify-center text-center
//             min-h-[360px] sm:min-h-[420px] md:min-h-[60vh]
//           "
//         >
//           {/* Image */}
//           <img
//             src={imgSrc}
//             alt={`${country.name} ${purpose} Illustration`}
//             className="max-h-[320px] sm:max-h-[340px] md:max-h-[360px] w-auto object-contain mx-auto"
//             draggable={false}
//           />

//           <div className="mt-6">
//             <h3 className="text-lg sm:text-xl font-medium text-gray-900 mb-2">
//               {PURPOSE_LABELS[purpose] || purpose[0].toUpperCase() + purpose.slice(1)}
//             </h3>
//             <p className="text-gray-500 mb-5 text-sm sm:text-base">
//               {purpose === "tourist"
//                 ? "For leisure, sightseeing, or personal trips."
//                 : purpose === "business"
//                 ? "For meetings, conferences, or short-term business visits."
//                 : purpose === "transit"
//                 ? "For short stays while transiting to another destination."
//                 : purpose === "student"
//                 ? "For academic study and related activities."
//                 : purpose === "work"
//                 ? "For employment or long-term work assignments."
//                 : "Select to proceed with this visa purpose."}
//             </p>

//             <button
//               onClick={onSelect}
//               className="inline-flex items-center justify-center gap-2
//                          rounded-full bg-[#0B3B88] px-6 py-2 text-white font-medium
//                          hover:bg-[#092e6a] transition
//                          focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0B3B88]"
//             >
//               Select
//               <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/15">
//                 →
//               </span>
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// src/pages/VisaDetail.jsx
import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";

const PURPOSE_LABELS = {
  tourist: "Tourist",
  business: "Business",
  transit: "Transit",
  student: "Student",
  work: "Work",
};

export default function VisaDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [purpose, setPurpose] = useState(null);
  const [fetchError, setFetchError] = useState("");

  // API base from env or fallback
  const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:3000";

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    setFetchError("");
    setCountry(null);

    (async () => {
      try {
        const res = await fetch(
          `${API_BASE}/api/countries/${encodeURIComponent(slug)}`,
          {
            headers: { Accept: "application/json" },
          }
        );

        // Non-OK status -> read body and set meaningful error
        if (!res.ok) {
          const ct = res.headers.get("content-type") || "";
          const body = ct.includes("application/json")
            ? await res.json().catch(() => null)
            : await res.text().catch(() => null);
          console.error(
            `GET /api/countries/${slug} returned ${res.status}`,
            body
          );
          if (mounted) setFetchError(`Server returned ${res.status}`);
          return;
        }

        // Ensure JSON response
        const contentType = res.headers.get("content-type") || "";
        if (!contentType.includes("application/json")) {
          const text = await res.text().catch(() => "<no body>");
          console.error(
            "GET /api/countries/:slug returned non-JSON:",
            contentType,
            text.slice(0, 1000)
          );
          if (mounted)
            setFetchError("Server returned non-JSON response (see console)");
          return;
        }

        const data = await res.json();
        if (!mounted) return;

        // data should be a single country object
        setCountry(data || null);

        // Pick default purpose
        const defaultPurpose =
          (data?.availablePurposes && data.availablePurposes[0]) || "tourist";
        setPurpose(defaultPurpose);
      } catch (err) {
        console.error("Failed to fetch country:", err);
        if (mounted) setFetchError(err.message || "Network error");
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => (mounted = false);
  }, [slug, API_BASE]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-28">
        Loading…
      </div>
    );
  }

  if (fetchError) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-28">
        <div className="text-center">
          <div className="text-red-600 font-semibold mb-2">Error</div>
          <div className="text-sm text-gray-600 mb-4">{fetchError}</div>
          <div className="text-xs text-gray-500">
            Make sure backend is running at {API_BASE} and route{" "}
            <code>/api/countries/{slug}</code> exists.
          </div>
        </div>
      </div>
    );
  }

  if (!country) {
    return (
      <div className="min-h-screen flex items-center justify-center text-slate-600">
        <p>Country not found.</p>
      </div>
    );
  }

  const availablePurposes = country.availablePurposes || ["tourist"];

  const onSelect = () => {
    navigate(`/visa/${country.slug}/${purpose}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24 md:pt-28 pb-10 mt-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="mb-6 flex items-center gap-2 text-sm">
          <Link
            to="/"
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            Home
          </Link>
          <span className="text-gray-400">›</span>
          <span className="text-gray-700 font-medium">{country.name}</span>
        </nav>

        <div>
          <h2 className="text-2xl md:text-[28px] font-semibold text-gray-900 mb-1">
            {country.name} Visa Application
          </h2>
          <p className="text-gray-500 text-sm">
            Select the Purpose of your visit
          </p>
          {(country.price || country.date) && (
            <p className="text-gray-400 text-sm mt-1">
              {country.price || ""} {country.price && country.date ? "• " : ""}
              {country.date || ""}
            </p>
          )}
        </div>

        {availablePurposes.length > 1 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {availablePurposes.map((p) => (
              <button
                key={p}
                onClick={() => setPurpose(p)}
                className={`px-4 py-2 rounded-full text-sm font-medium border transition ${
                  purpose === p
                    ? "bg-gray-900 text-white border-gray-900"
                    : "bg-white text-gray-700 border-gray-200 hover:bg-gray-100"
                }`}
              >
                {PURPOSE_LABELS[p] || p[0].toUpperCase() + p.slice(1)}
              </button>
            ))}
          </div>
        )}

        <div className="mt-6 bg-white rounded-2xl border border-gray-200 shadow-sm p-6 text-center">
          <img
            src={country.design || country.image}
            alt={country.name}
            className="mx-auto max-h-[320px] object-contain"
            draggable={false}
          />
          <div className="mt-6">
            <h3 className="text-lg sm:text-xl font-medium text-gray-900 mb-2">
              {PURPOSE_LABELS[purpose] || purpose}
            </h3>
            <p className="text-gray-500 mb-5 text-sm sm:text-base">
              {country.description ||
                "Select to proceed with this visa purpose."}
            </p>
            <button
              onClick={onSelect}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0B3B88] px-6 py-2 text-white font-medium hover:bg-[#092e6a] transition"
            >
              Select
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/15">
                →
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
