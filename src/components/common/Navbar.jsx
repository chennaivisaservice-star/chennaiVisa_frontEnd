import { Link, useLocation } from "react-router-dom";
import {
  User,
  Menu,
  X,
  Home,
  Plane,
  Phone,
  FileText,
  HelpCircle,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import LoginModal from "../auth/LoginModal";
import { useAuth } from "../../context/AuthContext";

const navLinks = [
  {
    to: "/",
    label: "Home",
    icon: <Home size={18} className="text-yellow-500" />,
  },
  {
    to: "/visa",
    label: "Visa",
    icon: <Plane size={18} className="text-[#002b5c]" />,
  },
  {
    to: "/contact",
    label: "Contact Us",
    icon: <Phone size={18} className="text-[#002b5c]" />,
  },
  // {
  //   to: "/blogs",
  //   label: "Blogs",
  //   icon: <FileText size={18} className="text-[#002b5c]" />,
  // },
  {
    to: "/faq",
    label: "FAQ's",
    icon: <HelpCircle size={18} className="text-[#002b5c]" />,
  },
];

// small inline SVG fallback (data URI) so you don't have to ship an asset
const AVATAR_FALLBACK =
  'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="none"><rect width="24" height="24" rx="6" fill="%23E5E7EB"/><path d="M12 12c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm0 2c-2.667 0-8 1.333-8 4v1h16v-1c0-2.667-5.333-4-8-4z" fill="%239CA3AF"/></svg>';

const Navbar = () => {
  const location = useLocation();
  const { user, isAuthenticated, logout } = useAuth();

  const [isOpen, setIsOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [userSession, setUserSession] = useState(null);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  // profile dropdown
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef(null);

  // compute avatar source (priority: local session -> auth user -> fallback)
  const avatarSrc =
    (userSession && userSession.picture) ||
    (user && user.picture) ||
    AVATAR_FALLBACK;

  useEffect(() => {
    const stored = localStorage.getItem("userSession");
    if (stored) {
      try {
        setUserSession(JSON.parse(stored));
        setIsUserLoggedIn(true);
      } catch (e) {
        setUserSession(null);
        setIsUserLoggedIn(false);
      }
    } else {
      setIsUserLoggedIn(false);
    }
  }, []);

  // keep UI in sync when auth context changes (login/logout)
  useEffect(() => {
    const stored = localStorage.getItem("userSession");
    if (stored) {
      try {
        setUserSession(JSON.parse(stored));
        setIsUserLoggedIn(true);
      } catch {
        setUserSession(null);
        setIsUserLoggedIn(false);
      }
    } else if (isAuthenticated && user) {
      // optionally populate session from auth user
      setUserSession(
        (prev) =>
          prev || { name: user.name, picture: user.picture, phone: user.phone },
      );
      setIsUserLoggedIn(true);
    } else {
      setIsUserLoggedIn(false);
      setUserSession(null);
    }
  }, [isAuthenticated, user]);

  // close profile dropdown when clicking outside
  useEffect(() => {
    function handleClick(e) {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    }
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  const handleLoginClick = () => {
    setIsOpen(false);
    setShowLoginModal(true);
  };

  const goTop = () => window.scrollTo({ top: 0, left: 0, behavior: "auto" });

  return (
    <>
      {/* Top Info Bar */}
      <div className="fixed top-0 left-0 right-0 z-[60] h-8 bg-[#002b5c] text-white text-xs sm:text-sm flex items-center">
        <div className="max-w-7xl mx-auto flex flex-row justify-between items-center px-4 w-full">
          <span className="whitespace-nowrap">
            <strong>GST No:</strong> 33BVXPD2230A1Z4
          </span>
          <span className="whitespace-nowrap">
            <strong>ISO No:</strong> ISO-9001-2015
          </span>
        </div>
      </div>

      <nav className="fixed top-8 left-0 right-0 z-50 w-full">
        <div className="bg-[#f1f1f1]/95 backdrop-blur text-blue-900 flex items-center justify-between px-6 py-4 shadow-lg w-full">
          <Link to="/" onClick={goTop} className="flex items-center gap-2">
            <img
              src="/logo.png"
              alt="Chennai Visa Service Logo"
              className="h-10 w-auto object-contain"
            />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                onClick={goTop}
                className={`transition-colors font-bold ${
                  location.pathname === to
                    ? "text-yellow-400"
                    : "text-blue-900 hover:text-yellow-400 text-bold"
                }`}
              >
                {label}
              </Link>
            ))}
          </div>

          {/* Desktop Right - Authenticated / Unauthenticated */}
          <div className="hidden md:flex items-center gap-3">
            {isAuthenticated || isUserLoggedIn ? (
              <div
                className="relative flex items-center gap-3"
                ref={profileRef}
              >
                {/* avatar button */}
                <button
                  onClick={() => setProfileOpen((s) => !s)}
                  className="flex items-center gap-3 bg-white border border-gray-200 px-3 py-1.5 rounded-full shadow-sm hover:shadow-md focus:outline-none"
                  aria-expanded={profileOpen}
                  aria-haspopup="true"
                >
                  <img
                    src={avatarSrc}
                    alt={userSession?.name || user?.name || "Profile"}
                    onError={(e) => {
                      // fallback to inline SVG data URI if the image fails to load
                      if (e?.currentTarget)
                        e.currentTarget.src = AVATAR_FALLBACK;
                    }}
                    className="h-9 w-9 rounded-full object-cover border"
                    decoding="async"
                    loading="lazy"
                  />
                  <span className="hidden sm:inline-block px-2 text-sm font-medium text-blue-900">
                    {user?.name || userSession?.name || user?.phone || "Member"}
                  </span>
                </button>

                {/* Dropdown */}
                {profileOpen && (
                  <div className="absolute right-0 top-full mt-4 w-48 bg-white rounded-lg shadow-lg border border-gray-100 p-2 z-50 origin-top-right transform transition ease-out duration-150">
                    <Link
                      to="/profile"
                      onClick={() => {
                        setProfileOpen(false);
                        goTop();
                      }}
                      className="block px-3 py-2 rounded-md text-sm text-[#002b5c] hover:bg-gray-50"
                    >
                      Profile
                    </Link>
                    <button
                      onClick={() => {
                        setProfileOpen(false);
                        setShowLogoutModal(true);
                      }}
                      className="w-full text-left px-3 py-2 rounded-md text-sm text-red-500 hover:bg-gray-50"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={handleLoginClick}
                className="bg-yellow-400 text-blue-900 px-4 py-2 rounded-full font-semibold hover:bg-yellow-300 transition-all transform hover:scale-105 flex items-center gap-2"
              >
                <User size={16} />
                <span className="hidden sm:inline">Login / Signup</span>
              </button>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-blue-900"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Open menu"
          >
            {isOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </nav>

       {/* Mobile Sidebar */}
        <div
          className={`fixed top-0 left-0 h-screen w-[80%] sm:w-[70%] bg-white shadow-2xl z-[999] flex flex-col justify-between transform transition-transform duration-300 ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div>
            <div className="flex items-center justify-between bg-yellow-400 px-6 py-4">
              <img
                src="/logo.png"
                alt="Chennai Visa Service Logo"
                className="h-8 w-auto object-contain"
              />
              <button onClick={() => setIsOpen(false)} className="text-white">
                <X size={22} />
              </button>
            </div>

            <div className="flex flex-col mt-3 px-4 space-y-2">
              {navLinks.map(({ to, label, icon }) => (
                <Link
                  key={to}
                  to={to}
                  onClick={() => {
                    setIsOpen(false);
                    goTop();
                  }}
                  className={`flex items-center gap-3 px-3 py-3 rounded-md ${
                    location.pathname === to
                      ? "bg-yellow-50 text-yellow-500 font-semibold"
                      : "text-[#002b5c] hover:bg-gray-100"
                  }`}
                >
                  {icon}
                  {label}
                </Link>
              ))}

              {/* Mobile Auth area */}
              {isAuthenticated || isUserLoggedIn ? (
                <div className="mt-4 px-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={avatarSrc}
                      alt={userSession?.name || user?.name || "Profile"}
                      onError={(e) => {
                        if (e?.currentTarget)
                          e.currentTarget.src = AVATAR_FALLBACK;
                      }}
                      className="h-10 w-10 rounded-full object-cover border"
                    />
                    <div>
                      <div className="text-sm font-semibold text-[#002b5c]">
                        {user?.name || userSession?.name || user?.phone}
                      </div>
                      <Link
                        to="/profile"
                        onClick={() => {
                          setIsOpen(false);
                          goTop();
                        }}
                        className="text-xs text-gray-500 hover:underline"
                      >
                        View Profile
                      </Link>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setShowLogoutModal(true);
                      setIsOpen(false);
                    }}
                    className="mt-4 w-full text-left text-[#002b5c] underline"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <button
                  onClick={handleLoginClick}
                  className="mt-4 bg-yellow-400 text-blue-900 w-full py-3 rounded-md font-semibold flex items-center justify-center gap-2 hover:bg-yellow-300 transition-all"
                >
                  <User size={18} />
                  Login / Signup
                </button>
              )}
            </div>
          </div>

          <div className="px-5 py-4 text-xs text-center text-gray-500 border-t">
            © {new Date().getFullYear()} Chennai Visa Service. All rights
            reserved.
          </div>
        </div>

      {/* Login Modal */}
      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
      />

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-[999]">
          <div className="bg-white rounded-xl shadow-xl p-6 w-[90%] max-w-sm">
            <h2 className="text-lg font-semibold text-blue-900 mb-3">
              Are you sure you want to log out?
            </h2>
            <p className="text-sm text-gray-600 mb-5">
              You will need to log in again to access your account.
            </p>

            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100"
              >
                No, Stay Logged In
              </button>

              <button
                onClick={() => {
                  logout();
                  setShowLogoutModal(false);
                }}
                className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600"
              >
                Yes, Log Me Out
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
