
import "./PostCard.css";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faMessage } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import stock_pic from "@/images/stock_pic.png";
import React, {useEffect, useState} from "react";

const PostCard = ({ event, props }) => {
    const [likeCount, setLikeCount] = useState(event.likes || 0);
    const [isLiked, setIsLiked] = useState(false);

    useEffect(() => {
        // Provjera da li je trenutni korisnik vec lajkao objavu
        const checkIfLiked = async () => {
            try {
                const response = await fetch(`http://localhost:8000/check_like/${event.id_korisnika}/${event.id_objave}`);
                const data = await response.json();
                setIsLiked(data.isLiked)
            } catch (error) {
                console.error("Greška u provjeri like statusa!", error);
            }
        };

        checkIfLiked();
    }, []);

    const handleLike = async () => {
        try {
            const response = await fetch(`http://localhost:8000/like/${event.id_korisnika}/${event.id_objave}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                setLikeCount(likeCount + 1);
                setIsLiked(true);
            }
        } catch (error) {
            console.error("Error liking post:", error);
        }
    };

    const handleUnlike = async () => {
        try {
            const response = await fetch(`http://localhost:8000/unlike/${event.id_korisnika}/${event.id_objave}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                setLikeCount(likeCount - 1);
                setIsLiked(false);
            }
        } catch (error) {
            console.error("Error unliking post:", error);
        }
    };

    function onComment() {

    }

    return (
        <div className="post-card">
            <div className="post-header">
                <div className={"profilna-slika"}>
                    <Image src={event.slika ?? stock_pic} alt={"Profile Picture"}/>
                </div>
                <Link
                  className={"username"}
                  href={`/profiles/igraci/id/${event.id_organizatora}`}
                >
                  {event.korisnicko_ime}
                </Link>
            </div>
            <div className="post-content">
                <p>{event.tekst_objave}</p>
            </div>
            <div className="post-actions">
                <button onClick={isLiked ? handleUnlike : handleLike}>
                    {isLiked ? 'Unlike' : 'Like'}
                </button>
                <span>{likeCount} likes</span>
            </div>
            <div className="post-comments">
                <p></p>
            </div>
        </div>
    );
};

export default PostCard;
