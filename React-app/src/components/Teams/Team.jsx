import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './Team.scss';

const Team = () => {
    const [formData, setFormData] = useState({
        picture: '',
        employeeName: '',
        employeeAge: '',
        employeeCity: '',
        employeeEmail: '',
        employeePhone: '',
        employeePost: '',
        startDate: ''
    });

    const [teamData, setTeamData] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [editIndex, setEditIndex] = useState(null);

    useEffect(() => {
        const storedData = localStorage.getItem('teamData');
        if (storedData) {
            setTeamData(JSON.parse(storedData));
        }
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isEdit) {
            const updatedData = teamData.map((member, index) =>
                index === editIndex ? formData : member
            );
            setTeamData(updatedData);
            setIsEdit(false);
            setEditIndex(null);
        } else {
            setTeamData([...teamData, formData]);
        }
        localStorage.setItem('teamData', JSON.stringify(teamData));
        setFormData({
            picture: '',
            employeeName: '',
            employeeAge: '',
            employeeCity: '',
            employeeEmail: '',
            employeePhone: '',
            employeePost: '',
            startDate: ''
        });
        setShowModal(false);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleEdit = (index) => {
        setIsEdit(true);
        setEditIndex(index);
        setShowModal(true);
        setFormData(teamData[index]);
    };

    const handleDelete = (index) => {
        const updatedData = teamData.filter((_, i) => i !== index);
        setTeamData(updatedData);
        localStorage.setItem('teamData', JSON.stringify(updatedData));
    };

    return (
            <section className="team-page">
                <div className="row">
                    <div className="col-12">
                        <button className="btn btn-primary newUser" onClick={() => setShowModal(true)}>
                            New User <i className="bi bi-people"></i>
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
                                {teamData.map((member, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td><img src={member.picture} alt="" width="50" height="50" /></td>
                                        <td>{member.employeeName}</td>
                                        <td>{member.employeeAge}</td>
                                        <td>{member.employeeCity}</td>
                                        <td>{member.employeeEmail}</td>
                                        <td>{member.employeePhone}</td>
                                        <td>{member.employeePost}</td>
                                        <td>{member.startDate}</td>
                                        <td>
                                            <button className="btn btn-success" onClick={() => handleEdit(index)}><i className="bi bi-pencil-square"></i></button>
                                            <button className="btn btn-danger" onClick={() => handleDelete(index)}><i className="bi bi-trash"></i></button>
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
