import React, { useState, useEffect } from "react";
import "./Style/Home.css";
import Header from "./Header";


const Home = () => {
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setFadeIn(true);
    }, 1000);
  }, []);

  return (
    <>
     <Header/>
      <div className="home-container">
        <img
          src="public/6424688.webp"
          alt="Image"
          className={`custom-image ${fadeIn ? "fade-in-zoom" : ""}`}
        />
      </div>
      
    </>
  );
};

export default Home;