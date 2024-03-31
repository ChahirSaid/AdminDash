import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Customer.scss";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import {
  BsPlus,
  BsPencilSquare,
  BsTrash,
} from "react-icons/bs";

const Customer = () => {
  const initialFormData = {
    name: "",
    age: "",
    city: "",
    email: "",
    phone: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [customerData, setCustomerData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchCustomerData();
  }, []);

  const fetchCustomerData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/customer");
      setCustomerData(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching customer data:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEdit) {
        await axios.put(`http://localhost:5000/api/customer/${editId}`, formData);
      } else {
        await axios.post("http://localhost:5000/api/customer", formData);
      }
      fetchCustomerData();
      setFormData(initialFormData);
      setShowModal(false);
      setIsEdit(false);
    } catch (error) {
      console.error("Error submitting customer data:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleEdit = (index) => {
    setIsEdit(true);
    setEditId(customerData[index].id);
    setShowModal(true);
    setFormData({ ...customerData[index] });
  };

  const handleDelete = async (index) => {
    try {
      await axios.delete(`http://localhost:5000/api/customer/${customerData[index].id}`);
      fetchCustomerData();
    } catch (error) {
      console.error("Error deleting customer:", error);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setFormData(initialFormData);
  };

  return (
    <section className="customer-page">
      <div className="row">
        <div className="col-12">
          <button
            className="btn btn-primary newUser"
            onClick={() => {
              setShowModal(true);
              setIsEdit(false);
              setFormData(initialFormData);
            }}
          >
            New Customer <BsPlus size={25} />
          </button>
        </div>
      </div>

      <div className="row">
        <div className="col-12">
          <table className="table table-striped table-hover mt-3 text-center table-bordered">
            <thead>
              <tr>
                <th>S.No</th>
                <th>Name</th>
                <th>Age</th>
                <th>City</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="7">Loading...</td>
                </tr>
              ) : Array.isArray(customerData) ? (
                customerData.map((customer, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{customer.name}</td>
                    <td>{customer.age}</td>
                    <td>{customer.city}</td>
                    <td>{customer.email}</td>
                    <td>{customer.phone}</td>
                    <td>
                      <button
                        className="btn btn-success"
                        onClick={() => handleEdit(index)}
                      >
                        <BsPencilSquare />
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDelete(index)}
                      >
                        <BsTrash />
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
                  onClick={handleCloseModal}
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleSubmit} id="myForm">
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
                      <label htmlFor="age">Age:</label>
                      <input
                        type="number"
                        name="age"
                        min="18"
                        max="120"
                        id="age"
                        value={formData.age}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="city">City:</label>
                      <input
                        type="text"
                        name="city"
                        id="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="email">E-mail:</label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="phone">Phone:</label>
                      <input
                        type="text"
                        name="phone"
                        id="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={handleCloseModal}
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

export default Customer;
