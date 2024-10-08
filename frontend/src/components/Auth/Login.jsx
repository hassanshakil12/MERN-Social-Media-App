import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Login.css";
import { login } from "../../services/Api";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleOnChange = (e) => {
    try {
      setFormData({ ...formData, [e.target.name]: e.target.value });
      // console.log(formData);
      // console.log(localStorage);
    } catch (error) {
      console.error(error);
    }
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await login(formData);
      console.log("data", data.token);
      localStorage.setItem("token", data.token);

      alert("User loggedIn Successfully");
    } catch (error) {
      console.error(`err: ${error}`);
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleOnSubmit} method="post" className="login-form">
        <div className="login-form-heading">
          <h1>Login.</h1>
        </div>
        <div className="login-form-control">
          <h3>E-mail:</h3>
          <input
            type="email"
            placeholder="Enter email"
            name="email"
            onChange={handleOnChange}
          />
        </div>

        <div className="login-form-control">
          <h3>Password:</h3>
          <input
            type="password"
            placeholder="Enter password"
            name="password"
            onChange={handleOnChange}
          />
        </div>
        <div className="login-form-button">
          <Link to={"/register"}>Create Account</Link>
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
