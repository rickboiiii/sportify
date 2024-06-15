
import "./PostCard.css";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faMessage } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

const PostCard = ({ event, props }) => {
    function onLike() {

    }

    function onComment() {

    }

    return (
        <div className="post-card">
            <div className="post-header">
                <div className={"profilna-slika"}></div>
                {/* treba zamijeniti za sliku*/}
                <Link className={"username"} href={`/profiles/igraci/id/${event.id_korisnika}`}>{event.korisnicko_ime}</Link>
                {/* na ovo mjesto treba da ide username i slika */}
            </div>
            <div className="post-content">
                <p>{event.tekst_objave}</p>
            </div>
            <div className="post-actions">
                <button onClick={onLike}><FontAwesomeIcon icon={faHeart} style={{ color: "#1c64a3" }} /></button>
                <button onClick={onComment}><FontAwesomeIcon icon={faMessage} style={{ color: "#1c64a3" }} /></button>
            </div>
        </div>
    );
};

export default PostCard;
