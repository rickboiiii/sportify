import React from "react";
import ProfileSumCard from "../ProfileCard/ProfileSumCard";
import "./SuggestedForYou.css";

const SuggestedForYou = ({ profiles }) => {
    return (
        <div className="suggested-container">
            <h1>Suggested for you</h1>
            {profiles.map((profile, index) => (
                <ProfileSumCard
                    key={index}
                    username={profile.username}
                    fullname={profile.fullname}
                />
            ))}
        </div>
    );
};

export default SuggestedForYou;
