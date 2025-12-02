// import React, { useMemo, useState } from "react";
// import { useNavigate, useParams, Link } from "react-router-dom";
// import { visaProducts } from "../../data/visaProducts";
// import { ChevronDown, Filter, ListOrdered, CheckCircle2, Sun, ArrowLeft } from "lucide-react";

// const SORTS = {
//     priceAsc: { label: "Price low to high", fn: (a, b) => a.price - b.price },
//     earliest: { label: "Earliest delivery", fn: (a, b) => a.processingDays - b.processingDays },
// };

// export default function VisaOptions() {
//     const { slug, purpose } = useParams();
//     const navigate = useNavigate();

//     const allForCountry = visaProducts[slug] || {};
//     const baseList = (allForCountry[purpose] || []).map((p) => ({ ...p }));

//     const [filtersOpen, setFiltersOpen] = useState(false);
//     const [sortOpen, setSortOpen] = useState(false);

//     const [onlyEVisa, setOnlyEVisa] = useState(false);
//     const [fastest, setFastest] = useState(false);
//     const [cheapest, setCheapest] = useState(false);

//     const [sortKey, setSortKey] = useState("earliest");
//     const [selectedId, setSelectedId] = useState(null);

//     const list = useMemo(() => {
//         let items = [...baseList];

//         if (onlyEVisa) items = items.filter((i) => i.isEVisa);
//         if (fastest && items.length) {
//             const min = Math.min(...items.map((i) => i.processingDays));
//             items = items.filter((i) => i.processingDays === min);
//         }
//         if (cheapest && items.length) {
//             const min = Math.min(...items.map((i) => i.price));
//             items = items.filter((i) => i.price === min);
//         }

//         const sorter = SORTS[sortKey]?.fn || SORTS.earliest.fn;
//         items.sort(sorter);

//         return items;
//     }, [baseList, onlyEVisa, fastest, cheapest, sortKey]);

//     const selected = list.find((i) => i.id === selectedId);

//     const onNext = () => {
//         if (!selected) return;
//         navigate(`/visa/${slug}/${purpose}/visapply`, {
//             state: { productId: selected.id }, // read via useLocation() on next page
//         });
//     };

//     return (
//         <div className="h-[80vh] sm:h-[60vh] bg-gray-50 pt-24 md:pt-28 pb-12">
//             <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
//                 {/* Breadcrumb */}
//                 <div className="flex items-center gap-2 text-sm text-slate-500 mb-4">
//                     <Link to="/" className="hover:text-slate-700">Home</Link>
//                     <span>›</span>
//                     <Link to={`/visa/${slug}`} className="hover:text-slate-700 capitalize">
//                         {slug.replace("-", " ")}
//                     </Link>
//                     <span>›</span>
//                     <span className="capitalize text-slate-700 font-medium">{purpose}</span>
//                 </div>

//                 {/* Title + Controls */}
//                 <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
//                     <div>
//                         <div className="flex items-center gap-2">
//                             <div className="w-7 h-5 rounded-sm bg-gradient-to-b from-red-500 to-red-700" />
//                             <h1 className="text-[26px] md:text-[28px] font-semibold text-slate-900">
//                                 {capitalize(slug)} Visa Application
//                             </h1>
//                         </div>
//                         <p className="text-slate-500 mt-1">Which Visa do you wish to apply?</p>
//                     </div>

