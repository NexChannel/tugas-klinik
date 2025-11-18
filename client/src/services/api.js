import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
});

// ENDPOINT HARUS SAMA dengan backend
export const getUsers = () => api.get("/user");
export const getUser = (id) => api.get(`/user/${id}`);
export const createUser = (data) => api.post("/user", data);
export const updateUser = (id, data) => api.put(`/user/${id}`, data);
export const deleteUser = (id) => api.delete(`/user/${id}`);

export const getPosts = () => api.get("/post");
export const getPost = (id) => api.get(`/post/${id}`);
export const createPost = (data) => api.post("/post", data);
export const updatePost = (id, data) => api.put(`/post/${id}`, data);
export const deletePost = (id) => api.delete(`/post/${id}`);
