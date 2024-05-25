// src/components/PopupForm.js
import React from 'react';
import './PopupForm.css';

const PopupForm = ({ onClose }) => {
    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
        onClose(); // Close the popup after form submission
    };

    return (
        <div className="popup">
            <div className="popup-inner">
                <h2>Create a Post</h2>
                <form onSubmit={handleSubmit}>
                    <textarea placeholder="What's on your mind?" required></textarea>
                    <div className="popup-buttons">
                        <button type="submit">Post</button>
                        <button type="button" onClick={onClose}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default PopupForm;