//                     {/* Controls align right on desktop, center on mobile */}
//                     <div className="relative flex items-center justify-center md:justify-end gap-3">
//                         {/* Filter */}
//                         <div className="relative">
//                             <button
//                                 onClick={() => setFiltersOpen((v) => !v)}
//                                 className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2.5 text-slate-700 shadow-sm border border-slate-200 hover:bg-slate-50"
//                             >
//                                 <Filter className="w-4 h-4 text-yellow-500" />
//                                 <span>Filter</span>
//                                 <ChevronDown className="w-4 h-4" />
//                             </button>
//                             {filtersOpen && (
//                                 <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-slate-100 p-2 z-10">
//                                     <label className="flex items-center gap-2 px-2 py-2 rounded-lg hover:bg-slate-50">
//                                         <input
//                                             type="checkbox"
//                                             className="accent-slate-900"
//                                             checked={fastest}
//                                             onChange={(e) => setFastest(e.target.checked)}
//                                         />
//                                         Fastest Processing
//                                     </label>
//                                     <label className="flex items-center gap-2 px-2 py-2 rounded-lg hover:bg-slate-50">
//                                         <input
//                                             type="checkbox"
//                                             className="accent-slate-900"
//                                             checked={cheapest}
//                                             onChange={(e) => setCheapest(e.target.checked)}
//                                         />
//                                         Lowest Cost
//                                     </label>
//                                     <label className="flex items-center gap-2 px-2 py-2 rounded-lg hover:bg-slate-50">
//                                         <input
//                                             type="checkbox"
//                                             className="accent-slate-900"
//                                             checked={onlyEVisa}
//                                             onChange={(e) => setOnlyEVisa(e.target.checked)}
//                                         />
//                                         E-Visa Only
//                                     </label>
//                                 </div>
//                             )}
//                         </div>

//                         {/* Sort */}
//                         <div className="relative">
//                             <button
//                                 onClick={() => setSortOpen((v) => !v)}
//                                 className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2.5 text-slate-700 shadow-sm border border-slate-200 hover:bg-slate-50"
//                             >
//                                 <ListOrdered className="w-4 h-4 text-yellow-500" />
//                                 <span>Sort By</span>
//                                 <ChevronDown className="w-4 h-4" />
//                             </button>
//                             {sortOpen && (
//                                 <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-slate-100 p-2 z-10">
//                                     {Object.entries(SORTS).map(([key, cfg]) => (
//                                         <label
//                                             key={key}
//                                             className="flex items-center gap-2 px-2 py-2 rounded-lg hover:bg-slate-50"
//                                         >
//                                             <input
//                                                 type="radio"
//                                                 name="sort"
//                                                 className="accent-slate-900"
//                                                 checked={sortKey === key}
//                                                 onChange={() => setSortKey(key)}
//                                             />
//                                             {cfg.label}
//                                         </label>
//                                     ))}
//                                 </div>
//                             )}
//                         </div>
//                     </div>
//                 </div>

//                 {/* Centered column of cards */}
//                 <div className="mt-6 max-w-2xl mx-auto space-y-5">
//                     {list.map((p) => (
//                         <button
//                             key={p.id}
//                             onClick={() => setSelectedId(p.id)}
//                             className={`w-full text-left bg-white rounded-xl border
//                 ${selectedId === p.id ? "border-slate-400" : "border-slate-200"}
//                 hover:border-slate-300 shadow-sm hover:shadow-md transition
//                 p-5 md:p-6 focus:outline-none focus:ring-2 focus:ring-slate-200`}
//                         >
//                             <div className="flex items-start justify-between gap-4">
//                                 <div className="flex-1">
//                                     <div className="flex items-center gap-2 text-slate-800 font-medium text-[18px]">
//                                         <span className="inline-flex items-center justify-center w-7 h-7 rounded-md bg-slate-50 border border-slate-200">
//                                             ✈️
//                                         </span>
//                                         <span>{p.title}</span>
//                                     </div>

//                                     <div className="mt-3 inline-flex items-center gap-2 text-sm text-slate-600">
//                                         <Sun className="w-4 h-4 text-sky-500" />
//                                         <span className="px-2 py-1 bg-sky-50 text-sky-700 rounded-full">
//                                             Get your visa by: {p.deliveryDate}
//                                         </span>
//                                     </div>

//                                     <div className="mt-3 flex flex-wrap gap-2">
//                                         {p.badges.map((b) => (
//                                             <span
//                                                 key={b}
//                                                 className="inline-flex items-center gap-2 text-xs font-semibold bg-slate-100 text-slate-700 px-3 py-1 rounded-full"
//                                             >
//                                                 {b}
//                                                 <span className="inline-block w-4 h-4 text-yellow-500">●</span>
//                                             </span>
//                                         ))}
//                                     </div>

