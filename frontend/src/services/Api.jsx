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

export const fetchPostById = (postId) =>
  API.get(`/post/${postId}`, { headers: getAuthHeader() });

export const createPost = (postData) =>
  API.post("/post/create", postData, { headers: getAuthHeader() });

export const createComment = (posttId, postComment) =>
  API.post(`/post/comment/${posttId}`, postComment, {
    headers: getAuthHeader(),
  });

export const likePost = (postId) =>
  API.post(`/post/like/${postId}`, {}, { headers: getAuthHeader() });

export const unlikePost = (postId) =>
  API.post(`/post/unlike/${postId}`, {}, { headers: getAuthHeader() });
