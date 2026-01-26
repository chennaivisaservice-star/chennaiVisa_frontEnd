import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plane, Search } from "lucide-react";
import { useApp } from "../../context/ApplicationContext";

const TABS = ["All", "Trending", "E-Visa", "Express", "Cheapest"];

export default function Visacard() {
  const navigate = useNavigate();

  // UI state
  const [activeTab, setActiveTab] = useState("All");
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 9;

  // data
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState("");
  const { clearTravellers } = useApp();

  // use environment variable or fallback to localhost:3000
  const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:3000";

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    setFetchError("");
    setCountries([]);
    clearTravellers();
    (async () => {
      try {
        const res = await fetch(`${API_BASE}/api/countries`, {
          headers: { Accept: "application/json" },
        });

        if (!res.ok) {
          const ct = res.headers.get("content-type") || "";
          const body = ct.includes("application/json")
            ? await res.json().catch(() => null)
            : await res.text().catch(() => null);

          console.error("/api/countries non-OK:", res.status, body);
          if (mounted) setFetchError(`Server returned ${res.status}`);
          return;
        }

        const contentType = res.headers.get("content-type") || "";
        if (!contentType.includes("application/json")) {
          const text = await res.text().catch(() => "<no body>");
          console.error(
            "/api/countries returned non-JSON:",
            contentType,
            text.slice(0, 1000)
          );
          if (mounted)
            setFetchError("Server returned non-JSON response (see console).");
          return;
        }

        const data = await res.json();
        if (!mounted) return;
        setCountries(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Failed to load countries", err);
        if (mounted) setFetchError(err.message || "Network error");
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => (mounted = false);
  }, [API_BASE]);

  // Derived lists
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return countries.filter((c) => {
      const inTab = activeTab === "All" || (c.tags || []).includes(activeTab);
      const inSearch = !q || c.name.toLowerCase().includes(q);
      return inTab && inSearch;
    });
  }, [activeTab, query, countries]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));

  useEffect(() => setPage(1), [activeTab, query]);

  const start = (page - 1) * pageSize;
  const current = filtered.slice(start, start + pageSize);

  useEffect(() => window.scrollTo({ top: 0, behavior: "smooth" }), [page]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-28">
        <div>Loading countries…</div>
      </div>
    );
  }

  if (fetchError) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-28">
        <div className="text-center">
          <div className="text-red-600 font-semibold mb-2">
            Error loading countries
          </div>
          <div className="text-sm text-gray-600 mb-4">{fetchError}</div>
          <div className="text-xs text-gray-500">
            Make sure your backend is running on {API_BASE}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 font-sans pt-24 md:pt-28 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Heading Card */}
  <div className="bg-white rounded-3xl shadow-sm px-6 py-12 mb-10 text-center">
    <p className="text-yellow-500 font-semibold text-sm uppercase tracking-wider mb-3">
      TRENDY TRAVEL DESTINATIONS
    </p>

    <h2 className="text-4xl md:text-5xl font-bold text-blue-900 leading-tight tracking-tight">
      Explore Our Most Popular Destinations,
    </h2>

    <h2 className="text-4xl md:text-5xl font-bold text-blue-900 tracking-tight mt-2">
      Tailored For Every Traveler
    </h2>
  </div>
        
        {/* Header row */}
        <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between mb-6">
          <div className="w-full overflow-x-auto scrollbar-hide">
            <div className="flex gap-2 bg-white rounded-full p-1.5 shadow-sm w-max">
              {TABS.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-2.5 rounded-full font-medium text-sm whitespace-nowrap transition
                    ${
                      activeTab === tab
                        ? "bg-slate-900 text-white"
                        : "text-slate-700 hover:bg-slate-100"
                    }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="relative w-full md:w-[380px]">
            <div className="flex items-center gap-2 bg-white rounded-full px-5 py-3 shadow-sm">
              <Plane className="w-5 h-5 text-slate-400" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                type="text"
                placeholder="Where do you want to travel"
                className="flex-1 outline-none text-slate-700 placeholder:text-slate-400 text-sm"
              />
              <button
                onClick={() => setPage(1)}
                className="bg-yellow-400 rounded-full p-2 hover:bg-yellow-500 transition"
                aria-label="Search"
              >
                <Search className="w-4 h-4 text-slate-900" />
              </button>
            </div>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {current.map((country) => (
            <div
              key={country.slug}
              onClick={() => navigate(`/visa/${country.slug}`)}
              className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer"
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src={country.image}
                  alt={country.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                {country.badge && (
                  <div className="absolute top-4 left-4 bg-slate-900 text-white px-3 py-1.5 rounded-full text-xs font-medium">
                    {country.badge}
                  </div>
                )}
              </div>

              <div className="p-5">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="text-xl font-semibold text-slate-900 group-hover:text-slate-700 transition-colors">
                    {country.name}
                  </h3>
                  <span className="text-xl font-bold text-yellow-500">
                    {country.price}
                  </span>
                </div>
                <p className="text-sm text-slate-500">{country.date}</p>
              </div>
            </div>
          ))}
        </div>

        {current.length === 0 && (
          <div className="text-center text-slate-500 py-16">
            No destinations found.
          </div>
        )}

        {filtered.length > pageSize && (
          <Pagination
            page={page}
            totalPages={totalPages}
            onChange={(p) => setPage(p)}
          />
        )}
      </div>
    </div>
  );
}

