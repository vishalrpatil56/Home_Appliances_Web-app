import React from "react";
import { Link } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import "./Style/Header.css"; // Import CSS file
const Header = () => {
  return (
    <>
      {/* Navbar */}
      <header className="header">
        <nav className="navbar">
          <img
            src="Untitled design.png"
            alt="logo"
            className="navbar-logo"
            style={{ width: "250px", marginLeft: "25px", height: "79px" }}
          />
          <span className="navbar-title">HOME APPLIANCES AND SERVICES</span>
          <ul className="navbar-links">
            <li>
              <Link className="nav-link" to="/home">
                Home
              </Link>
            </li>
            <li>
              <Link className="nav-link" to="/Adminpenal">
           
                  <FiLogOut style={{color: "red" }}size={30} />
                
              
              </Link>
            </li>
          </ul>
        </nav>
      </header>

      {/* Sidebar - Always Visible */}
      <aside className="sidebar">
        <ul className="sidebar-links">
          <li>
            <Link to="/serviceproviderlist">Manage Service Provider</Link>
          </li>
          <li>
            <Link to="/customerlist">Manage Customer</Link>
          </li>

          {/* Category Links (No Dropdown) */}
          <li>
            <Link to="/categorylist">Product Category & Sub_Category</Link>
          </li>

          <li>
            <Link to="/complainlist">Complain</Link>
          </li>
          <li>
            <Link to="/feedbacklist">Feedback</Link>
          </li>
        </ul>
      </aside>
    </>
  );
};

export default Header;
