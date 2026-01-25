import { createContext, useContext, useEffect, useState } from "react";
import { googleLogout } from "@react-oauth/google";
import { api } from "../lib/api";

const AuthContext = createContext(null);

function normalizePhone(raw) {
  const digits = (raw || "").replace(/\D/g, "");
  if (digits.length === 10) return `+91${digits}`;
  if (raw.startsWith("+")) return raw;
  return `+${digits}`;
}

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const tokenKey = "auth_token";

  // Load user on app start
  useEffect(() => {
    (async () => {
      try {
        const token = localStorage.getItem(tokenKey);
        const googleSession = JSON.parse(
          localStorage.getItem("userSession") || "null"
        );

        if (!token && !googleSession) {
          setUser(null);
          return setLoading(false);
        }

        let currentUser = null;

        if (token) {
          const resUser = await api.getUser(token);
          if (resUser?.success && resUser.user) {
            currentUser = resUser.user;
          }
        }

        if (!currentUser && googleSession) {
          currentUser = googleSession;
        }

        setUser(currentUser);
      } catch (err) {
        console.error("Error loading user:", err);
        setUser(null);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // Send OTP
  const sendOTP = async (rawPhone) => {
    const phone = normalizePhone(rawPhone);
    return api.sendOTP(phone);
  };

  // Verify OTP
  const verifyOTP = async (rawPhone, otp) => {
    const phone = normalizePhone(rawPhone);
    const res = await api.verifyOTP(phone, otp);

    if (!res?.success) {
      throw new Error(res?.message || "Invalid OTP");
    }

    if (res?.token) {
      localStorage.setItem(tokenKey, res.token);
    }

    setUser(res?.user || { phone });
    return res;
  };

  // ✅ LOGIN (NO HOME REDIRECT)
  const login = (payload) => {
    if (!payload) return;

    if (payload.jwt) {
      localStorage.setItem("GoogleJwt", payload.jwt);
    }

    localStorage.setItem("userSession", JSON.stringify(payload));
    setUser(payload);

    // Redirect back to intended page
    const redirect = sessionStorage.getItem("postLoginRedirect");
    if (redirect) {
      sessionStorage.removeItem("postLoginRedirect");
      window.history.pushState({}, "", redirect);
    }
  };

  // ✅ LOGOUT (NO PAGE RELOAD)
  const logout = () => {
    googleLogout();
    localStorage.removeItem(tokenKey);
    localStorage.removeItem("GoogleJwt");
    localStorage.removeItem("userSession");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated: !!user,
        sendOTP,
        verifyOTP,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
