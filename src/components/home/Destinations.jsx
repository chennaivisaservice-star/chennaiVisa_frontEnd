import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plane, Search } from "lucide-react";
import { useApp } from "../../context/ApplicationContext";

const TABS = ["All", "Trending", "E-Visa", "Express", "Cheapest"];

export default function Visacard() {
  const navigate = useNavigate();
  const { clearTravellers } = useApp();

  // UI state
  const [activeTab, setActiveTab] = useState("All");
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 9;

  // Data state
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState("");

  const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:3000";

  // ---------------------------
  // Fetch Countries
  // ---------------------------
  useEffect(() => {
    const controller = new AbortController();

    async function loadCountries() {
      try {
        setLoading(true);
        setFetchError("");
        setCountries([]);
        clearTravellers();

        const res = await fetch(`${API_BASE}/api/countries`, {
          headers: { Accept: "application/json" },
          signal: controller.signal
        });

        if (!res.ok) {
          throw new Error(`Server returned ${res.status}`);
        }

        const contentType = res.headers.get("content-type") || "";
        if (!contentType.includes("application/json")) {
          throw new Error("Server did not return JSON");
        }

        const data = await res.json();
        setCountries(Array.isArray(data) ? data : []);
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error("Failed to load countries:", err);
          setFetchError(err.message || "Network error");
        }
      } finally {
        setLoading(false);
      }
    }

    loadCountries();
    return () => controller.abort();
  }, [API_BASE, clearTravellers]);

  // ---------------------------
  // Filtering
  // ---------------------------
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    return countries.filter((c) => {
      const inTab =
        activeTab === "All" || (c.tags || []).includes(activeTab);

      const inSearch =
        !q || c.name?.toLowerCase().includes(q);

      return inTab && inSearch;
    });
  }, [countries, activeTab, query]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));

  useEffect(() => {
    setPage(1);
  }, [activeTab, query]);

  const start = (page - 1) * pageSize;
  const current = filtered.slice(start, start + pageSize);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  // ---------------------------
  // Loading State
  // ---------------------------
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-28">
        Loading countries…
      </div>
    );
  }

  // ---------------------------
  // Error State
  // ---------------------------
  if (fetchError) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-28">
        <div className="text-center">
          <p className="text-red-600 font-semibold mb-2">
            Error loading countries
          </p>
          <p className="text-sm text-gray-600 mb-3">{fetchError}</p>
          <p className="text-xs text-gray-500">
            Backend should run at {API_BASE}
          </p>
        </div>
      </div>
    );
  }

  // ---------------------------
  // UI
  // ---------------------------
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 pt-24 md:pt-28 pb-12">

      {/* Heading */}
      <div className="text-center mb-14">
        <p className="text-yellow-500 font-semibold text-sm uppercase tracking-wider mb-2">
          TRENDY TRAVEL DESTINATIONS
        </p>
        <h2 className="text-4xl md:text-5xl font-bold text-blue-900">
          Explore Our Most Popular Destinations,
        </h2>
        <h2 className="text-4xl md:text-5xl font-bold text-blue-900 mt-2">
          Tailored For Every Traveler
        </h2>
      </div>

      <div className="max-w-7xl mx-auto px-4">

        {/* Tabs + Search */}
        <div className="flex flex-col md:flex-row gap-4 md:justify-between mb-6">

          {/* Tabs */}
          <div className="overflow-x-auto no-scrollbar">
            <div className="flex gap-2 bg-white rounded-full p-1.5 shadow-sm w-max">
              {TABS.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-2.5 rounded-full text-sm font-medium transition
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

          {/* Search */}
          <div className="relative w-full md:w-[380px]">
            <div className="flex items-center gap-2 bg-white rounded-full px-5 py-3 shadow-sm">
              <Plane className="w-5 h-5 text-slate-400" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Where do you want to travel"
                className="flex-1 outline-none text-sm"
              />
              <button
                onClick={() => setPage(1)}
                className="bg-yellow-400 rounded-full p-2 hover:bg-yellow-500"
              >
                <Search className="w-4 h-4 text-black" />
              </button>
            </div>
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {current.map((country) => (
            <div
              key={country.slug}
              onClick={() => navigate(`/visa/${country.slug}`)}
              className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition cursor-pointer group"
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src={country.image}
                  alt={country.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                />

                {country.badge && (
                  <div className="absolute top-4 left-4 bg-black text-white px-3 py-1.5 rounded-full text-xs">
                    {country.badge}
                  </div>
                )}
              </div>

              <div className="p-5">
                <div className="flex justify-between mb-1">
                  <h3 className="text-lg font-semibold">
                    {country.name}
                  </h3>
                  <span className="text-lg font-bold text-yellow-500">
                    {country.price}
                  </span>
                </div>
                <p className="text-sm text-gray-500">
                  {country.date}
                </p>
              </div>
            </div>
          ))}
        </div>

        {current.length === 0 && (
          <p className="text-center text-gray-500 py-16">
            No destinations found.
          </p>
        )}

        {filtered.length > pageSize && (
          <Pagination
            page={page}
            totalPages={totalPages}
            onChange={setPage}
          />
        )}
      </div>
    </div>
  );
}

/* -------------------- */
/* Pagination Component */
/* -------------------- */

function Pagination({ page, totalPages, onChange }) {
  const windowSize = 5;
  const half = Math.floor(windowSize / 2);

  let start = Math.max(1, page - half);
  let end = Math.min(totalPages, start + windowSize - 1);
  if (end - start + 1 < windowSize) {
    start = Math.max(1, end - windowSize + 1);
  }

  const pages = [];
  for (let i = start; i <= end; i++) pages.push(i);

  return (
    <div className="mt-8 flex justify-center gap-2">

      <button onClick={() => onChange(1)} disabled={page === 1}>«</button>
      <button onClick={() => onChange(page - 1)} disabled={page === 1}>‹</button>

      {pages.map((n) => (
        <button
          key={n}
          onClick={() => onChange(n)}
          className={`px-4 py-2 rounded-full ${
            n === page
              ? "bg-black text-white"
              : "border"
          }`}
        >
          {n}
        </button>
      ))}

      <button onClick={() => onChange(page + 1)} disabled={page === totalPages}>›</button>
      <button onClick={() => onChange(totalPages)} disabled={page === totalPages}>»</button>

    </div>
  );
}
