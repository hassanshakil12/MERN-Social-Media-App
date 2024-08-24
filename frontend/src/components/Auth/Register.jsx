import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Register.css";
import { register } from "../../services/Api.jsx";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleOnChange = (e) => {
    try {
      setFormData({ ...formData, [e.target.name]: e.target.value });
      console.log(formData);
    } catch (error) {
      console.error(error);
    }
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(formData);
      alert("User registered Successfully");
    } catch (error) {
      console.error(`err: ${err}`);
    }
  };

  return (
    <div className="register-container">
      <form onSubmit={handleOnSubmit} method="post" className="register-form">
        <div className="register-form-heading">
          <h1>Signup.</h1>
        </div>
        <div className="register-form-control">
          <h3>Username:</h3>
          <input
            type="text"
            placeholder="Enter username"
            name="username"
            onChange={handleOnChange}
          />
        </div>

        <div className="register-form-control">
          <h3>E-mail:</h3>
          <input
            type="email"
            placeholder="Enter email"
            name="email"
            onChange={handleOnChange}
          />
        </div>

        <div className="register-form-control">
          <h3>Password:</h3>
          <input
            type="password"
            placeholder="Enter password"
            name="password"
            onChange={handleOnChange}
          />
        </div>
        <div className="register-form-button">
          <Link to={"/login"}>Log in</Link>
          <button type="submit">Register</button>
        </div>
      </form>
    </div>
  );
};

export default Register;
