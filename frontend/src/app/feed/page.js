"use client";

import "./Feed.css"

import SideBar from "@/components/SideBar/SideBar";
import StatusBar from "@/components/StatusBar/StatusBar";
import React from "react";
import PostCard from "@/components/PostCard/PostCard";
import Events from "@/components/Events/Events";
import Tabela from "@/components/Tables/Tabela";
import SSBar from "@/components/ScoresAndSuggestionsBar/SSBar";

const Page = ({posts}) => {
    const handleLike = (postId) => {
        console.log(`Liked post ${postId}`);
    };

    const handleComment = (postId) => {
        console.log(`Commented on post ${postId}`);
    };

     return (
         <div className="feed">
            <SideBar/>
             <div className="content-div">
                 <div className="main-content">
                    <StatusBar/>
                    <Events/>
                 </div>
                 <div className="ssbar-container">
                    <SSBar/>
                 </div>
             </div>
             {/*{posts.map(post => (
                <PostCard
                    key={post.id}
                    userImage={post.userImage}
                    userName={post.userName}
                    postContent={post.content}
                    postImage={post.image}
                    onLike={() => handleLike(post.id)}
                    onComment={() => handleComment(post.id)}
                />
            ))}*/}
         </div>
     )
 }

 export default Page;