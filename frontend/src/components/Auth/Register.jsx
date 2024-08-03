import React, { useState } from "react";

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
        <input
          type="text"
          placeholder="Enter username"
          name="username"
          onChange={handleOnChange}
        />
        <input
          type="email"
          placeholder="Enter email"
          name="email"
          onChange={handleOnChange}
        />
        <input
          type="password"
          placeholder="Enter password"
          name="password"
          onChange={handleOnChange}
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