//                                     <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-slate-700">
//                                         <div className="inline-flex items-center gap-2">
//                                             <CheckCircle2 className="w-5 h-5 text-green-600" />
//                                             Stay Period: {p.stayDays} days
//                                         </div>
//                                         <div className="inline-flex items-center gap-2">
//                                             <CheckCircle2 className="w-5 h-5 text-green-600" />
//                                             Validity: {p.validityDays} days
//                                         </div>
//                                     </div>

//                                     <div className="mt-4 text-xs text-amber-600 underline underline-offset-2">
//                                         Service Terms
//                                     </div>
//                                 </div>

//                                 <div className="flex flex-col items-end justify-between h-full">
//                                     <div className="text-right">
//                                         <div className="text-[22px] font-semibold text-amber-600">
//                                             {p.currency}
//                                             {formatMoney(p.price)}
//                                         </div>
//                                         <div className="text-xs text-slate-500">per adult</div>
//                                     </div>

//                                     <div
//                                         className={`mt-10 h-6 w-6 rounded-full border-2
//                       ${selectedId === p.id ? "border-slate-900" : "border-slate-300"}
//                       flex items-center justify-center`}
//                                     >
//                                         {selectedId === p.id && (
//                                             <span className="h-3 w-3 rounded-full bg-slate-900 block" />
//                                         )}
//                                     </div>
//                                 </div>
//                             </div>
//                         </button>
//                     ))}

//                     {list.length === 0 && (
//                         <div className="text-slate-500 text-center py-20">
//                             No options found for this filter.
//                         </div>
//                     )}
//                 </div>

//                 {/* Inline actions centered; stack on mobile */}
//                 <div className="mt-10 max-w-2xl mx-auto pb-8">
//                     <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
//                         <button
//                             onClick={() => navigate(-1)}
//                             className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full border px-5 py-2.5 bg-white text-slate-700 hover:bg-slate-50"
//                         >
//                             <ArrowLeft className="w-4 h-4" />
//                             Back
//                         </button>

//                         <button
//                             disabled={!selected}
//                             onClick={onNext}
//                             className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full px-6 py-2.5
//                 ${selected
//                                     ? "bg-slate-900 text-white hover:bg-slate-800"
//                                     : "bg-slate-200 text-slate-500 cursor-not-allowed"
//                                 }`}
//                         >
//                             Next Step →
//                         </button>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

// function capitalize(s = "") {
//     return s
//         .split("-")
//         .map((w) => (w[0] ? w[0].toUpperCase() + w.slice(1) : w))
//         .join(" ");
// }
// function formatMoney(n) {
//     return new Intl.NumberFormat("en-IN").format(n);
// }

