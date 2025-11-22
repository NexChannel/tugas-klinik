import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
});

export const getCategories = () => api.get("/doctor");
export const getCategory = (id) => api.get(`/doctor/${id}`);
export const createCategory = (data) => api.post("/doctor", data);
export const updateCategory = (id, data) => api.put(`/doctor/${id}`, data);
export const deleteCategory = (id) => api.delete(`/doctor/${id}`);

export const getProducts = () => api.get("/patient");
export const getProduct = (id) => api.get(`/patient/${id}`);
export const createProduct = (data) => api.post("/patient", data);
export const updateProduct = (id, data) => api.put(`/patient/${id}`, data);
export const deleteProduct = (id) => api.delete(`/patient/${id}`);
