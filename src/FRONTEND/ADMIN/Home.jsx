/*import React, { useState, useEffect } from "react";
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
*/
/*
export default Home;

import React, { useEffect, useState } from "react";

function Home() {
  const [products, setProducts] = useState([]);

  // fetch products
  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div style={{ padding: "20px" }}>

      <h2>Our Products</h2>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
        {products.map((p) => (
          <div
            key={p.product_id}
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              width: "200px",
              textAlign: "center",
            }}
          >
            <img
              src={`http://localhost:5000/uploads/${p.product_image}`}
              width="150"
              alt="product"
            />

            <h4>{p.product_name}</h4>
            <p>₹{p.product_price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;*/

import React, { useEffect, useState } from "react";

function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => {
        console.error("Error:", err);
        setProducts([]); // prevent crash
      });
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Our Products</h2>

      {products.length === 0 ? (
        <p>No products available</p>
      ) : (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
          {products.map((p) => (
            <div key={p.product_id}>
              <h4>{p.product_name}</h4>
              <p>₹{p.product_price}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;