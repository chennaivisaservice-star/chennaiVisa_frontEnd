import React, { useRef, useState, useEffect } from "react";
import { useParams, useNavigate, Link, useLocation } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import LoginModal from "../../components/auth/LoginModal";
import { useAuth } from "../../context/AuthContext";
import { visaData } from "../../data/visaData";

// formatting helper
function formatMoney(n) {
  return new Intl.NumberFormat("en-IN").format(n);
}

export default function VisaApply() {
  const { slug, purpose } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();

  const [showLogin, setShowLogin] = useState(false);

  const API = import.meta.env.VITE_API_LOCAL_URL || "http://localhost:3000";

  const productIdFromState = location.state?.productId;
  const qp = new URLSearchParams(location.search);
  const productIdFromQuery = qp.get("productId");
  const productId = productIdFromState || productIdFromQuery;

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(Boolean(productId));
  const [error, setError] = useState("");

  const data = visaData?.[slug]?.[purpose];

  const disclaimerRef = useRef();
  const scheduleRef = useRef();
  const timingsRef = useRef();
  const documentsRef = useRef();
  const detailsRef = useRef();
  const faqRef = useRef();

  useEffect(() => {
    if (!productId) {
      navigate("/", { replace: true });
    }
  }, [productId]);

  useEffect(() => {
    let mounted = true;
    setError("");

    if (!productId) {
      setProduct(null);
      setLoading(false);
      return () => (mounted = false);
    }

    setLoading(true);

    fetch(`${API}/api/product/${encodeURIComponent(productId)}`)
      .then(async (res) => {
        if (!res.ok) {
          const txt = await res.text().catch(() => null);
          throw new Error(
            `Failed to fetch product (${res.status}) ${txt || ""}`.trim(),
          );
        }
        return res.json();
      })
      .then((p) => {
        if (!mounted) return;
        setProduct(p);
      })
      .catch((err) => {
        console.error("VisaApply: fetch product error:", err);
        if (mounted) setError(String(err?.message || err));
      })
      .finally(() => mounted && setLoading(false));

    return () => (mounted = false);
  }, []);

  const scrollTo = (ref) =>
    ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  const handleNext = () => {
    if (!product) return;

    if (!user) {
      sessionStorage.setItem(
        "postLoginRedirect",
        `/visa/${slug}/${purpose}/applyvisa?productId=${product.id}`,
      );
      setShowLogin(true);
      return;
    }

    navigate(`/visa/${slug}/${purpose}/applyvisa`, {
      state: { productId: product.id },
    });
  };

  if (loading) {
    return (
      <div className="min-h-[40vh] flex items-center justify-center pt-28">
        Loading selected product...
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-5xl mx-auto p-8 text-center">
        <h2 className="text-xl font-semibold text-red-600">Error</h2>
        <p className="mt-3 text-gray-700">{error}</p>
        <div className="mt-6 flex justify-center gap-3">
          <button
            onClick={() => navigate(`/visa/${slug}/${purpose}`)}
            className="px-4 py-2 bg-gray-100 rounded"
          >
            Back to Options
          </button>
          <button
            onClick={() => navigate("/")}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Home
          </button>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="max-w-6xl mx-auto p-32">
        <div className="rounded-2xl overflow-hidden shadow-lg">
          <div className="p-6 bg-white">
            <h1 className="text-2xl font-bold text-gray-800">
              {product?.title} ({product?.slug})
            </h1>
            <p className="text-lg font-semibold text-amber-600 mt-1">
              Price: {product?.currency || "₹"}
              {formatMoney(product?.price || 0)} per adult
            </p>
            <p className="text-gray-500 mt-1">
              Stay Duration: {product?.stayDays || "—"} days | Validity:{" "}
              {product?.validityDays || "—"} days
            </p>
          </div>
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-yellow-700">
            Note: Detailed visa content not found for this country/purpose.
          </p>
          <div className="mt-6 flex justify-center gap-3">
            <button
              onClick={() => navigate(`/visa/${slug}/${purpose}`)}
              className="px-4 py-2 border rounded"
            >
              Back to Options
            </button>
            <button
              onClick={handleNext}
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative pt-[80px] sm:pt-[96px]">
      <div className={showLogin ? "pointer-events-none blur-sm" : ""}>
        <div className="max-w-6xl mx-auto p-4 sm:p-6 pt-6 sm:pt-32 space-y-8">
          {/* Breadcrumb */}
          <nav className="text-sm text-gray-600 mb-2 flex flex-wrap gap-1">
            <Link to="/" className="hover:text-blue-600">
              Home
            </Link>
            <span>/</span>
            <Link to="/visa" className="hover:text-blue-600">
              {data.country}
            </Link>
            <span>/</span>
            <Link to={`/visa/${slug}`} className="hover:text-blue-600">
              {data.visaType}
            </Link>
            <span>/</span>
            <span className="text-gray-800 font-medium">Apply</span>
          </nav>

          {/* Header */}
          <div className="rounded-2xl overflow-hidden shadow-lg">
            <img
              src={data.image}
              alt={data.country}
              className="w-full h-56 object-cover"
            />
            <div className="p-6 bg-white">
              <h1 className="text-2xl font-bold text-gray-800">
                {product ? product.title : ""} ({data.country})
              </h1>

              <p className="text-lg font-semibold text-amber-600 mt-1">
                Price: {product?.currency || ""}
                {product ? formatMoney(product.price) : ""} per adult
              </p>

              <p className="text-gray-500 mt-1">
                Stay Duration: {product?.stayDays || "—"} days | Validity:{" "}
                {product?.validityDays || "—"} days
              </p>
            </div>
          </div>

          {/* Section nav */}
          <div className="flex flex-wrap gap-3 justify-center sticky top-20 bg-white py-3 z-10 border-b">
            {[
              ["Plan Disclaimer", disclaimerRef],
              ["Visa Schedule", scheduleRef],
              ["Timings & Holidays", timingsRef],
              ["Documents Required", documentsRef],
              ["Important Details", detailsRef],
              ["FAQs", faqRef],
            ].map(([label, ref]) => (
              <button
                key={label}
                onClick={() => scrollTo(ref)}
                className="px-4 py-2 bg-blue-100 text-blue-600 rounded-full hover:bg-blue-200 transition"
              >
                {label}
              </button>
            ))}
          </div>

          {/* Sections */}
          <section ref={disclaimerRef}>
            <h2 className="text-xl font-semibold mb-3">Plan Disclaimer</h2>
            <ul className="list-disc ml-6 text-gray-600">
              {(data.disclaimer || []).map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </section>

          <section ref={scheduleRef}>
            <h2 className="text-xl font-semibold mb-3">Visa Schedule</h2>
            <div className="space-y-3 text-gray-700">
              {(data.schedule || []).map((s, i) => (
                <div key={i}>
                  <div className="font-medium">{s.title}</div>
                  <div className="text-xs text-gray-500">{s.date}</div>
                  <div className="text-sm">{s.description}</div>
                </div>
              ))}
            </div>
          </section>

          <section ref={timingsRef}>
            <h2 className="text-xl font-semibold mb-3">Timings & Holidays</h2>
            <div className="text-gray-700">
              {(data.timings?.operating || []).map((t, i) => (
                <div key={i}>{t}</div>
              ))}
              {(data.timings?.holidays || []).map((t, i) => (
                <div key={"h-" + i} className="text-xs text-gray-500">
                  {t}
                </div>
              ))}
            </div>
          </section>

          <section ref={documentsRef}>
            <h2 className="text-xl font-semibold mb-3">Documents Required</h2>
            <ul className="list-disc ml-6 text-gray-600">
              {(data.documents || []).map((d, i) => (
                <li key={i}>{d}</li>
              ))}
            </ul>
          </section>

          <section ref={detailsRef}>
            <h2 className="text-xl font-semibold mb-3">Important Details</h2>
            <ul className="list-disc ml-6 text-gray-600">
              {(data.importantDetails || []).map((d, i) => (
                <li key={i}>{d}</li>
              ))}
            </ul>
          </section>

          <section ref={faqRef}>
            <h2 className="text-xl font-semibold mb-3">FAQs</h2>
            <div className="space-y-3">
              {(data.faqs || []).map((f, i) => (
                <div key={i}>
                  <div className="font-medium">{f.question}</div>
                  <div className="text-gray-600">{f.answer}</div>
                </div>
              ))}
            </div>
          </section>

          {/* Actions */}
          <div className="flex justify-between pt-6">
            <button
              onClick={() => navigate(`/visa/${slug}/${purpose}`)}
              className="flex items-center gap-2 px-5 py-2 border rounded-xl text-gray-700 hover:bg-gray-100"
            >
              <ArrowLeft size={18} /> Back
            </button>
            <button
              onClick={handleNext}
              className="flex items-center gap-2 px-5 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700"
            >
              Next Step <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>

      <LoginModal isOpen={showLogin} onClose={() => setShowLogin(false)} />
    </div>
  );
}
