import { api } from "./client";

export async function getPatients() {
  const res = await api.get("/api/patients/");
  return res.data;
}

export async function createPatient(payload) {
  const res = await api.post("/api/patients/", payload);
  return res.data;
}
