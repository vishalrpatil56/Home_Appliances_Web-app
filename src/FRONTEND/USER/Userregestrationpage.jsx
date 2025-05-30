import { useState } from "react";
import axios from "axios";
import "./Styles/userLoginpage.css";
import { Link } from "react-router-dom";
import CusHeader from "./CusHeader";

const UserRegistrationPage = () => {
  const [formData, setFormData] = useState({
    userName: "",
    userContact: "",
    userEmail: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    


    const { userName, userContact, userEmail, password, confirmPassword } = formData;

    // if (password !== confirmPassword) {
    //   setError("Passwords do not match.");
    //   return;
    // }

    try {
      const response = await axios.post("http://localhost:5000/api/register", {
        userName,
        userContact,
        userEmail,
        password,
      });
      setSuccess(response.data.message);
      setFormData({ userName: "", userContact: "", userEmail: "", password: "", confirmPassword: "" });
    } catch (err) {
      setError(err.response?.data?.error || "Registration failed.");
    }
  };

  return (
    <>
      <CusHeader />
      
      <div className="center-container">
      <div style={{ textAlign: "center", marginTop: "1px" }}>
          <h1
            style={{ fontSize: "40px", fontWeight: "bold", color: "black", transition: "0.3s" }}
            onMouseEnter={(e) => (e.target.style.color = "blue")}
            onMouseLeave={(e) => (e.target.style.color = "black")}
          >
            Welcome, <span style={{ color: "blue" }}>Please Create an Account</span>.
          </h1>
          <h4
            style={{ fontSize: "18px", color: "gray", transition: "0.3s" }}
            onMouseEnter={(e) => (e.target.style.color = "black")}
            onMouseLeave={(e) => (e.target.style.color = "gray")}
          >
            Create a strong password... 👤🔏
          </h4>
          {error && <div className="alert alert-danger">{error}</div>}
          {success && <div className="alert alert-success">{success}</div>}
        </div>
        <div className="login-card">
          <h1 className="title">
             <span style={{ color: "blue" }}>Register</span>
          </h1>
         
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Username:</label>
              <input type="text" name="userName" value={formData.userName} onChange={handleChange} className="input-field" placeholder="Enter Username" required />
            </div>
            <div className="form-group">
              <label>Contact Number:</label>
              <input type="text" name="userContact" value={formData.userContact} onChange={handleChange} className="input-field" placeholder="Enter Contact Number" required />
            </div>
            <div className="form-group">
              <label>Email:</label>
              <input type="email" name="userEmail" value={formData.userEmail} onChange={handleChange} className="input-field" placeholder="Enter Email" required />
            </div>
            <div className="form-group">
              <label>Password:</label>
              <input type="password" name="password" value={formData.password} onChange={handleChange} className="input-field" placeholder="Enter Password" required />
            </div>
          
            <p>
              Already have an account? <Link to="/cuslogin">Login here</Link>
            </p>
            <button type="submit" className="login-button">Register</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default UserRegistrationPage;