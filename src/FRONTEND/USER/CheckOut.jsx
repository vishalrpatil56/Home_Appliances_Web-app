import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import CusFooter from "./CusFooter";
import CusHeader from "./CusHeader";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CheckOut = () => {
  const [cart, setCart] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",  
    phone: "",
    paymentMethod: "",
    cardNumber: "",
    cvv: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price, 0);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckout = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.address || !formData.phone || !formData.paymentMethod) {
      toast.error("Please fill in all fields.", { position: "top-center" });
      return;
    }

    if (!/^\d{10}$/.test(formData.phone)) {
      toast.error("Please enter a valid 10-digit phone number.", { position: "top-center" });
      return;
    }

    if (formData.paymentMethod === "card") {
      if (!/^[0-9]{16}$/.test(formData.cardNumber)) {
        toast.error("Please enter a valid 16-digit card number.", { position: "top-center" });
        return;
      }
      if (!/^[0-9]{3,4}$/.test(formData.cvv)) {
        toast.error("Please enter a valid 3-4 digit CVV.", { position: "top-center" });
        return;
      }
    }

    const newOrder = {
      id: Date.now(),
      customer: formData,
      products: cart,
      total: getTotalPrice(),
      date: new Date().toLocaleString(),
    };

    const orders = JSON.parse(localStorage.getItem("orders")) || [];
    orders.push(newOrder);
    localStorage.setItem("orders", JSON.stringify(orders));

    toast.success("Order placed successfully!", { position: "top-center" });

    localStorage.removeItem("cart");
    setCart([]);
    navigate("/cushome");
  };

  return (
    <>
      <CusHeader />
      <div className="container my-5">
        <h2 className="text-center mb-4">🛒 Checkout</h2>

        {cart.length === 0 ? (
          <div className="alert alert-warning text-center">Your cart is empty. Add some products first! 😊</div>
        ) : (
          <div className="row">
            <div className="col-lg-6">
              <div className="card shadow-lg p-4">
                <h4 className="mb-4">Customer Information</h4>
                <form onSubmit={handleCheckout}>
                  <input type="text" className="form-control mb-3" name="name" value={formData.name} onChange={handleChange} placeholder="Name" required />
                  <input type="email" className="form-control mb-3" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
                  <input type="tel" className="form-control mb-3" name="phone" value={formData.phone} onChange={handleChange} pattern="[0-9]{10}" placeholder="Phone" required />
                  <textarea className="form-control mb-3" name="address" value={formData.address} onChange={handleChange} placeholder="Address" rows="3" required />
                  
                  <h5>Payment Method</h5>
                  <select className="form-control mb-3" name="paymentMethod" value={formData.paymentMethod} onChange={handleChange} required>
                    <option value="">Select Payment Method</option>
                    <option value="card">Credit/Debit Card</option>
                    <option value="cod">Cash on Delivery</option>
                  </select>
                  
                  {formData.paymentMethod === "card" && (
  <>
    <div className="mb-3">
      <label htmlFor="cardNumber" className="form-label">Card Number</label>
      <input
        type="text"
        className="form-control"
        id="cardNumber"
        name="cardNumber"
        value={formData.cardNumber}
        onChange={handleChange}
        pattern="^[0-9]{16}$"
        maxLength="16"
        placeholder="Enter a 16-digit card number (no spaces)"
        required
        onInvalid={(e) => e.target.setCustomValidity("Card number must be exactly 16 digits without spaces.")}
        onInput={(e) => e.target.setCustomValidity("")}
      />
    </div>

    <div className="mb-3">
      <label htmlFor="cvv" className="form-label">CVV</label>
      <input
        type="text"
        className="form-control"
        id="cvv"
        name="cvv"
        value={formData.cvv}
        onChange={handleChange}
        pattern="^[0-9]{3,4}$"
        maxLength="4"
        placeholder="Enter a 3 or 4-digit CVV"
        required
        onInvalid={(e) => e.target.setCustomValidity("CVV must be 3 digits (Visa/MasterCard) or 4 digits (AMEX).")}
        onInput={(e) => e.target.setCustomValidity("")}
      />
    </div>
  </>
)}

                  <button type="submit" className="btn btn-success w-100">Place Order</button>
                </form>
              </div>
            </div>

            <div className="col-lg-6">
              <div className="card shadow-lg p-4">
                <h4 className="mb-4">Order Summary</h4>
                <ul className="list-group">
                  {cart.map((item, index) => (
                    <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                      <div>
                        <strong>{item.name}</strong>
                        <br />
                        <small className="text-muted">₹{item.price.toLocaleString()}</small>
                      </div>
                      <span className="text-success">₹{item.price.toLocaleString()}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-4">
                  <h5>Total: <span className="text-primary">₹{getTotalPrice().toLocaleString()}</span></h5>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <ToastContainer />
    
     
    </>
  );
};

export default CheckOut;
