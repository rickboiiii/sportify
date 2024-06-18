"use client";

import "./Feed.css"

import SideBar from "@/components/SideBar/SideBar";
import StatusBar from "@/components/StatusBar/StatusBar";
import React from "react";
import Events from "@/components/Events/Events";
import SSBar from "@/components/ScoresAndSuggestionsBar/SSBar";

const Page = () => {

    // TODO get url for profile

     return (
         <div className="feed">
            <SideBar profileUrl={""} />
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