import React, { useState } from "react";
import "./SSBar.css";
import Tabela from "@/components/Tables/Tabela";
import SuggestedForYou from "@/components/SuggestedForYou/SuggestedForYou";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBars} from "@fortawesome/free-solid-svg-icons";

const sampleProfiles = [
    { username: "user_name1", fullname: "Full Name 1" },
    { username: "user_name2", fullname: "Full Name 2" },
    { username: "user_name3", fullname: "Full Name 3" },
    { username: "user_name4", fullname: "Full Name 4" },
    { username: "user_name5", fullname: "Full Name 5" }
];

const SSBar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className={`bar ${isOpen ? 'open' : ''}`}>
            <Tabela />
            <SuggestedForYou profiles={sampleProfiles} />
        </div>
    );
}

export default SSBar;
