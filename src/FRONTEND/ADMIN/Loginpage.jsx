import React, { useState } from "react";
import "./Style/Loginpage.css";
import Header from "./Header";
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }
    setError("");

    try {
      const res = await fetch("http://localhost:5000/Adminpenal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (data.success) {
        // Store token or login status in localStorage
        localStorage.setItem("authToken", data.token);
        
        navigate("/AdminDashboard");
        
      } else {
        alert("Invalid credentials. Please try again.")
      }
    } catch (err) {
      setError("Login unsuccessful. Please try again.");
      setEmail('')
      setPassword()
      console.error(err);
    }
  };

  return (
    <>
      {/* <Header /> */}
   
<br />
      <div className="content">
      <div style={{ textAlign: "center", marginTop: "10px" }}>
  <h1
    style={{ fontSize: "32px", fontWeight: "bold", color: "black", transition: "0.3s" }}
    onMouseEnter={(e) => (e.target.style.color = "blue")}
    onMouseLeave={(e) => (e.target.style.color = "black")}
  >
    Welcome Back, <span style={{ color: "blue" }}>Admin</span>.
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
        <div className="login-card" style={{height:"500px"}}>
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

            <button type="submit" className="login-button">Login</button>
          </form>
          <br />
         
        </div>
      </div>
    </>
  );
};

export default LoginPage;
