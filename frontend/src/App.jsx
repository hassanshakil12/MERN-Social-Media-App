import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";

import Feed from "./components/Feed/Feed.jsx";
import Navbar from "./components/Navbar/Navbar.jsx";
import Profile from "./components/Profile/Profile.jsx";
import Register from "./components/Auth/Register.jsx";
import Login from "./components/Auth/Login.jsx";
import Explore from "./components/Explore/Explore.jsx";
import CreatePost from "./components/CreatePost/CreatePost.jsx";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Feed />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/createPost" element={<CreatePost />} />
      </Routes>
    </>
  );
};

export default App;
