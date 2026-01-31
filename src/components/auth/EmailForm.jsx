import { useState } from "react";
// import { useNavigate } from "react-router-dom";
import { Mail } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
const EmailForm = ({ activeTab, onSuccess }) => {
  const isSignup = activeTab === "signup";
  const { login } = useAuth();
  // const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const validate = () => {
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      setError("Please enter a valid email address.");
      return false;
    }
    if (!password || password.length < 6) {
      setError("Password must be at least 6 characters.");
      return false;
    }
    if (isSignup && !name.trim()) {
      setError("Please enter your name.");
      return false;
    }
    return true;
  };

  // Replace these with real API calls
  const fakeLogin = () => new Promise((res) => setTimeout(res, 800));
  const fakeSignup = () => new Promise((res) => setTimeout(res, 800));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!validate()) return;

    try {
      setLoading(true);
      if (isSignup) {
        await fakeSignup();
      } else {
        await fakeLogin();
      }
      // persist to auth context so navbar shows user
      login({ name: isSignup ? name.trim() : undefined, email });
      onSuccess({ name: isSignup ? name.trim() : undefined, email });
    } catch (err) {
      setError(
        err?.message ||
          (isSignup ? "Could not create account." : "Invalid credentials.")
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
        <Mail size={18} className="text-yellow-400" />
        {isSignup ? "Sign up with Email" : "Login with Email"}
      </h3>

      {error && (
        <div className="mb-4 p-3 bg-red-900 border border-red-700 text-red-200 rounded-lg text-sm">
          {error}
        </div>
      )}
      <div className="d-flex gap-2 sign-oauth my-4 text-white text-center">
        <GoogleLogin
  onSuccess={(credentialResponse) => {
    const token = credentialResponse.credential;
    const decoded = jwtDecode(token);

    const userPayload = {
      name: decoded.name,
      email: decoded.email,
      picture: decoded.picture,
      googleToken: token,
    };

    // 🔥 send user to LoginModal handler
    onSuccess(userPayload);
  }}
  onError={() => {
    console.log("Google Login Failed");
  }}
/>

      {/* <form onSubmit={handleSubmit} className="space-y-4">
        {isSignup && (
          <div>
            <input
              type="text"
              placeholder="Your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400 transition-colors"
              required
            />
          </div>
        )}

        <div>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400 transition-colors"
            required
          />
        </div>

        <div>
          <input
            type="password"
            placeholder={
              isSignup ? "Create password (min 6 chars)" : "Enter password"
            }
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400 transition-colors"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading
            ? "Processing..."
            : isSignup
            ? "Sign Up with Email"
            : "Login with Email"}
        </button>
      </form> */}
    </div>
  );
};

export default EmailForm;
