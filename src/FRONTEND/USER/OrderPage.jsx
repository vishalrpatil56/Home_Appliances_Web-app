import React, { useEffect, useState } from "react";
import CusHeader from "./CusHeader";
import CusFooter from "./CusFooter";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaBox, FaTrash, FaSearch, FaChevronDown, FaChevronUp } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedOrder, setExpandedOrder] = useState(null);

  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    setOrders(storedOrders);
  }, []);

  // // Handle search filter
  const filteredOrders = orders.filter((order) =>
    order.date.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Toggle product list visibility
  const toggleExpand = (orderId) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  // Delete an order
  const deleteOrder = (orderId) => {
    const updatedOrders = orders.filter((order) => order.id !== orderId);
    setOrders(updatedOrders);
    localStorage.setItem("orders", JSON.stringify(updatedOrders));
        toast.error("Order deleted successfully!",{position: "top-center"});
    
  };
 
  return (
    <>
      <CusHeader />
      <div className="container my-5">
        <h2 className="text-center mb-4">📦 Your Orders</h2>

        {/* Search Bar */}
        <div className="input-group mb-4">
          <input
            type="text"
            className="form-control"
            placeholder="Search orders by Date ..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="btn btn-outline-primary">
            <FaSearch />
          </button>
        </div>

        {filteredOrders.length === 0 ? (
          <div className="alert alert-info text-center">
            No orders found. Go shop and place your first order! 😊
          </div>
        ) : (
          filteredOrders.map((order) => (
            <div key={order.id} className="card mb-4 shadow-sm border-0">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center">
                  <h5 className="card-title">
                    <FaBox className="text-primary me-2" />
                    Order ID: {order.id}
                  </h5>
                  <small className="text-muted">{order.date}</small>
                </div>

                <div className="mb-3">
                  <h6 className="text-success">Customer Information:</h6>
                  <p className="mb-1">
                    <strong>Name:</strong> {order.customer.name}
                  </p>
                  <p className="mb-1">
                    <strong>Email:</strong> {order.customer.email}
                  </p>
                  <p className="mb-1">
                    <strong>Phone:</strong> {order.customer.phone}
                  </p>
                  <p className="mb-1">
                    <strong>Address:</strong> {order.customer.address}
                  </p>
                </div>

                <div className="d-flex justify-content-between align-items-center">
                  <button
                    className="btn btn-outline-secondary"
                    onClick={() => toggleExpand(order.id)}
                  >
                    {expandedOrder === order.id ? (
                      <>
                        <FaChevronUp className="me-1" /> Hide Products
                      </>
                    ) : (
                      <>
                        <FaChevronDown className="me-1" /> Show Products
                      </>
                    )}
                  </button>

                  <button
                    className="btn btn-outline-danger"
                    onClick={() => deleteOrder(order.id)}
                  >
                    <FaTrash className="me-1" /> Delete Order
                  </button>
                </div>

                {expandedOrder === order.id && (
                  <div className="mt-3">
                    <h6 className="text-info">Products:</h6>
                    <ul className="list-group">
                      {order.products.map((product, idx) => (
                        <li
                          key={idx}
                          className="list-group-item d-flex justify-content-between align-items-center"
                        >
                          <div>
                            <strong>{product.name}</strong>
                            <br />
                            <small className="text-muted">₹{product.price.toLocaleString()}</small>
                          </div>
                          <span className="badge bg-success">
                            ₹{product.price.toLocaleString()}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="mt-3">
                  <h5 className="text-end">
                    Total: <span className="text-primary">₹{order.total.toLocaleString()}</span>
                  </h5>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
      <footer className="bg-black text-white text-center py-3">
     <h4> <p>&copy; 2025 Home Appliance Service. All rights reserved.</p></h4>
      <p>
        <a href="/privacy" className="text-white">Privacy Policy</a> |{" "}
        <a href="/terms" className="text-white">Terms of Service</a>
      </p>
    

    </footer>
   <ToastContainer /> </>
  );
};

export default Orders;
