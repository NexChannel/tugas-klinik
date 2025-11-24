import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
});

// Doctors (Dokter) endpoints
export const getDoctors = () => api.get("/doctor");
export const getDoctor = (id) => api.get(`/doctor/${id}`);
export const createDoctor = (data) => api.post("/doctor", data);
export const updateDoctor = (id, data) => api.put(`/doctor/${id}`, data);
export const deleteDoctor = (id) => api.delete(`/doctor/${id}`);

// Patients (Pasien) endpoints
export const getPatients = () => api.get("/patient");
export const getPatient = (id) => api.get(`/patient/${id}`);
export const createPatient = (data) => api.post("/patient", data);
export const updatePatient = (id, data) => api.put(`/patient/${id}`, data);
export const deletePatient = (id) => api.delete(`/patient/${id}`);

// Prescriptions (Resep)
export const getPrescriptions = () => api.get("/prescription");
export const getPrescription = (id) => api.get(`/prescription/${id}`);
export const createPrescription = (data) => api.post("/prescription", data);
export const updatePrescription = (id, data) =>
  api.put(`/prescription/${id}`, data);
export const deletePrescription = (id) => api.delete(`/prescription/${id}`);
// ENDPOINT HARUS SAMA dengan backend
