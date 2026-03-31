import React from 'react'
import Header from './Header';
import Home from './Home';

function Admindashboard() {
  return (
    <>
   <Header/>
   <Home/>
        </>
  )
}

export default Admindashboard;

/*
import React, { useEffect, useState } from 'react';
import Header from './Header';
import Home from './Home';

function Admindashboard() {

  const [products, setProducts] = useState([]);

  // ✅ Fetch products
  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error(err));
  }, []);

  // ✅ Delete product
  const handleDelete = async (id) => {
    await fetch(`http://localhost:5000/api/delete-product/${id}`, {
      method: "DELETE"
    });

    // remove from UI
    setProducts(products.filter(p => p.product_id !== id));
  };

  return (
    <>
      <Header />
      <Home />

      {/* ✅ PRODUCT MANAGEMENT SECTION *//*}
      <div style={{ padding: "20px" }}>
        <h2>Manage Products</h2>

        <table border="1" width="100%" cellPadding="10">
          <thead style={{ backgroundColor: "#1976d2", color: "white" }}>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Price</th>
              <th>Image</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {products.map((p) => (
              <tr key={p.product_id}>
                <td>{p.product_id}</td>
                <td>{p.product_name}</td>
                <td>₹{p.product_price}</td>

                <td>
                  <img
                    src={`http://localhost:5000/uploads/${p.product_image}`}
                    width="80"
                    alt="product"
                  />
                </td>

                <td>
                  <button
                    style={{
                      backgroundColor: "red",
                      color: "white",
                      padding: "5px 10px",
                      border: "none",
                      cursor: "pointer"
                    }}
                    onClick={() => handleDelete(p.product_id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Admindashboard;*/