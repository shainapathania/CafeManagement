import React, { useState, useEffect } from "react";
import "./Styles/AddFood.css";
import axios from "axios";
import CafeNavbar from "./CafeNavbar";
import Dropdown from 'react-bootstrap/Dropdown';

const AddFood = () => {
  const [foodDetails, setFoodDetails] = useState({
    name: "",
    price: "",
    categoryId: "",
    file: null // Use 'file' instead of 'image' to match the state
  });

  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const currentUser = localStorage.getItem("userID");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:8086/category/fetch");
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []); // Empty dependency array to fetch categories only once on component mount

  const handleChange = (e) => {
    const { id, value } = e.target;
    if (id === "file") {
      setFoodDetails((prevDetails) => ({
        ...prevDetails,
        file: e.target.files[0]
      }));
    } else {
      setFoodDetails((prevDetails) => ({
        ...prevDetails,
        [id]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const formData = new FormData();
        formData.append("name", foodDetails.name);
        formData.append("price", foodDetails.price);
        formData.append("categoryId", foodDetails.categoryId);
        formData.append("file", foodDetails.file);
        formData.append("userId", currentUser);

        const response = await axios.post(
          "http://localhost:8086/products/register",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data"
            }
          }
        );

        console.log("Food added:", response.data);
        setFoodDetails({
          name: "",
          price: "",
          categoryId: "",
          file: null // Reset file state after successful submission
        });
      } catch (error) {
        console.error("Error adding food:", error);
      }
    }
  };

  const validateForm = () => {
    // Add your form validation logic here if needed
    return true;
  };

  return (
    <>
      <CafeNavbar />
      <div
        style={{
          backgroundImage: `url("https://cdn.pixabay.com/photo/2020/03/13/04/01/breakfast-on-board-of-the-iron-4926867_1280.jpg")`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          minHeight: "90vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div className="container mt-4 ">
          <div className="card cards">
            <div className="card-body">
              <h5 className="card-title">Add Item</h5>
              <form onSubmit={handleSubmit}>
                <div className="row mb-3">
                  <div className="col">
                    <div className="form-group">
                      <label htmlFor="name" className="form-label">
                        Item Title
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        placeholder="Enter Item name"
                        value={foodDetails.name}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="col">
                    <div className="form-group">
                      <label htmlFor="price" className="form-label">
                        Item Price
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="price"
                        placeholder="Enter price"
                        value={foodDetails.price}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col">
                    <div className="form-group">
                      <label htmlFor="categoryId" className="form-label">
                        Category
                      </label>
                      <Dropdown onSelect={(eventKey) => setFoodDetails(prev => ({...prev, categoryId: eventKey}))}>
                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                          {selectedCategory || 'Select Category'}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          {categories.map((category) => (
                            <Dropdown.Item key={category.id} eventKey={category.categoryId}>
                              {category.name}
                            </Dropdown.Item>
                          ))}
                        </Dropdown.Menu>
                      </Dropdown>
                    </div>
                  </div>
                  <div className="col">
                    <div className="form-group">
                      <label htmlFor="image" className="form-label">
                        Select Image
                      </label>
                      <input
                        type="file"
                        className="form-control"
                        id="file"
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <div className="col">
                    <button type="submit">Submit</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddFood;