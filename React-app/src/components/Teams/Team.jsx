import React from 'react';
import './Team.scss';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';


const Team = () => {
    return (
            <section className="team-page">
                <div className="row">
                    <div className="col-12">
                        <button className="btn btn-primary newUser" data-bs-toggle="modal" data-bs-target="#userForm">
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
                            <tbody id="data"></tbody>
                        </table>
                    </div>
                </div>

            {/* Modal Form */}
            <div className="modal fade" id="userForm">
                <div className="modal-dialog modal-dialog-centered modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">Fill the Form</h4>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form action="#" id="myForm">
                                <div className="card imgholder">
                                    <label htmlFor="imgInput" className="upload">
                                        <input type="file" name="" id="imgInput" />
                                        <i className="bi bi-plus-circle-dotted"></i>
                                    </label>
                                    <img src="./image/Profile Icon.webp" alt="" width="200" height="200" className="img" />
                                </div>
                                <div className="inputField">
                                    <div>
                                        <label htmlFor="name">Name:</label>
                                        <input type="text" name="" id="name" required />
                                    </div>
                                    <div>
                                        <label htmlFor="age">Age:</label>
                                        <input type="number" name="" id="age" required />
                                    </div>
                                    <div>
                                        <label htmlFor="city">City:</label>
                                        <input type="text" name="" id="city" required />
                                    </div>
                                    <div>
                                        <label htmlFor="email">E-mail:</label>
                                        <input type="email" name="" id="email" required />
                                    </div>
                                    <div>
                                        <label htmlFor="phone">Number:</label>
                                        <input type="text" name="" id="phone" minLength="11" maxLength="11" required />
                                    </div>
                                    <div>
                                        <label htmlFor="post">Post:</label>
                                        <input type="text" name="" id="post" required />
                                    </div>
                                    <div>
                                        <label htmlFor="sDate">Start Date:</label>
                                        <input type="date" name="" id="sDate" required />
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="submit" form="myForm" className="btn btn-primary submit">Submit</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Read Data Modal */}
            <div className="modal fade" id="readData">
                <div className="modal-dialog modal-dialog-centered modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">Profile</h4>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form action="#" id="myForm">
                                <div className="card imgholder">
                                    <img src="./image/Profile Icon.webp" alt="" width="200" height="200" className="showImg" />
                                </div>
                                <div className="inputField">
                                    <div>
                                        <label htmlFor="name">Name:</label>
                                        <input type="text" name="" id="showName" disabled />
                                    </div>
                                    <div>
                                        <label htmlFor="age">Age:</label>
                                        <input type="number" name="" id="showAge" disabled />
                                    </div>
                                    <div>
                                        <label htmlFor="city">City:</label>
                                        <input type="text" name="" id="showCity" disabled />
                                    </div>
                                    <div>
                                        <label htmlFor="email">E-mail:</label>
                                        <input type="email" name="" id="showEmail" disabled />
                                    </div>
                                    <div>
                                        <label htmlFor="phone">Number:</label>
                                        <input type="text" name="" id="showPhone" minLength="11" maxLength="11" disabled />
                                    </div>
                                    <div>
                                        <label htmlFor="post">Post:</label>
                                        <input type="text" name="" id="showPost" disabled />
                                    </div>
                                    <div>
                                        <label htmlFor="sDate">Start Date:</label>
                                        <input type="date" name="" id="showsDate" disabled />
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Team;
