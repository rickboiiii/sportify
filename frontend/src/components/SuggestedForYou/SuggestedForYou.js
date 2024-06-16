import React from "react";
import ProfileSumCard from "../ProfileCard/ProfileSumCard";
import "./SuggestedForYou.css";

const SuggestedForYou = ({ profiles }) => {
    console.log(profiles)
    return (
        <div className="suggested-container">
            <h1>Suggested for you</h1>
            {profiles.map((profile, index) => (
                <ProfileSumCard
                    key={index}
                    username={profile.korisnicko_ime}
                    ime={profile.ime}
                    prezime={profile.prezime}
                    tip = {profile.tip_korisnika}
                />
            ))}
        </div>
    );
};

export default SuggestedForYou;
