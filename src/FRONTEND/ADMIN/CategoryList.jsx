import React, { useState, useEffect } from "react";
import axios from "axios";
import SubcategoryList from "./SubcategoryList";
import Header from "./Header";
import "./Style/CategoryList.css"
function CategoryList() {
  const [categories, setCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get("http://localhost:5000/categories");
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleDelete = async (categoryId) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      try {
        await axios.delete(`http://localhost:5000/categories/${categoryId}`);
        fetchCategories();
        setSelectedCategoryId(null); // Reset subcategory view
      } catch (error) {
        console.error("Error deleting category:", error);
      }
    }
  };

  return (
    <>
      <Header />
      <div className="category-list-container">
        <div className="main-content">
          <div className="table-wrapper2">
            <h1>Categories</h1>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((category) => (
                  <tr key={category.productcategory_id}>
                    <td>{category.productcategory_id}</td>
                    <td>{category.productcategory_name}</td>
                    <td>{category.productcategory_description}</td>
                    <td>
                      <button
                        onClick={() =>
                          setSelectedCategoryId(category.productcategory_id)
                        }
                      >
                        View Subcategories
                      </button>
                      <button
                        onClick={() => handleDelete(category.productcategory_id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Show subcategories if a category is selected */}
            {selectedCategoryId && (
              <SubcategoryList categoryId={selectedCategoryId} />
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default CategoryList;
