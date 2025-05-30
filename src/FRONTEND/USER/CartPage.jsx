import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import CusFooter from "./CusFooter";
import CusHeader from "./CusHeader";
import { useNavigate } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CartPage = () => {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);

  // Load cart items from localStorage
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    // Add default quantity of 1 if missing
    const cartWithQuantity = storedCart.map((item) => ({
      ...item,
      quantity: item.quantity || 1,
    }));
    setCart(cartWithQuantity);
  }, []);

  // Update quantity and price
  const handleQuantityChange = (index, delta) => {
    const updatedCart = [...cart];
    const item = updatedCart[index];

    const newQuantity = item.quantity + delta;
    if (newQuantity >= 1) {
      item.quantity = newQuantity;
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      setCart(updatedCart);
    }
  };

  // Remove item from cart
  const handleRemove = (index) => {
    const updatedCart = cart.filter((_, i) => i !== index);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // Calculate total price based on quantity
  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  // Clear the cart
  const handleClearCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
  };

  // Proceed to checkout (navigate or display message)
  const handleCheckout = () => {
    toast.success("Proceeding to checkout...", { position: "top-center" });
    navigate("/checkout");
  };

  return (
    <>
      <CusHeader />
      <div className="container my-5">
        <h2 className="text-center mb-4">🛒 Your Cart</h2>

        {cart.length === 0 ? (
          <div className="text-center">
            <div className="alert alert-warning">
              Your cart is empty 😢 Please Add some Products
            </div>
            <br />
            <button
              style={{
                background: "#28a745", // Green color matching your checkout button
                color: "white",
                fontSize: "20px",
                padding: "12px 20px",
                borderRadius: "8px",
                border: "none",
                transition: "0.3s",
              }}
              className="btn"
              onClick={() => navigate("/")}
              onMouseOver={(e) => (e.target.style.background = "#218838")} // Darker green on hover
              onMouseOut={(e) => (e.target.style.background = "#28a745")}
            >
              🛍️ Continue Shopping
            </button>
          </div>
        ) : (
          <div className="card shadow-lg p-4">
            <div className="table-responsive">
              <table className="table table-bordered table-hover align-middle">
                <thead className="table-dark">
                  <tr>
                    <th>#</th>
                    <th>Product</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Total Price</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map((item, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>
                        <img
                          src={item.image}
                          alt={item.name}
                          style={{
                            width: "160px",
                            height: "100px",
                            objectFit: "contain",
                          }}
                        />
                      </td>
                      <td>{item.name}</td>
                      <td>
                        ₹{item.price ? item.price.toLocaleString() : "N/A"}
                      </td>
                      {/* <td className="text-success">
                        <strong style={{ fontSize: "25px" }}>
                          ₹{(item.price * item.quantity).toLocaleString()}
                        </strong>
                      </td> */}

                      {/* Quantity controls */}
                      <td>
                        <div className="d-flex align-items-center">
                          <button
                            style={{
                              background: "red",
                              color: "white",
                              fontSize: "25px",
                            }}
                            className="btn btn-outline-secondary btn-sm"
                            onClick={() => handleQuantityChange(index, -1)}
                          >
                            -
                          </button>
                          <span className="mx-2">{item.quantity}</span>
                          <button
                            style={{
                              background: "green",
                              color: "white",
                              fontSize: "22px",
                            }}
                            className="btn btn-secondary btn-sm"
                            onClick={() => handleQuantityChange(index, 1)}
                          >
                            +
                          </button>
                        </div>
                      </td>

                      <td className="text-success">
                        <strong style={{ fontSize: "25px" }}>
                          ₹{(item.price * item.quantity).toLocaleString()}
                        </strong>
                      </td>

                      <td>
                        <button
                          style={{
                            background: "red",
                            color: "white",
                            fontSize: "20px",
                          }}
                          className="btn btn-secondary btn-sm"
                          onClick={() => handleRemove(index)}
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="d-flex justify-content-between align-items-center">
              <strong>
                <h4>Total: ₹{getTotalPrice().toLocaleString()}</h4>
              </strong>
              <div>
                <button
                  style={{ background: "red", color: "white" }}
                  className="btn btn-dark me-2"
                  onClick={handleClearCart}
                >
                  Clear Cart
                </button>
                <button className="btn btn-success" onClick={handleCheckout}>
                  Checkout
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
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
      </footer>  <ToastContainer />
    </>
  );
};

export default CartPage;
