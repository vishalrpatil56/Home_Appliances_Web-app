import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  FaBox,
  FaTrash,
  FaSearch,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header1 from "./Header1";
import DownloadReport from "./DownloadReport";// Adjust path as needed


const Mainorders = () => {
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    setOrders(storedOrders);
  }, []);

  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split("T")[0];

  // Filter orders based on date range
  const filteredOrders = orders.filter((order) => {
    const orderDate = new Date(order.date);
    const start = startDate ? new Date(startDate) : null;
    const end = endDate ? new Date(endDate) : null;

    return (!start || orderDate >= start) && (!end || orderDate <= end);
  });

  // Toggle product list visibility
  const toggleExpand = (orderId) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  // Delete an order
  const deleteOrder = (orderId) => {
    const updatedOrders = orders.filter((order) => order.id !== orderId);
    setOrders(updatedOrders);
    localStorage.setItem("orders", JSON.stringify(updatedOrders));
    toast.error("Order deleted successfully!", { position: "top-center" });
  };




  return (
    <>
      <Header1 />
      <div className="container my-5">
        <h2 className="text-center mb-4">📦 Customer Orders</h2>

        {/* Date Filter Inputs */}
        <div className="row mb-4">
          <div className="col-md-4">
            <label className="fw-bold">Start Date</label>
            <input
              type="date"
              className="form-control border border-primary shadow-sm"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              max={today} // Restrict future dates
            />
          </div>
          <div className="col-md-4">
            <label className="fw-bold">End Date</label>
            <input
              type="date"
              className="form-control border border-primary shadow-sm"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              min={startDate} // Ensure end date is after start date
              max={today} // Restrict future dates
            />
          </div>
          <div className="col-md-4 d-flex align-items-end">
            <button
              className="btn btn-primary w-100 fw-bold"
              onClick={() => {
                setStartDate("");
                setEndDate("");
              }}
            >
              Clear Filters
            </button>
          </div>
        </div>
        <div className="text-end mb-4">
  <DownloadReport filteredOrders={filteredOrders} />
</div>


        {filteredOrders.length === 0 ? (
          <div className="alert alert-info text-center">
            No orders found for the selected date range 😊
          </div>
        ) :  (
          
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
                  <p>
                    <strong>Name:</strong> {order.customer.name}
                  </p>
                  <p>
                    <strong>Email:</strong> {order.customer.email}
                  </p>
                  <p>
                    <strong>Phone:</strong> {order.customer.phone}
                  </p>
                  <p>
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
                            <small className="text-muted">
                              ₹{product.price.toLocaleString()}
                            </small>
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
                    Total:{" "}
                    <span className="text-primary">
                      ₹{order.total.toLocaleString()}
                    </span>
                  </h5>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <footer className="bg-black text-white text-center py-3">
        <h4>&copy; 2025 Home Appliance Service. All rights reserved.</h4>
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

export default Mainorders;