import React, { useMemo, useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { ChevronDown, Filter, ListOrdered, Sun, ArrowLeft } from "lucide-react";

const SORTS = {
  priceAsc: {
    label: "Price low to high",
    fn: (a, b) => (a.price || 0) - (b.price || 0),
  },
  earliest: {
    label: "Earliest delivery",
    fn: (a, b) => (a.processingDays || 0) - (b.processingDays || 0),
  },
};

export default function VisaOptions() {
  const { slug, purpose } = useParams();
  const navigate = useNavigate();

  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState("");

  // UI
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);
  const [onlyEVisa, setOnlyEVisa] = useState(false);
  const [fastest, setFastest] = useState(false);
  const [cheapest, setCheapest] = useState(false);
  const [sortKey, setSortKey] = useState("earliest");
  const [selectedId, setSelectedId] = useState(null);

  // API base from env or fallback
  const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:3000";

  // fetch products for the given slug+purpose
  useEffect(() => {
    let mounted = true;
    setLoading(true);
    setFetchError("");
    setList([]);

    (async () => {
      try {
        const res = await fetch(
          `${API_BASE}/api/visaProducts/${encodeURIComponent(
            slug
          )}/${encodeURIComponent(purpose)}`,
          {
            headers: { Accept: "application/json" },
          }
        );

        if (!res.ok) {
          const ct = res.headers.get("content-type") || "";
          const body = ct.includes("application/json")
            ? await res.json().catch(() => null)
            : await res.text().catch(() => null);
          console.error("GET /api/visaProducts non-OK:", res.status, body);
          if (mounted) setFetchError(`Server returned ${res.status}`);
          return;
        }

        const contentType = res.headers.get("content-type") || "";
        if (!contentType.includes("application/json")) {
          const text = await res.text().catch(() => "<no body>");
          console.error(
            "GET /api/visaProducts returned non-JSON:",
            contentType,
            text.slice(0, 1000)
          );
          if (mounted)
            setFetchError("Server returned non-JSON response (see console)");
          return;
        }

        const data = await res.json();
        if (!mounted) return;
        setList(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Failed to fetch visa products", err);
        if (mounted) setFetchError(err.message || "Network error");
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => (mounted = false);
  }, [slug, purpose, API_BASE]);

  // apply local filters/sorts
  const filtered = useMemo(() => {
    let items = [...list];
    if (onlyEVisa) items = items.filter((i) => i.isEVisa);
    if (fastest && items.length) {
      const min = Math.min(...items.map((i) => i.processingDays || 0));
      items = items.filter((i) => (i.processingDays || 0) === min);
    }
    if (cheapest && items.length) {
      const min = Math.min(...items.map((i) => i.price || 0));
      items = items.filter((i) => (i.price || 0) === min);
    }

    const sorter = SORTS[sortKey]?.fn || SORTS.earliest.fn;
    items.sort(sorter);

    return items;
  }, [list, onlyEVisa, fastest, cheapest, sortKey]);

  const onNext = () => {
    const selected = filtered.find((i) => i.id === selectedId);
    if (!selected) return;
    navigate(`/visa/${slug}/${purpose}/visapply`, {
      state: { productId: selected.id },
    });
  };

  if (loading)
    return (
      <div className="min-h-[40vh] flex items-center justify-center">
        Loading options...
      </div>
    );

  if (fetchError)
    return (
      <div className="min-h-[40vh] flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-600 font-semibold mb-2">
            Error loading options
          </div>
          <div className="text-sm text-gray-600 mb-4">{fetchError}</div>
          <div className="text-xs text-gray-500">
            Ensure backend runs at {API_BASE}
          </div>
        </div>
      </div>
    );

  return (
    <div className="h-auto bg-gray-50 pt-24 md:pt-28 pb-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 text-sm text-slate-500 mb-4">
          <Link to="/" className="hover:text-slate-700">
            Home
          </Link>
          <span>›</span>
          <Link
            to={`/visa/${slug}`}
            className="hover:text-slate-700 capitalize"
          >
            {slug.replace("-", " ")}
          </Link>
          <span>›</span>
          <span className="capitalize text-slate-700 font-medium">
            {purpose}
          </span>
        </div>

        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
          <div>
            <h1 className="text-[26px] md:text-[28px] font-semibold text-slate-900">
              Choose a Visa
            </h1>
            <p className="text-slate-500 mt-1">
              Which Visa do you wish to apply?
            </p>
          </div>

          <div className="relative flex items-center justify-center md:justify-end gap-3">
            <div className="relative">
              <button
                onClick={() => setFiltersOpen((v) => !v)}
                className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2.5 text-slate-700 shadow-sm border border-slate-200 hover:bg-slate-50"
              >
                <Filter className="w-4 h-4 text-yellow-500" />{" "}
                <span>Filter</span> <ChevronDown className="w-4 h-4" />
              </button>
              {filtersOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border p-2 z-10">
                  <label className="flex items-center gap-2 px-2 py-2 rounded-lg hover:bg-slate-50">
                    <input
                      type="checkbox"
                      checked={fastest}
                      onChange={(e) => setFastest(e.target.checked)}
                    />{" "}
                    Fastest Processing
                  </label>
                  <label className="flex items-center gap-2 px-2 py-2 rounded-lg hover:bg-slate-50">
                    <input
                      type="checkbox"
                      checked={cheapest}
                      onChange={(e) => setCheapest(e.target.checked)}
                    />{" "}
                    Lowest Cost
                  </label>
                  <label className="flex items-center gap-2 px-2 py-2 rounded-lg hover:bg-slate-50">
                    <input
                      type="checkbox"
                      checked={onlyEVisa}
                      onChange={(e) => setOnlyEVisa(e.target.checked)}
                    />{" "}
                    E-Visa Only
                  </label>
                </div>
              )}
            </div>

            <div className="relative">
              <button
                onClick={() => setSortOpen((v) => !v)}
                className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2.5 text-slate-700 shadow-sm border border-slate-200 hover:bg-slate-50"
              >
                <ListOrdered className="w-4 h-4 text-yellow-500" />{" "}
                <span>Sort By</span> <ChevronDown className="w-4 h-4" />
              </button>
              {sortOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border p-2 z-10">
                  {Object.entries(SORTS).map(([key, cfg]) => (
                    <label
                      key={key}
                      className="flex items-center gap-2 px-2 py-2 rounded-lg hover:bg-slate-50"
                    >
                      <input
                        type="radio"
                        name="sort"
                        checked={sortKey === key}
                        onChange={() => setSortKey(key)}
                      />
                      {cfg.label}
                    </label>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-6 max-w-2xl mx-auto space-y-5">
          {filtered.map((p) => (
            <button
              key={p.id}
              onClick={() => setSelectedId(p.id)}
              className={`w-full text-left bg-white rounded-xl border ${
                selectedId === p.id ? "border-slate-400" : "border-slate-200"
              } hover:border-slate-300 shadow-sm p-5`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 text-slate-800 font-medium text-[18px]">
                    <span className="inline-flex items-center justify-center w-7 h-7 rounded-md bg-slate-50 border border-slate-200">
                      ✈️
                    </span>
                    <span>{p.title}</span>
                  </div>

                  {/* <div className="mt-3 inline-flex items-center gap-2 text-sm text-slate-600">
                    <Sun className="w-4 h-4 text-sky-500" />
                    <span className="px-2 py-1 bg-sky-50 text-sky-700 rounded-full">
                      Get your visa by: {p.deliveryDate}
                    </span>
                  </div> */}

                  <div className="mt-3 flex flex-wrap gap-2">
                    {(p.badges || []).map((b) => (
                      <span
                        key={b}
                        className="inline-flex items-center gap-2 text-xs font-semibold bg-slate-100 text-slate-700 px-3 py-1 rounded-full"
                      >
                        {b}
                      </span>
                    ))}
                  </div>

                  <div className="mt-4 text-xs text-amber-600 underline underline-offset-2">
                    Service Terms
                  </div>
                </div>

                <div className="flex flex-col items-end justify-between h-full">
                  <div className="text-right">
                    <div className="text-[22px] font-semibold text-amber-600">
                      {p.currency}
                      {new Intl.NumberFormat("en-IN").format(p.price)}
                    </div>
                    <div className="text-xs text-slate-500">per adult</div>
                  </div>

                  <div
                    className={`mt-10 h-6 w-6 rounded-full border-2 ${
                      selectedId === p.id
                        ? "border-slate-900"
                        : "border-slate-300"
                    } flex items-center justify-center`}
                  >
                    {selectedId === p.id && (
                      <span className="h-3 w-3 rounded-full bg-slate-900 block" />
                    )}
                  </div>
                </div>
              </div>
            </button>
          ))}

          {filtered.length === 0 && (
            <div className="text-slate-500 text-center py-20">
              No options found for this filter.
            </div>
          )}
        </div>

        <div className="mt-10 max-w-2xl mx-auto pb-8">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => navigate(-1)}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full border px-5 py-2.5 bg-white text-slate-700 hover:bg-slate-50"
            >
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
            <button
              disabled={!selectedId}
              onClick={onNext}
              className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full px-6 py-2.5 ${
                selectedId
                  ? "bg-slate-900 text-white hover:bg-slate-800"
                  : "bg-slate-200 text-slate-500 cursor-not-allowed"
              }`}
            >
              Next Step →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
