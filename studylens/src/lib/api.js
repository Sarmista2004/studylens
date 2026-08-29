const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

function getToken() {
  return localStorage.getItem("token");
}

async function request(endpoint, options = {}) {
  const token = getToken();

  const res = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
    body: options.body ? JSON.stringify(options.body) : undefined,
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({ error: "Request failed" }));
    throw new Error(error.error || `HTTP ${res.status}`);
  }

  const text = await res.text();
  return text ? JSON.parse(text) : null;
}

export const api = {
  register: (name, email, password) =>
    request("/auth/register", { method: "POST", body: { name, email, password } }),
  login: (email, password) =>
    request("/auth/login", { method: "POST", body: { email, password } }),
  changePassword: (currentPassword, newPassword) =>
    request("/auth/change-password", {
      method: "PUT",
      body: { currentPassword, newPassword },
    }),

  getSubjects: () => request("/subjects"),
  addSubject: (name, goal) => request("/subjects", { method: "POST", body: { name, goal } }),
  updateSubject: (id, data) => request(`/subjects/${id}`, { method: "PUT", body: data }),
  deleteSubject: (id) => request(`/subjects/${id}`, { method: "DELETE" }),

  getSessions: () => request("/sessions"),
  addSession: (subject, date, minutes) =>
    request("/sessions", { method: "POST", body: { subject, date, minutes } }),

  getEvents: () => request("/events"),
  addEvent: (data) => request("/events", { method: "POST", body: data }),
  deleteEvent: (id) => request(`/events/${id}`, { method: "DELETE" }),

  getActivity: () => request("/activity"),
  logActivity: (text) => request("/activity", { method: "POST", body: { text } }),

  getSettings: () => request("/settings"),
  updateSettings: (data) => request("/settings", { method: "PUT", body: data }),
};