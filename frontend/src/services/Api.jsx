import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000/api" });

const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  return token
    ? { Authorization: `bearer ${token}` }
    : alert("token not found");
};

export const register = (userData) => API.post("/user/register", userData);
export const login = (userData) => API.post("/user/login", userData);

export const fetchAllUsers = () =>
  API.get("/user", { headers: getAuthHeader() });
