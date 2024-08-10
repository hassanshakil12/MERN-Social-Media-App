import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000/api" });

const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  return token
    ? { Authorization: `bearer ${token}` }
    : alert("token not found");
};

// User Routes ----------------------------------------------------------------------------

export const register = (userData) => API.post("/user/register", userData);
export const login = (userData) => API.post("/user/login", userData);

export const fetchAllUsers = () =>
  API.get("/user", { headers: getAuthHeader() });

export const followUser = (userId) =>
  API.post(`/user/follow/${userId}`, {}, { headers: getAuthHeader() });

export const unFollowUser = (userId) =>
  API.post(`/user/unfollow/${userId}`, {}, { headers: getAuthHeader() });

export const currentUserProfile = () =>
  API.get("/user/profile", { headers: getAuthHeader() });

// Post Routes ----------------------------------------------------------------------------

export const fetchPost = () => API.get("/post", { headers: getAuthHeader() });

export const createPost = (postData) =>
  API.post("/post/create", postData, { headers: getAuthHeader() });
