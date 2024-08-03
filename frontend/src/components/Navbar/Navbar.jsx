import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <div className="navbar-container">
      <div className="navbar-left">
        <Link to={"/"}>LOGO</Link>
      </div>
      <div className="navbar-center">
        <Link to={"/"}>Feed</Link>
        <Link to={"/createPost"}>Create</Link>
        <Link to={"/explore"}>Explore</Link>
      </div>
      <div className="navbar-right">
        <Link to={"/profile"}>Profile</Link>
      </div>
    </div>
  );
};

export default Navbar;
