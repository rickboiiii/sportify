import React from "react";
import "./ProfileSumCard.css";

const ProfileSumCard = ({ username, fullname }) => {
    return (
        <div className="profile-card">
            <div className="profile-image"></div>
            <div className="profile-info">
                <p className="username">{username}</p>
                <p className="fullname">{fullname}</p>
            </div>
            <div className="follow-button">follow</div>
        </div>
    );
};

export default ProfileSumCard;
