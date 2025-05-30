import React, { useState, useNavigate } from "react";
import { Link } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { FiUser } from "react-icons/fi";
import { AiOutlineHome } from "react-icons/ai";
import { FiSearch } from "react-icons/fi";
import { RiShoppingBag3Line } from "react-icons/ri";
import "./Styles/CusHeader.css";

function CusHeader({ cartCount = 0 }) {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate;

  // Handle search and redirect to results page
  const handleSearch = () => {
    if (searchTerm.trim()) {
      navigate(`/search/${searchTerm.trim()}`); // Redirect to the search results page
    } else {
      alert("Please enter a search term.");
    }
  };

  // Trigger search on "Enter" key press
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };
  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-dark bg-black">
        <div className="container-fluid">
          <div
            className="collapse navbar-collapse justify-content-center"
            id="navbarNav"
          >
            {/* Logo */}
            <Link to={"/"}>
              {" "}
              <img
                src="public/Untitled design.png"
                alt="logo"
                className="me-3"
                style={{ width: "250px", marginLeft: "25px" }}
              />
            </Link>

     {/* Tagline */}
     <div
              className="header-tagline"
              style={{
                color: "white",
                fontSize: "20px",
                fontWeight: "bold",
                marginLeft: "140px",
                textTransform: "uppercase",
                letterSpacing: "1.5px",
                padding: "10px 20px",
                borderRadius: "8px",
                boxShadow: "0 0 15px rgba(255,140,0,0.8)",
                animation: "pulse 1.5s infinite alternate",
                transition: "all 0.3s ease-in-out",
                cursor: "pointer"
              }}
              onMouseEnter={(e) => {
                e.target.style.color = "white";
                e.target.style.boxShadow = "0 0 20px rgba(255,140,0,1)";
                e.target.style.transform = "scale(1.05)";
              }}
              onMouseLeave={(e) => {
                e.target.style.color = "white";
                e.target.style.boxShadow = "0 0 15px rgba(255,140,0,0.8)";
                e.target.style.transform = "scale(1)";
              }}
            >
              Your Trusted Home Appliance Partner
            </div>
            {/* Search Container */}
            {/* <div className="search-container">
              <input
                type="text"
                className="search-input"
                placeholder="Search for products, brands, and more"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onClick={handleKeyPress} // Search on "Enter" key press
              />
              <button className="search-btn" onClick={handleSearch}>
                <FiSearch />
              </button>
            </div> */}

            {/* Orders Link */}

            {/* Navigation Links */}
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link
                  className="nav-link active text-white px-3"
                  to="/loginpage"
                  style={{
                    backgroundColor: "orangered",
                    marginTop: "5px",
                    color: "white",
                    padding: "8px 15px",
                    borderRadius: "5px",
                    fontWeight: "bold",
                    margin: "5px",
                    transition:
                      "box-shadow 0.3s ease, background-color 0.3s ease, color 0.3s ease", // Added box-shadow transition
                    marginRight: "5px",
                    boxShadow: "0 0 10px rgba(255, 69, 0, 0.8)", // Initial glow
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = "tomato";
                    e.target.style.color = "yellow";
                    e.target.style.boxShadow = "0 0 15px rgba(255, 69, 0, 1)"; // Increased glow on hover
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = "orangered";
                    e.target.style.color = "white";
                    e.target.style.boxShadow = "0 0 10px rgba(255, 69, 0, 0.5)"; // Return to initial glow
                  }}
                >
                  Be A Service Provider
                </Link>
              </li>{" "}
              <li className="nav-item">
                <Link
                  className="nav-link active text-white px-3"
                  to="/orders"
                  style={{ transition: "all 0.3s ease" }}
                  onMouseEnter={(e) => {
                    e.target.style.color = "yellow";
                    e.target.style.transform = "scale(1.2)";
                    e.target.style.textShadow = "0 0 20px yellow";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.color = "white";
                    e.target.style.transform = "scale(1)";
                    e.target.style.textShadow = "none";
                  }}
                >
                  <RiShoppingBag3Line size={30} />
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link active text-white px-3"
                  to="/cart"
                  style={{ transition: "all 0.3s ease" }}
                  onMouseEnter={(e) => {
                    e.target.style.color = "yellow";
                    e.target.style.transform = "scale(1.2)";
                    e.target.style.textShadow = "0 0 20px yellow";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.color = "white";
                    e.target.style.transform = "scale(1)";
                    e.target.style.textShadow = "none";
                  }}
                >
                  <AiOutlineShoppingCart size={30} />
                  {cartCount > 0 && (
                    <span className="cart-badge">
                      {cartCount > 1 ? "1+" : "1"}
                    </span>
                  )}
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link active text-white px-3"
                  to="/userregister"
                  style={{ transition: "all 0.3s ease" }}
                  onMouseEnter={(e) => {
                    e.target.style.color = "yellow";
                    e.target.style.transform = "scale(1.2)";
                    e.target.style.textShadow = "0 0 20px yellow";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.color = "white";
                    e.target.style.transform = "scale(1)";
                    e.target.style.textShadow = "none";
                  }}
                >
                  <FiUser size={33} />
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default CusHeader;
