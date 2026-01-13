import { api } from "./client";

export async function login(username, password) {
  const res = await api.post("/api/auth/login/", { username, password });

  const access = res.data?.access || res.data?.access_token;
  const refresh = res.data?.refresh || res.data?.refresh_token;

  if (!access) {
    throw new Error("No access token returned by backend.");
  }

  localStorage.setItem("access_token", access);
  if (refresh) localStorage.setItem("refresh_token", refresh);

  return res.data;
}

export function logout() {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
}

export function isLoggedIn() {
  return !!localStorage.getItem("access_token");
}
