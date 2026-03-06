const API_BASE =
  import.meta.env.MODE === "development"
    ? "http://localhost:8000"
    : "http://backend:8000";

export const apiFetch = (endpoint, options = {}) => {
  return fetch(`${API_BASE}${endpoint}`, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });
};