import { useState } from "react";
import { X } from "lucide-react";
import EmailForm from "./EmailForm.jsx";
import { useAuth } from "../../context/AuthContext";

const LoginModal = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState("login");
  const { login } = useAuth();

  if (!isOpen) return null;

  const handleSuccess = (payload) => {
    // payload should be { email, name? }
    login(payload);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black bg-opacity-90 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-gray-900 border border-gray-700 rounded-2xl shadow-2xl w-full max-w-md mx-4 overflow-hidden">

        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-700">
          <h2 className="text-2xl font-bold text-white">
            {activeTab === "login" ? "Welcome Back" : "Create Account"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors p-1 rounded-lg hover:bg-gray-800"
          >
            <X size={24} />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-700">
          <button
            onClick={() => setActiveTab("login")}
            className={`flex-1 py-4 font-semibold transition-colors ${
              activeTab === "login"
                ? "text-yellow-400 border-b-2 border-yellow-400"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Login
          </button>

          <button
            onClick={() => setActiveTab("signup")}
            className={`flex-1 py-4 font-semibold transition-colors ${
              activeTab === "signup"
                ? "text-yellow-400 border-b-2 border-yellow-400"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Sign Up
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <EmailForm activeTab={activeTab} onSuccess={handleSuccess} />

          <p className="text-xs text-gray-400 text-center mt-6">
            By continuing, you agree to our{" "}
            <a href="/terms" className="text-yellow-400 hover:underline">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="/privacy" className="text-yellow-400 hover:underline">
              Privacy Policy
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
