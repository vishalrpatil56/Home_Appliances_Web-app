import { useEffect, useState } from "react";
import axios from "axios";
import "./Style/CustomerList.css";
import Header from "./Header";

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/customerslist")
      .then((response) => setCustomers(response.data))
      .catch((error) => console.error("Error fetching customers:", error));
  }, []);


  const deleteCustomer = async (userId) => {
    if (window.confirm("Are you sure?")) {
      try {
        await axios.delete(`http://localhost:5000/customer/${userId}`);
        setCustomers(
          customers.filter((customer) => customer.user_id !== userId)
        );
      } catch (error) {
        console.error("Error deleting customer:", error);
      }
    }
  };



  

  return (<>
    <Header/>
    <div className="main-content">
      <div className="table-wrapper1">
        <h1 style={{ fontWeight: "bolder", fontFamily: "serif" }}>
          Customer List :
        </h1>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
            
              <th>Phone</th>
              <th>Email</th>
              <th>Password </th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => (
              <tr key={customer.user_id}>
                <td>{customer.user_id}</td>
                <td>{customer.user_name}</td>
               
                <td>{customer.user_contact}</td>
                <td>{customer.user_email}</td>
                <td>{customer.password} </td>
                <td>
                  <button
                    className="delete-btn"
                    onClick={() => deleteCustomer(customer.user_id)}
                  >
                   
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </>
  );
};

export default CustomerList;
