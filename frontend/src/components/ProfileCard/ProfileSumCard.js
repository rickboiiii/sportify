import React from "react";
import "./ProfileSumCard.css";
import Link from "next/link";

const ProfileSumCard = ({ username, ime, prezime, tip }) => {

    if (tip)
        tip = tip.toLowerCase()

    return (
        <div className="profile-card">
            <div className="profile-image"></div>
            <div className="profile-info">
                <Link href={`/profiles/${tip}i/username/${username}`}
                 style={{fontSize: "1rem", textDecoration: "none", color: "var(--oxion)", fontWeight: "bold", margin: "0"}
                }>
                    {username}
                </Link>
                <p className="fullname">{ime} {prezime}</p>
            </div>
            <div className="follow-button">follow</div>
        </div>
    );
};

export default ProfileSumCard;