/** Pagination component reused unchanged */
function Pagination({ page, totalPages, onChange }) {
  const windowSize = 5;
  const half = Math.floor(windowSize / 2);
  let start = Math.max(1, page - half);
  let end = Math.min(totalPages, start + windowSize - 1);
  if (end - start + 1 < windowSize) start = Math.max(1, end - windowSize + 1);

  const nums = [];
  for (let i = start; i <= end; i++) nums.push(i);

  return (
    <div className="mt-8 flex items-center justify-center gap-2">
      <button
        onClick={() => onChange(1)}
        disabled={page === 1}
        className={`px-3 py-2 rounded-full border text-sm ${
          page === 1
            ? "text-slate-300 border-slate-200"
            : "text-slate-700 border-slate-300 hover:bg-slate-100"
        }`}
        aria-label="First page"
      >
        «
      </button>
      <button
        onClick={() => onChange(Math.max(1, page - 1))}
        disabled={page === 1}
        className={`px-3 py-2 rounded-full border text-sm ${
          page === 1
            ? "text-slate-300 border-slate-200"
            : "text-slate-700 border-slate-300 hover:bg-slate-100"
        }`}
        aria-label="Previous page"
      >
        ‹
      </button>

      {nums.map((n) => (
        <button
          key={n}
          onClick={() => onChange(n)}
          className={`px-4 py-2 rounded-full text-sm font-medium border transition ${
            n === page
              ? "bg-slate-900 text-white border-slate-900"
              : "bg-white text-slate-700 border-slate-300 hover:bg-slate-100"
          }`}
          aria-current={n === page ? "page" : undefined}
        >
          {n}
        </button>
      ))}

      <button
        onClick={() => onChange(Math.min(totalPages, page + 1))}
        disabled={page === totalPages}
        className={`px-3 py-2 rounded-full border text-sm ${
          page === totalPages
            ? "text-slate-300 border-slate-200"
            : "text-slate-700 border-slate-300 hover:bg-slate-100"
        }`}
        aria-label="Next page"
      >
        ›
      </button>
      <button
        onClick={() => onChange(totalPages)}
        disabled={page === totalPages}
        className={`px-3 py-2 rounded-full border text-sm ${
          page === totalPages
            ? "text-slate-300 border-slate-200"
            : "text-slate-700 border-slate-300 hover:bg-slate-100"
        }`}
        aria-label="Last page"
      >
        »
      </button>
    </div>
  );
}
