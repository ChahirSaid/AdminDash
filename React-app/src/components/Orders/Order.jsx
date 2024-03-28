import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Order.scss";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const Order = () => {
  const [formData, setFormData] = useState({
    product_name: "",
    customer_name: "",
    product_price: 0,
    status: "Pending",
  });

  const [products, setProducts] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [orderData, setOrderData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchOrderData();
    fetchProducts();
    fetchCustomers();
  }, []);

  const fetchOrderData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/orders");
      setOrderData(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching order data:", error);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/products");
      setProducts(response.data);
      console.log("Products:", response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const fetchCustomers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/customer");
      setCustomers(response.data);
    } catch (error) {
      console.error("Error fetching customers:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        console.log("Selected Product Name:", formData.product_name);
        console.log("Selected Customer Name:" , formData.customer_name);
        const selectedProduct = products.find(product => product.name === formData.product_name);  
        console.log("Selected Product:", selectedProduct);

        const selectedCustomer = customers.find(customer => customer.name === formData.customer_name);  
        console.log("Selected Customer:", selectedCustomer);
        const orderData = {
            product_name: selectedProduct ? selectedProduct.name : '',
            customer_name: selectedCustomer ? selectedCustomer.name : '',
            price: selectedProduct ? selectedProduct.price : 0,
            status: formData.status
        };
  
        await axios.post("http://localhost:5000/api/orders", orderData);
  
        fetchOrderData();
        resetFormData();
        setShowModal(false);
        setIsEdit(false);
    } catch (error) {
        console.error("Error submitting order data:", error);
    }
};

  const resetFormData = () => {
    setFormData({
      product_name: "",
      customer_name: "",
      product_price: 0,
      status: "Pending",
    });
  };

  const handleInputChange = async (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  
    if (name === "product") {
      try {
        const product = products.find(product => product.name === value);
        if (product) {
          setFormData(prevData => ({
            ...prevData,
            product_name: product.name,
            product_price: product.price
          }));
        }
      } catch (error) {
        console.error("Error fetching product price:", error);
      }
    }
    if (name === "customer") {
      const customer = customers.find(customer => customer.name === value);
      if (customer) {
        setFormData(prevData => ({ ...prevData, customer_name: customer.name }));
      }
    }
  };
  
  const handleEdit = (index) => {
    setIsEdit(true);
    setEditId(orderData[index].id);
    setShowModal(true);
    setFormData(orderData[index]);
  };

  const handleDelete = async (index) => {
    try {
      await axios.delete(`http://localhost:5000/api/orders/${orderData[index].id}`);
      fetchOrderData();
    } catch (error) {
      console.error("Error deleting order:", error);
    }
  };
  return (
    <section className="order-page">
      <div className="row">
        <div className="col-12">
          <button
            className="btn btn-primary newUser"
            onClick={() => setShowModal(true)}
          >
            New Order <i className="bi bi-bag"></i>
          </button>
        </div>
      </div>
  
      <div className="row">
        <div className="col-12">
          <table className="table table-striped table-hover mt-3 text-center table-bordered">
            <thead>
              <tr>
                <th>S.No</th>
                <th>Product</th>
                <th>Customer</th>
                <th>Status</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="6">Loading...</td>
                </tr>
              ) : Array.isArray(orderData) ? (
                orderData.map((order, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{order.product_name}</td>
                    <td>{order.customer_name}</td>
                    <td>{order.status}</td>
                    <td>{order.product_price}</td>
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
                  <div className="inputField">
                    <div>
                      <label htmlFor="product">Product:</label>
                      <select
                        name="product"
                        id="product"
                        value={formData.product_id}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="">Select Product</option>
                        {products.map((product) => (
                          <option key={product.id} value={product.name}>
                            {product.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label htmlFor="customer">Customer:</label>
                      <select
                        name="customer"
                        id="customer"
                        value={formData.customer_id}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="">Select Customer</option>
                        {customers.map((customer) => (
                          <option key={customer.id} value={customer.name}>
                            {customer.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label htmlFor="price">Price:</label>
                      <input
                        type="number"
                        name="product_price"
                        id="price"
                        value={formData.product_price}
                        onChange={handleInputChange}
                        required
                        disabled
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
                        <option value="Delivered">Delivered</option>
                        <option value="Pending">Pending</option>
                        <option value="Canceled">Canceled</option>
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
                      Save
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

export default Order;
