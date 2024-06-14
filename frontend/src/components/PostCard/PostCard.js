
import "./PostCard.css";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faMessage } from "@fortawesome/free-solid-svg-icons";

const PostCard = ({ userImage, userName, postContent, postImage, onLike, onComment }) => {
    return (
        <div className="post-card">
            <div className="post-header">
                <Image src={userImage} alt={userName} className="user-image" width={40} height={40} />
                <a href="#" className="user-name">{userName}</a>
            </div>
            <div className="post-content">
                {postContent && <p>{postContent}</p>}
                {postImage && <Image src={postImage} alt="Post image" className="post-image" />}
            </div>
            <div className="post-actions">
                <button onClick={onLike}><FontAwesomeIcon icon={faHeart} style={{ color: "#1c64a3" }} /></button>
                <button onClick={onComment}><FontAwesomeIcon icon={faMessage} style={{ color: "#1c64a3" }} /></button>
            </div>
        </div>
    );
};

export default PostCard;
