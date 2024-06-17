import React, {useEffect, useState} from "react";
import "./ProfileSumCard.css";
import Link from "next/link";
import {CardImg} from "@/components/Containers/ContainerStyled";
import stock_pic from "@/images/stock_pic.png"
import Image from "next/image";
import {useParams} from "next/navigation";

const ProfileSumCard = ({ username, ime, prezime, tip, slika, opis_slike }) => {
    const params = useParams();
    const currentUser = params.username;
    const [isFollowing, setIsFollowing] = useState(false);

    useEffect(() => {
        // Provjerimo da li trenutni korisnik prati korisnika kojeg potencijalno želi zapratiti
        const checkFollowing = async () => {
            try {
                const response = await fetch(`http://localhost:8000/check_follow/${currentUser}/${username}`);
                const data = await  response.json();
                setIsFollowing(data.isFollowing);
            } catch (error) {
                console.error("Greška priikom provjere!", error);
            }
        }
    }, []);

    // Kako cemo hendlati follow
    const handleFollow = async () => {
        try {
            const response = await fetch(`http://localhost:8000/follow/${currentUser}/${username}`,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ currentUser, username })
            });

            if (response.ok) {
                setIsFollowing(true);
            }

        } catch (error) {
            console.error("Follow failed: ", error);
        }
    }

    const handleUnfollow = async () => {
        try {
            const response = await fetch(`http://localhost:8000/unfollow/${currentUser}/${username}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ currentUser, username })
            });

            if (response.ok) {
                setIsFollowing(false);
            }

        } catch (error) {
            console.error("Follow failed: ", error);
        }
    }


    if (tip)
        tip = tip.toLowerCase()

    return (
        <div className="profile-card">
            <div className="profile-image">
                <Image src={slika ?? stock_pic} alt={opis_slike || "Profile Picture"} />
            </div>
            <div className="profile-info">
                <Link href={`/profiles/${tip}i/username/${username}`}
                 style={{fontSize: "1rem", textDecoration: "none", color: "var(--oxion)", fontWeight: "bold", margin: "0"}
                }>
                    {username}
                </Link>
                <p className="fullname">{ime} {prezime}</p>
            </div>
            <button className="follow-button" onClick={isFollowing ? handleUnfollow : handleFollow}>
                {isFollowing ? "unfollow" : 'follow'}
            </button>
        </div>
    );
};

export default ProfileSumCard;
