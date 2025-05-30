import { useEffect, useState } from "react";
import axios from "axios";
import "./Style/CustomerList.css"; // Reuse your existing CSS
import Header from "./Header";

const ServiceProviderList = () => {
  const [serviceProviders, setServiceProviders] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/serviceproviderslist") // Adjust API endpoint
      .then((response) => setServiceProviders(response.data))
      .catch((error) =>
        console.error("Error fetching service providers:", error)
      );
  }, []);

  const deleteServiceProvider = async (serviceProviderId) => {
    if (!serviceProviderId) {
      console.error("Invalid service provider ID");
      return;
    }

    if (
      window.confirm("Are you sure? You want to delete this Service Provider?")
    ) {
      try {
        await axios.delete(
          `http://localhost:5000/serviceprovider/${serviceProviderId}`
        );

        setServiceProviders((prev) =>
          prev.filter(
            (provider) => provider.serviceprovider_id !== serviceProviderId
          )
        );

        alert("Service Provider Deleted Successfully!");
      } catch (error) {
        console.error("Error deleting service provider:", error);
        alert("An error occurred while deleting the service provider.");
      }
    }
  };

  return (
    <>
      <Header />
      <div className="main-content">
        <div className="table-wrapper1">
          <h1 style={{ fontWeight: "bolder", fontFamily: "serif" }}>
            Service Provider List :
          </h1>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>

                <th>Phone</th>
                <th>Email</th>
                <th>Password</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {serviceProviders.map((provider) => (
                <tr key={provider.serviceprovider_id}>
                  <td>{provider.serviceprovider_id}</td>
                  <td>{provider.serviceprovider_name}</td>

                  <td>{provider.serviceprovider_contact}</td>
                  <td>{provider.serviceprovider_email}</td>
                  <td>{provider.password}</td>
                  <td>
                    <button
                      className="delete-btn"
                      onClick={() =>
                        deleteServiceProvider(provider.serviceprovider_id)
                      } // Ensure correct ID
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

export default ServiceProviderList;
