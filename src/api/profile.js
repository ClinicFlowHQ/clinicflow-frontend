// src/api/profile.js
import { api } from "./client";

/**
 * Get current user profile data
 */
export async function getProfile() {
  const res = await api.get("/api/auth/me/");
  return res.data;
}

/**
 * Update user profile
 * @param {Object} data - Profile data to update
 */
export async function updateProfile(data) {
  const res = await api.patch("/api/auth/profile/", data);
  return res.data;
}

/**
 * Change user password
 * @param {Object} data - { current_password, new_password, confirm_password }
 */
export async function changePassword(data) {
  const res = await api.post("/api/auth/change-password/", data);
  return res.data;
}
