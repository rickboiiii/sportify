"use client";

import "./Feed.css"

import SideBar from "@/components/SideBar/SideBar";
import StatusBar from "@/components/StatusBar/StatusBar";
import React from "react";
import PostCard from "@/components/PostCard/PostCard";

const Page = ({posts}) => {
    const handleLike = (postId) => {
        console.log(`Liked post ${postId}`);
    };

    const handleComment = (postId) => {
        console.log(`Commented on post ${postId}`);
    };

     return (
         <div className={"feed"}>
            <SideBar/>
            <StatusBar/>
             {posts.map(post => (
                <PostCard
                    key={post.id}
                    userImage={post.userImage}
                    userName={post.userName}
                    postContent={post.content}
                    postImage={post.image}
                    onLike={() => handleLike(post.id)}
                    onComment={() => handleComment(post.id)}
                />
            ))}
         </div>
     )
 }

 export default Page;