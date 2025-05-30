import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Styles/Fridge.css"; // Create Refrigerators.css for styling
import CusFooter from "./CusFooter";
import CusHeader from "./CusHeader";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Fridge = () => {
  const navigate = useNavigate();
  const [singleDoorProducts, setSingleDoorProducts] = useState([]);
  const [doubleDoorProducts, setDoubleDoorProducts] = useState([]);
  const [tripleDoorProducts, setTripleDoorProducts] = useState([]);
  const [sideBySideProducts, setSideBySideProducts] = useState([]);

  useEffect(() => {
    const fetchSingleDoorRefrigerators = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/refrigerators/singledoor"
        );
        setSingleDoorProducts(response.data);
      } catch (error) {
        console.error("Error fetching Single Door refrigerators:", error);
      }
    };

    const fetchDoubleDoorRefrigerators = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/refrigerators/doubledoor"
        );
        setDoubleDoorProducts(response.data);
      } catch (error) {
        console.error("Error fetching Double Door refrigerators:", error);
      }
    };

    const fetchTripleDoorRefrigerators = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/refrigerators/tripledoor"
        );
        setTripleDoorProducts(response.data);
      } catch (error) {
        console.error("Error fetching Triple Door refrigerators:", error);
      }
    };

    const fetchSideBySideRefrigerators = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/refrigerators/sidebyside"
        );
        setSideBySideProducts(response.data);
      } catch (error) {
        console.error("Error fetching Side-by-Side refrigerators:", error);
      }
    };

    fetchSingleDoorRefrigerators();
    fetchDoubleDoorRefrigerators();
    fetchTripleDoorRefrigerators();
    fetchSideBySideRefrigerators();
  }, []);

  const handleAddToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    const cartItem = {
      id: product.product_id, // Unique ID
      image: `http://localhost:5000/uploads/${product.product_image}`, // Full image URL
      name: product.product_name,
      description: product.product_description,
      price: product.product_price,
      quantity: 1, // Default quantity
    };

    cart.push(cartItem);
    localStorage.setItem("cart", JSON.stringify(cart));
    toast.success("Your product is added to Cart successfully!", {
      position: "top-center",
    });
  };

  return (
    <>
      <CusHeader />

      {/* Single Door Section */}
      <div className="container my-3">
        <div className="row justify-content-center">
          <div className="card-body">
            <div className="card shadow-lg p-4">
              <h4
                style={{
                  padding: "20px",
                  borderRadius: "15px",
                  background: "#fff",
                  display: "inline-block",
                  fontWeight: "bold",
                }}
              >
                Single Door:
              </h4>
              <br />
              <br />
              <div className="row row-cols-2 row-cols-md-2 g-4">
                {singleDoorProducts.map((product) => (
                  <div
                    key={product.product_id}
                    className="card product-card shadow-sm h-100"
                  >
                    <img
                      src={`http://localhost:5000/uploads/${product.product_image}`}
                      className="card-img"
                      alt={product.product_name}
                      style={{ height: "275px" }}
                    />
                    <div className="card-body">
                      <h5 className="card-title">
                        {product.product_description}
                      </h5>
                      <div className="d-flex justify-content-start align-items-center mb-3">
                        <span className="fs-2 fw-bold text-primary">
                          ₹{product.product_price}
                        </span>
                      </div>
                      <button
                        className="btn btn-warning w-100 mt-auto"
                        onClick={() => handleAddToCart(product)}
                      >
                        <AiOutlineShoppingCart size={20} /> Add to cart
                      </button>
                      <br />
                      <br />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Double Door Section */}
      <div className="container my-3">
        <div className="row justify-content-center">
          <div className="card-body">
            <div className="card shadow-lg p-4">
              <h4
                style={{
                  padding: "20px",
                  borderRadius: "15px",
                  background: "#fff",
                  display: "inline-block",
                  fontWeight: "bold",
                }}
              >
                Double Door:
              </h4>
              <br />
              <br />
              <div className="row row-cols-2 row-cols-md-2 g-4">
                {doubleDoorProducts.map((product) => (
                  <div
                    key={product.product_id}
                    className="card product-card shadow-sm h-100"
                  >
                  <img
                      src={`http://localhost:5000/uploads/${product.product_image}`}
                      className="card-img"
                      alt={product.product_name}
                      style={{ height: "275px" }}
                    />
                    <div className="card-body">
                      <h5 className="card-title">
                        {product.product_description}
                      </h5>
                      <div className="d-flex justify-content-start align-items-center mb-3">
                        <span className="fs-2 fw-bold text-primary">
                          ₹{product.product_price}
                        </span>
                      </div>
                      <button
                        className="btn btn-warning w-100 mt-auto"
                        onClick={() => handleAddToCart(product)}
                      >
                        <AiOutlineShoppingCart size={20} /> Add to cart
                      </button>
                      <br />
                      <br />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Triple Door Section
      <div className="container my-3">
        <div className="row justify-content-center">
          <div className="card-body">
            <div className="card shadow-lg p-4">
              <h4
                style={{
                  padding: "20px",
                  borderRadius: "15px",
                  background: "#fff",
                  display: "inline-block",
                  fontWeight: "bold",
                }}
              >
                Triple Door:
              </h4>
              <br />
              <br />
              <div className="row row-cols-2 row-cols-md-2 g-4">
                {tripleDoorProducts.map((product) => (
                  <div
                    key={product.product_id}
                    className="card product-card shadow-sm h-100"
                  >
                    <img
                      src={`http://localhost:5000/uploads/${product.product_image}`}
                      className="card-img"
                      alt={product.product_name}
                      style={{ height: "275px" }}
                    />{" "}
                    <div className="card-body">
                      <h5 className="card-title">
                        {product.product_description}
                      </h5>
                      <div className="d-flex justify-content-start align-items-center mb-3">
                        <span className="fs-2 fw-bold text-primary">
                          ₹{product.product_price}
                        </span>
                      </div>
                      <button
                        className="btn btn-warning w-100 mt-auto"
                        onClick={() => handleAddToCart(product)}
                      >
                        <AiOutlineShoppingCart size={20} /> Add to cart
                      </button>
                      <br />
                      <br />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Side-by-Side Section */}
      {/* <div className="container my-3">
        <div className="row justify-content-center">
          <div className="card-body">
            <div className="card shadow-lg p-4">
              <h4
                style={{
                  padding: "20px",
                  borderRadius: "15px",
                  background: "#fff",
                  display: "inline-block",
                  fontWeight: "bold",
                }}
              >
                Side-by-Side:
              </h4>
              <br />
              <br />
              <div className="row row-cols-2 row-cols-md-2 g-4">
                {sideBySideProducts.map((product) => (
                  <div
                    key={product.product_id}
                    className="card product-card shadow-sm h-100"
                  >
                    <img
                      src={`http://localhost:5000/uploads/${product.product_image}`}
                      className="card-img"
                      alt={product.product_name}
                      style={{ height: "275px" }}
                    />{" "}
                    <div className="card-body">
                      <h5 className="card-title">
                        {product.product_description}
                      </h5>
                      <div className="d-flex justify-content-start align-items-center mb-3">
                        <span className="fs-2 fw-bold text-primary">
                          ₹{product.product_price}
                        </span>
                      </div>
                      <button
                        className="btn btn-warning w-100 mt-auto"
                        onClick={() => handleAddToCart(product)}
                      >
                        <AiOutlineShoppingCart size={20} /> Add to cart
                      </button>
                      <br />
                      <br />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div> */}
      {/* </div> */}
      {/* } */}

      <ToastContainer />
      <footer className="bg-black text-white text-center py-3">
        <h4>
          {" "}
          <p>&copy; 2025 Home Appliance Service. All rights reserved.</p>
        </h4>
        <p>
          <a href="/privacy" className="text-white">
            Privacy Policy
          </a>{" "}
          |{" "}
          <a href="/terms" className="text-white">
            Terms of Service
          </a>
        </p>
      </footer>
      <ToastContainer />
    </>
  );
};

export default Fridge;
