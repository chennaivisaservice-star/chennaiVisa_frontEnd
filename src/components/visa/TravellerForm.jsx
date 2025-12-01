
import { useState } from "react";
import { useParams, useNavigate, Link, useLocation } from "react-router-dom";
import { ArrowLeft, Save } from "lucide-react";
import { useApp } from "../../context/ApplicationContext";

export default function TravellerForm() {
  const { slug, purpose } = useParams();
  const { dates } = useApp();
  const navigate = useNavigate();
  const location = useLocation();
  const productId = location.state?.productId;
  const navState = productId ? { state: { productId } } : {};

  // safe read of parent user from localStorage
  const parentUserRaw = localStorage.getItem("userSession");
  let parentEmail = "";
  try {
    parentEmail = parentUserRaw ? JSON.parse(parentUserRaw)?.email || "" : "";
  } catch {
    parentEmail = "";
  }

  const [form, setForm] = useState({
    parentUser: parentEmail,
    firstName: "",
    lastName: "",
    middleName: "",
    gender: "Male",
    dob: "",
    occupation: "",
    phone: "",
    email: "",
    relation: "",
    city: "",
    state: "",
    passportNumber: "",
    passportExpiry: "",
    startDate: dates?.start || "",
    endDate: dates?.end || "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const set = (k, v) => setForm((s) => ({ ...s, [k]: v }));

  const isFormValid =
    form.firstName &&
    form.lastName &&
    form.passportNumber &&
    form.dob &&
    form.gender &&
    form.email &&
    form.city &&
    form.occupation &&
    form.passportExpiry &&
    form.phone &&
    form.relation &&
    form.state;

  const API = import.meta.env.VITE_API_LOCAL_URL || "http://localhost:3000";

  const saveTraveller = async () => {
    if (!isFormValid) return null;
    setLoading(true);
    setError("");

    try {
      const res = await fetch(`${API}/api/addTraveller`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: { ...form, productId } }),
      });

      if (!res.ok) {
        const txt = await res.text();
        throw new Error(txt || "Failed to save traveller");
      }

      const data = await res.json();
      // return object so caller can inspect
      return data;
    } catch (err) {
      console.error(err);
      setError(err.message || "Save failed");
      return null;
    } finally {
      setLoading(false);
    }
  };

  const save = async () => {
    const result = await saveTraveller();
    if (!result) return;
    // navigate back to applyvisa (use template string)
    navigate(`/visa/${slug}/${purpose}/applyvisa`, navState);
  };

  const saveAndContinue = async () => {
    const result = await saveTraveller();
    if (!result) return;
    navigate(`/visa/${slug}/${purpose}/review`, navState);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-10">
      <nav className="text-sm text-gray-600 mb-4 flex flex-wrap gap-1">
        <Link to="/" className="hover:text-blue-600">
          Home
        </Link>
        <span>/</span>
        <Link to={`/visa/${slug}`} className="hover:text-blue-600 capitalize">
          {slug}
        </Link>
        <span>/</span>
        <span className="text-gray-800 font-medium">Add Traveller</span>
      </nav>

      <div className="rounded-2xl border border-gray-200 bg-white p-5">
        <h3 className="font-semibold text-gray-900 mb-4">Passport Details</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label className="text-sm text-gray-600 mb-1">First Name *</label>
            <input
              className="input border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="First Name"
              value={form.firstName}
              onChange={(e) => set("firstName", e.target.value)}
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm text-gray-600 mb-1">Middle Name</label>
            <input
              className="input border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Middle Name"
              value={form.middleName}
              onChange={(e) => set("middleName", e.target.value)}
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm text-gray-600 mb-1">Last Name *</label>
            <input
              className="input border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Last Name"
              value={form.lastName}
              onChange={(e) => set("lastName", e.target.value)}
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm text-gray-600 mb-1">Gender *</label>
            <div className="flex items-center gap-4 mt-1">
              <label className="text-sm">
                <input
                  type="radio"
                  name="gender"
                  checked={form.gender === "Male"}
                  onChange={() => set("gender", "Male")}
                />{" "}
                Male
              </label>
              <label className="text-sm">
                <input
                  type="radio"
                  name="gender"
                  checked={form.gender === "Female"}
                  onChange={() => set("gender", "Female")}
                />{" "}
                Female
              </label>
            </div>
          </div>

          <div className="flex flex-col">
            <label className="text-sm text-gray-600 mb-1">
              Date of Birth *
            </label>
            <input
              type="date"
              className="input border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={form.dob}
              onChange={(e) => set("dob", e.target.value)}
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm text-gray-600 mb-1">Occupation *</label>
            <input
              className="input border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={form.occupation}
              onChange={(e) => set("occupation", e.target.value)}
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm text-gray-600 mb-1">Mobile Number</label>
            <input
              className="input border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={form.phone}
              onChange={(e) => set("phone", e.target.value)}
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm text-gray-600 mb-1">
              Email Address *
            </label>
            <input
              className="input border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={form.email}
              onChange={(e) => set("email", e.target.value)}
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm text-gray-600 mb-1">Relation *</label>
            <input
              className="input border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={form.relation}
              onChange={(e) => set("relation", e.target.value)}
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm text-gray-600 mb-1">City *</label>
            <input
              className="input border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={form.city}
              onChange={(e) => set("city", e.target.value)}
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm text-gray-600 mb-1">State *</label>
            <input
              className="input border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={form.state}
              onChange={(e) => set("state", e.target.value)}
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm text-gray-600 mb-1">
              Passport Number *
            </label>
            <input
              className="input border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={form.passportNumber}
              onChange={(e) => set("passportNumber", e.target.value)}
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm text-gray-600 mb-1">
              Passport Expiry *
            </label>
            <input
              type="date"
              className="input border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={form.passportExpiry}
              onChange={(e) => set("passportExpiry", e.target.value)}
            />
          </div>
        </div>

        {/* show API error if any */}
        {/* {error && (
          <div className="mt-4 text-sm text-red-600">{error.message}</div>
        )} */}

        {error && (
          <div className="mt-4 text-sm text-red-600">
            Please fill the start and end dates
          </div>
        )}

        <div className="mt-6 flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 rounded-full border px-5 py-2.5 bg-white text-slate-700 hover:bg-slate-50"
          >
            <ArrowLeft className="w-4 h-4" /> Cancel
          </button>

          <div className="flex gap-2">
            <button
              onClick={save}
              disabled={!isFormValid || loading}
              className={`inline-flex items-center gap-2 rounded-full px-6 py-2.5 ${
                isFormValid
                  ? "bg-gray-100 hover:bg-gray-200"
                  : "bg-gray-100 text-slate-400 cursor-not-allowed"
              }`}
            >
              <Save className="w-4 h-4" />
              {loading ? "Saving..." : "Save & Add More"}
            </button>

            <button
              onClick={saveAndContinue}
              disabled={!isFormValid || loading}
              className={`inline-flex items-center gap-2 rounded-full px-6 py-2.5 ${
                isFormValid
                  ? "bg-slate-900 text-white hover:bg-slate-800"
                  : "bg-slate-200 text-slate-500 cursor-not-allowed"
              }`}
            >
              {loading ? "Saving..." : "Save & Continue"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
