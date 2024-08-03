import React, { useState } from "react";
import "./Register.css"

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
  };

  return (
    <div className="register-container">
      <form onSubmit={handleOnSubmit} method="post">
        <div className="form-control">
          <h3>Username</h3>
          <input
            type="text"
            placeholder="Enter username"
            name="username"
            onChange={handleOnChange}
          />
        </div>

        <div className="form-control">
          <h3>E-mail</h3>
          <input
            type="email"
            placeholder="Enter email"
            name="email"
            onChange={handleOnChange}
          />
        </div>

        <div className="form-control">
          <h3>Password</h3>
          <input
            type="password"
            placeholder="Enter password"
            name="password"
            onChange={handleOnChange}
          />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
