import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Product.scss";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const Product = () => {
  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    price: 0,
    status: "In Stock",
  });

  const [productData, setProductData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchProductData();
  }, []);

  const fetchProductData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/products");
      setProductData(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching product data:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEdit) {
        await axios.put(`http://localhost:5000/api/products/${editId}`, formData);
      } else {
        await axios.post("http://localhost:5000/api/products", formData);
      }
      fetchProductData();
      setFormData({
        name: "",
        brand: "",
        price: 0,
        status: "In Stock",
      });
      setShowModal(false);
      setIsEdit(false);
    } catch (error) {
      console.error("Error submitting product data:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleEdit = (index) => {
    setIsEdit(true);
    setEditId(productData[index].id);
    setShowModal(true);
    setFormData(productData[index]);
  };

  const handleDelete = async (index) => {
    try {
      await axios.delete(`http://localhost:5000/api/products/${productData[index].id}`);
      fetchProductData();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };
  
  console.log("Product Data:", productData);
console.log("Loading:", loading);
console.log("Product Data Type:", Array.isArray(productData));

  return (
    <section className="product-page">
      <div className="row">
        <div className="col-12">
          <button
            className="btn btn-primary newUser"
            onClick={() => setShowModal(true)}
          >
            New Product <i className="bi bi-bag"></i>
          </button>
        </div>
      </div>

      <div className="row">
        <div className="col-12">
          <table className="table table-striped table-hover mt-3 text-center table-bordered">
            <thead>
              <tr>
                <th>S.No</th>
                <th>Picture</th>
                <th>Name</th>
                <th>Brand</th>
                <th>Price</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="7">Loading...</td>
                </tr>
              ) : Array.isArray(productData) ? (
                productData.map((product, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>
                      <img src={product.picture} alt="" width="50" height="50" />
                    </td>
                    <td>{product.name}</td>
                    <td>{product.brand}</td>
                    <td>{product.price}</td>
                    <td>{product.status}</td>
                    <td>
                      <button
                        className="btn btn-success"
                        onClick={() => handleEdit(index)}
                      >
                        <i className="bi bi-pencil-square"></i>
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDelete(index)}
                      >
                        <i className="bi bi-trash"></i>
                      </button>
                    </td>
                  </tr>
              ))
            ) : null}
          </tbody>
        </table>
      </div>
    </div>

      {showModal && (
        <div className="modal fade show" style={{ display: "block" }}>
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title">Fill the Form</h4>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleSubmit} id="myForm">
                  <div className="card imgholder">
                    <label htmlFor="imgInput" className="upload">
                      <input type="file" name="" id="imgInput" />
                      <i className="bi bi-plus-circle-dotted"></i>
                    </label>
                    <img
                      src="/image/Profile Icon.webp"
                      alt=""
                      width="200"
                      height="200"
                      className="img"
                    />
                  </div>
                  <div className="inputField">
                    <div>
                      <label htmlFor="name">Name:</label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="brand">Brand:</label>
                      <input
                        type="text"
                        name="brand"
                        id="brand"
                        value={formData.brand}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="price">Price:</label>
                      <input
                        type="number"
                        name="price"
                        id="price"
                        value={formData.price}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="status">Status:</label>
                      <select
                        id="status"
                        name="status"
                        value={formData.status}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="In Stock">In Stock</option>
                        <option value="Out of Stock">Out of Stock</option>
                      </select>
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => setShowModal(false)}
                    >
                      Close
                    </button>
                    <button type="submit" className="btn btn-primary submit">
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};

export default Product;
