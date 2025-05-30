import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "./Styles/userLoginpage.css";
import CusHeader from "./CusHeader";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CusLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post("http://localhost:5000/api/login", {
        email,
        password,
      });

      if (response.data.success) {
        localStorage.setItem("token", response.data.token); // Store JWT token
        localStorage.setItem("user_id", response.data.user_id); // Store user ID
        toast.success("Login successful!", { position: "top-center" });
        navigate("/"); // Redirect to dashboard or any page after login
      } else {
        setError(response.data.message);
        toast.error(response.data.message, { position: "top-center" });
      }
    } catch (error) {
      setError("Invalid email or password");
      toast.error("Invalid email or password", { position: "top-center" });
    }
  };

  return (
    <>
      <CusHeader />
      <br />
      <div className="content">
        <div style={{ textAlign: "center", marginTop: "50px" }}>
          <h1
            style={{ fontSize: "32px", fontWeight: "bold", color: "black", transition: "0.3s" }}
            onMouseEnter={(e) => (e.target.style.color = "blue")}
            onMouseLeave={(e) => (e.target.style.color = "black")}
          >
            Welcome Back, <span style={{ color: "blue" }}>Customer</span>.
          </h1>
          <h4
            style={{ fontSize: "18px", color: "gray", transition: "0.3s" }}
            onMouseEnter={(e) => (e.target.style.color = "black")}
            onMouseLeave={(e) => (e.target.style.color = "gray")}
          >
            Please login to continue...
          </h4>
        </div>
      </div>
      <div className="center-container">
        <div className="login-card" style={{ height: "500px" }}>
          <h1 className="title">Login</h1>
          {error && <div className="error">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                className="input-field"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <div className="password-container">
                <input
                  type={showPassword ? "text" : "password"}
                  className="input-field"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  className="show-password-button"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>
            <p style={{ marginTop: "10px" }}>
              Don't have an account? <Link to="/userregister">Register here</Link>
            </p>
            <button type="submit" className="login-button">Login</button>
          </form>
          <br />
        </div>
      </div>
  
    </>
  );
};

export default CusLogin;
