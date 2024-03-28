// Profile.jsx

import React, { useState } from 'react';
import './Profile.scss';

const Profile = () => {
    const [previewImg, setPreviewImg] = useState("placeholder.png");
    const [message, setMessage] = useState('');
    const previewImage = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
    
        reader.onloadend = () => {
            setPreviewImg(reader.result);
        }
    
        if (file) {
            reader.readAsDataURL(file);
        } else {
            setPreviewImg("placeholder.png");
        }
    }
    const handleSubmit = async (event) => {
        event.preventDefault();

        // Validation
        const oldPassword = document.getElementById('oldPassword').value;
        const newPassword = document.getElementById('newPassword').value;
        const confirmPassword = document.getElementById('confirmPassword').value;

        if (newPassword !== confirmPassword) {
            setMessage("New password and confirm password do not match");
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/api/team/update_password', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({ oldPassword, newPassword }),
            });

            if (!response.ok) {
                throw new Error('Failed to update password');
            }

            const data = await response.json();
            setMessage(data.message);
        } catch (error) {
            setMessage("An error occurred while updating the password");
        }
    };

    return (
    <section className="profile-page">
        <div className="profile-container">
            <form id="changePasswordForm" encType="multipart/form-data" onSubmit={handleSubmit}>
                <div className="profile-form-group">
                    <div className="profile-imgholder-container">
                        <div className="profile-imgholder">
                            <img src={previewImg || "placeholder.png"} alt="" width="200" height="200" className="profile-showImg" id="previewImg" />
                            <input type="file" id="picture" name="picture" accept="image/*" onChange={previewImage} />
                        </div>
                    </div>
                </div>
                <div className="profile-form-group">
                    <label htmlFor="oldPassword" className="profile-label">Old Password:</label>
                    <input type="password" id="oldPassword" name="oldPassword" className="profile-input" />
                </div>
                <div className="profile-form-group">
                    <label htmlFor="newPassword" className="profile-label">New Password:</label>
                    <input type="password" id="newPassword" name="newPassword" className="profile-input" />
                </div>
                <div className="profile-form-group">
                    <label htmlFor="confirmPassword" className="profile-label">Confirm Password:</label>
                    <input type="password" id="confirmPassword" name="confirmPassword" className="profile-input" />
                </div>
                {message && <p>{message}</p>}
                <button type="submit" className="profile-button">Save</button>
            </form>
        </div>
    </section>
  );
}

export default Profile;
