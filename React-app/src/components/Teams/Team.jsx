import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './Team.scss';

const Team = () => {
    const [formData, setFormData] = useState({
        picture: "",
        employeeName: "",
        employeeAge: "",
        employeeCity: "",
        employeeEmail: "",
        employeePhone: "",
        employeePost: "",
        startDate: ""
    });

    const [teamData, setTeamData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [editId, setEditId] = useState(null);
    const isAdmin = true;
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
            await axios.put(`http://localhost:5000/api/team/${editId}`, formData);
        } else {
            response = await axios.post("http://localhost:5000/api/team", formData);
        }
        if (response) {
            const { username, password } = response.data;
            console.log("Generated Credentials:");
            console.log("Username:", username);
            console.log("Password:", password);
        }
        fetchTeamData();
        setFormData({
            picture: "",
            employeeName: "",
            employeeAge: "",
            employeeCity: "",
            employeeEmail: "",
            employeePhone: "",
            employeePost: "",
            startDate: ""
        });
        setShowModal(false);
        setIsEdit(false);
        } catch (error) {
          console.error("Error Submitting team data:", error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
  
    const handleEdit = (index) => {
      if (isAdmin) {
        setIsEdit(true);
        setEditId(teamData[index].id);
        setShowModal(true);
        
        const selectedMember = teamData[index];
        
        setFormData({
            picture: selectedMember.picture,
            employeeName: selectedMember.name,
            employeeAge: selectedMember.age,
            employeeCity: selectedMember.city,
            employeeEmail: selectedMember.email,
            employeePhone: selectedMember.phone,
            employeePost: selectedMember.post,
            startDate: selectedMember.start_date
        });
    }
    };
    

    const handleDelete = async (index) => {
      if (isAdmin) {
        try {
          await axios.delete(`http://localhost:5000/api/team/${teamData[index].id}`);
          fetchTeamData();
        } catch (error) {
          console.error("Error Deleting Team Member:", error);
        }
      }
    };

    return (
            <section className="team-page">
                <div className="row">
                    <div className="col-12">
                    {isAdmin && (
                        <button className="btn btn-primary newUser" onClick={() => setShowModal(true)}>
                            New User <i className="bi bi-people"></i>
                        </button>
                    )}
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
                                    <th>Age</th>
                                    <th>City</th>
                                    <th>Email</th>
                                    <th>Phone</th>
                                    <th>Post</th>
                                    <th>Start Date</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                            {teamData.map((member, index) => {
                                const formatDate = (dateString) => {
                                    if (!dateString) return "N/A"; // Handle empty dates
                
                                    const options = {
                                    year: "numeric",
                                    month: "2-digit",
                                    day: "2-digit",
                                    };
                                    const formattedDate = new Date(dateString).toLocaleDateString(
                                    undefined,
                                    options
                                    );
                                    return formattedDate !== "Invalid Date"
                                    ? formattedDate
                                    : "N/A"; // Handle invalid dates
                                };
                                return (
                                    <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td><img src={member.picture} alt="" width="50" height="50" /></td>
                                    <td>{member.name}</td>
                                    <td>{member.age}</td>
                                    <td>{member.city}</td>
                                    <td>{member.email}</td>
                                    <td>{member.phone}</td>
                                    <td>{member.post}</td>
                                    <td>{formatDate(member.startDate)}</td>
                                    {console.log("Start Date:", member.startDate)}
                                    <td>
                                      {isAdmin && (
                                          <button className="btn btn-success" onClick={() => handleEdit(index)}><i className="bi bi-pencil-square"></i></button>
                                          )}
                                      {isAdmin && (
                                          <button className="btn btn-danger" onClick={() => handleDelete(index)}><i className="bi bi-trash"></i></button>
                                      )}
                                    </td>
                                </tr>
                            );
                        })}
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
                                <button type="button" className="btn-close" onClick={() => setShowModal(false)} aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={handleSubmit} id="myForm">
                                    <div className="card imgholder">
                                        <label htmlFor="imgInput" className="upload">
                                            <input type="file" name="picture" id="imgInput" onChange={handleInputChange} />
                                            <i className="bi bi-plus-circle-dotted"></i>
                                        </label>
                                        <img src={formData.picture} alt="" width="200" height="200" className="img" />
                                    </div>
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
                                        <div>
                                            <label htmlFor="sDate">Start Date:</label>
                                            <input type="date" name="startDate" id="sDate" value={formData.startDate} onChange={handleInputChange} required />
                                        </div>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Close</button>
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
