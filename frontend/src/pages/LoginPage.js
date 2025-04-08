import React, { useState } from "react";
import "./LoginPage.css";
import { message } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Login submitted", formData);

    try {
      const response = await axios.post(
        `http://localhost:5000/staff/login`,
        formData
      );
      const accessToken = response.data.accessToken;
      localStorage.setItem("accessToken", accessToken);

      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);

      message.success("Login successful");
    } catch (error) {
      console.error(error);
      message.error("Login failed.");
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Login</h2>

        <label>Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <label>Password</label>
        <div className="password-container">
          <input
            type={passwordVisible ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <div
            className="password-toggle-icon"
            onClick={togglePasswordVisibility}
          >
            {passwordVisible ? <EyeInvisibleOutlined /> : <EyeOutlined />}
          </div>
        </div>

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
