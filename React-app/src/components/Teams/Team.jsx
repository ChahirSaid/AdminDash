import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './Team.scss';
import { BsPlus, BsPencilSquare, BsTrash } from "react-icons/bs";

const Team = () => {
    const initialFormData = {
        employeeName: "",
        employeeAge: "",
        employeeCity: "",
        employeeEmail: "",
        employeePhone: "",
        employeePost: ""
    };

    const [formData, setFormData] = useState(initialFormData);
    const [teamData, setTeamData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [editId, setEditId] = useState(null);

    useEffect(() => {
        fetchTeamData();
    }, []);

    const fetchTeamData = async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/team");
            setTeamData(response.data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching team data:", error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let response;
            if (isEdit) {
                response = await axios.put(`http://localhost:5000/api/team/${editId}`, formData);
            } else {
                response = await axios.post("http://localhost:5000/api/team", formData);
            }            
            if (response.status === 200 || response.status === 201) {
                setShowModal(false);
                fetchTeamData();
                setFormData(initialFormData);
                setIsEdit(false);
            } else {
                console.error("Error: Unexpected status code", response.status);
            }
        } catch (error) {
            console.error("Error Submitting team data:", error);
        }
    };
    
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleEdit = (index) => {
        setIsEdit(true);
        setEditId(teamData[index].id);
        const selectedMember = teamData[index];
        setFormData({
            employeeName: selectedMember.name,
            employeeAge: selectedMember.age,
            employeeCity: selectedMember.city,
            employeeEmail: selectedMember.email,
            employeePhone: selectedMember.phone,
            employeePost: selectedMember.post
        });
        setShowModal(true);
    };

    const handleDelete = async (index) => {
        try {
            await axios.delete(`http://localhost:5000/api/team/${teamData[index].id}`);
            fetchTeamData();
        } catch (error) {
            console.error("Error Deleting Team Member:", error);
        }
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setFormData(initialFormData);
        setIsEdit(false);
    };

    return (
        <section className="team-page">
            <div className="row">
                <div className="col-12">
                    <button className="btn btn-primary newUser" onClick={() => setShowModal(true)}>
                        New User <BsPlus size={25} />
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
                                <th>Post</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {teamData.map((member, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{member.name}</td>
                                    <td>{member.age}</td>
                                    <td>{member.city}</td>
                                    <td>{member.email}</td>
                                    <td>{member.phone}</td>
                                    <td>{member.post}</td>
                                    <td>
                                        <button className="btn btn-success" onClick={() => handleEdit(index)}><BsPencilSquare /></button>
                                        <button className="btn btn-danger" onClick={() => handleDelete(index)}><BsTrash /></button>
                                    </td>
                                </tr>
                            ))}
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
                                <button type="button" className="btn-close" onClick={handleCloseModal} aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={handleSubmit} id="myForm">
                                    <div className="inputField">
                                        <div>
                                            <label htmlFor="name">Name:</label>
                                            <input type="text" name="employeeName" id="name" value={formData.employeeName} onChange={handleInputChange} required />
                                        </div>
                                        <div>
                                            <label htmlFor="age">Age:</label>
                                            <input type="number" name="employeeAge" id="age" value={formData.employeeAge} onChange={handleInputChange} required />
                                        </div>
                                        <div>
                                            <label htmlFor="city">City:</label>
                                            <input type="text" name="employeeCity" id="city" value={formData.employeeCity} onChange={handleInputChange} required />
                                        </div>
                                        <div>
                                            <label htmlFor="email">E-mail:</label>
                                            <input type="email" name="employeeEmail" id="email" value={formData.employeeEmail} onChange={handleInputChange} required />
                                        </div>
                                        <div>
                                            <label htmlFor="phone">Number:</label>
                                            <input type="text" name="employeePhone" id="phone" minLength="11" maxLength="11" value={formData.employeePhone} onChange={handleInputChange} required />
                                        </div>
                                        <div>
                                            <label htmlFor="post">Post:</label>
                                            <input type="text" name="employeePost" id="post" value={formData.employeePost} onChange={handleInputChange} required />
                                        </div>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>Close</button>
                                        <button type="submit" className="btn btn-primary">Submit</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}

export default Team;
