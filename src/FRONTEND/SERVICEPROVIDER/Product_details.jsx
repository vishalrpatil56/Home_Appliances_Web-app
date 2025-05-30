import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Header1 from "./Header1";


const ProductDetails = () => {
    const today = new Date().toISOString().split('T')[0];
    
    const [formData, setFormData] = useState({
        productName: "",
        category: "",
        subCategory: "",
        description: "",
        price: "",
        quantity: "",
        image: null,
        brand: "",
        date: "",
    });
    
    const [subCategories, setSubCategories] = useState([]);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: files ? files[0] : value,
        }));

        if (name === "category") {
            updateSubCategories(value);
        }
    };
    const updateSubCategories = (category) => {
        switch (category) {
            case "Television":
                setSubCategories(["LED", "QLED"]);
                break;
            case "Refrigerator":
                setSubCategories(["Double Door", "Single Door", "Tripple Door", "Side-by-side Door"]);
                break;
            case "Washing Machine":
                setSubCategories(["Top Load", "Front Load"]);
                break;
            case "Air Conditioners":
                setSubCategories(["Window AC", "Split AC"]);
                break;
            default:
                setSubCategories([]);
                break;
        }
        setFormData((prev) => ({ ...prev, subCategory: "" }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formDataToSend = new FormData();
        formDataToSend.append("productName", formData.productName);
        formDataToSend.append("description", formData.description);
        formDataToSend.append("price", formData.price);
        formDataToSend.append("quantity", formData.quantity);
        formDataToSend.append("brand", formData.brand);
        if (formData.image) {
            formDataToSend.append("image", formData.image);
        }
        formDataToSend.append("subCategory", formData.subCategory); // Send subCategory name

        try {
            const response = await axios.post("http://localhost:5000/add-product",formDataToSend,{ headers: { "Content-Type": "multipart/form-data" } });

            if (response.status === 200) {
                alert("Product added successfully!");
                setFormData({
                    productName: "",
                    category: "",
                    subCategory: "",
                    description: "",
                    price: "",
                    quantity: "",
                    image: "",
                    brand: "",
                    date: "",
                });
                setSubCategories([]);
            } else {
                alert("Failed to add product");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Error adding product");
        }
    };

    return (
        <>
            <Header1 />
            <div className="container mt-5">
                <div className="card shadow-lg p-5">
                    <div className="row">
                        <div className="col-md-5 d-flex align-items-center justify-content-center">
                            <img
                                src="home.png"
                                alt="Home Appliances"
                                className="img-fluid"
                                style={{ maxWidth: "100%", height: "auto" }}
                            />
                        </div>

                        <div className="col-md-7">
                            <h3 className="text-center mb-4">PRODUCT DETAILS</h3>

                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="productName"
                                        placeholder="Enter product Name"
                                        value={formData.productName}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="mb-3">
                                    <select
                                        className="form-select"
                                        name="category"
                                        value={formData.category}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="">Select Product Category</option>
                                        <option value="Television">Television</option>
                                        <option value="Refrigerator">Refrigerator</option>
                                        <option value="Washing Machine">Washing Machine</option>
                                        <option value="Air Conditioners">Air Conditioners</option>
                                    </select>
                                </div>

                                <div className="mb-3">
                                    <select
                                        className="form-select"
                                        name="subCategory"
                                        value={formData.subCategory}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="">Select Product Sub Category</option>
                                        {subCategories.map((subCategory) => (
                                            <option key={subCategory} value={subCategory}>
                                                {subCategory}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="mb-3">
                                    <textarea
                                        className="form-control"
                                        name="description"
                                        placeholder="Enter product Description"
                                        value={formData.description}
                                        onChange={handleChange}
                                        rows="3"
                                        required
                                    />
                                </div>

                                <div className="mb-3 d-flex gap-3">
                                    <input
                                        type="number"
                                        className="form-control"
                                        name="price"
                                        placeholder="Enter product Price"
                                        value={formData.price}
                                        onChange={handleChange}
                                        required
                                    />
                                    <input
                                        type="number"
                                        className="form-control"
                                        name="quantity"
                                        placeholder="Enter product quantity"
                                        value={formData.quantity}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="mb-3">
                                    <input
                                        type="file"
                                        className="form-control"
                                        name="image"
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="mb-3">
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="brand"
                                        placeholder="Enter product Brand Name"
                                        value={formData.brand}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="mb-3">
                                    <input
                                        type="date"
                                        className="form-control"
                                        name="date"
                                        value={formData.date}
                                        onChange={handleChange}
                                        required
                                        max={today} // Set the maximum allowed date to today
                                    />
                                </div>

                                <div className="text-center">
                                    <button type="submit" className="btn btn-primary w-100">
                                        Insert
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            
        </>
    );
};

export default ProductDetails;