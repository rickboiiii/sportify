"use client";

import "./Feed.css"

import SideBar from "@/components/SideBar/SideBar";
import StatusBar from "@/components/StatusBar/StatusBar";
import React from "react";
import PostCard from "@/components/PostCard/PostCard";
import Events from "@/components/Events/Events";
import Tabela from "@/components/Tables/Tabela";
import SSBar from "@/components/ScoresAndSuggestionsBar/SSBar";
import Dropdown from "@/components/DropdownFilter/Dropdown";

const Page = () => {

     return (
         <div className="feed">
            <SideBar/>
             <div className="content-div">
                 <div className="main-content">
                    <StatusBar/>
                    <Events setOptions={"oglasi"}/>
                 </div>
                 <div className="ssbar-container">
                    <SSBar/>
                 </div>
             </div>
         </div>
     )
 }


 export default Page;