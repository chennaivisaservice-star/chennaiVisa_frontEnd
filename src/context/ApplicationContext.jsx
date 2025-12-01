import { createContext, useContext, useState, useMemo, useEffect } from "react";

const AppCtx = createContext(null);

export default function ApplicationProvider({ children }) {
  // Load from localStorage if available
  const storedDates = localStorage.getItem("app_dates");
  const storedTravellers = localStorage.getItem("app_travellers");
  const storedVisaMeta = localStorage.getItem("app_visaMeta");

  const [dates, setDates] = useState(
    storedDates ? JSON.parse(storedDates) : { start: "", end: "" }
  );
  const [travellers, setTravellers] = useState(
    storedTravellers ? JSON.parse(storedTravellers) : []
  );
  const [visaMeta, setVisaMeta] = useState(
    storedVisaMeta ? JSON.parse(storedVisaMeta) : null
  );

  // Persist in localStorage
  useEffect(() => {
    localStorage.setItem("app_dates", JSON.stringify(dates));
  }, [dates]);

  useEffect(() => {
    localStorage.setItem("app_travellers", JSON.stringify(travellers));
  }, [travellers]);

  useEffect(() => {
    localStorage.setItem("app_visaMeta", JSON.stringify(visaMeta));
  }, [visaMeta]);

  // Traveller functions
  const addTraveller = (t) =>
    setTravellers((s) => [...s, { id: crypto.randomUUID(), ...t }]);

  const updateTraveller = (id, patch) =>
    setTravellers((s) => s.map((x) => (x.id === id ? { ...x, ...patch } : x)));

  const removeTraveller = (id) =>
    setTravellers((s) => s.filter((x) => x.id !== id));

  // Clear all data (restart)
  const clearTravellers = () => {
    setTravellers([]);
    setDates({ start: "", end: "" });
    setVisaMeta(null);
    localStorage.removeItem("app_dates");
    localStorage.removeItem("app_travellers");
    localStorage.removeItem("app_visaMeta");
  };

  const value = useMemo(
    () => ({
      dates,
      setDates,
      travellers,
      addTraveller,
      updateTraveller,
      removeTraveller,
      clearTravellers, 
      visaMeta,
      setVisaMeta,
    }),
    [dates, travellers, visaMeta]
  );

  return <AppCtx.Provider value={value}>{children}</AppCtx.Provider>;
}

export const useApp = () => useContext(AppCtx);
