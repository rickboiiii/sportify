// src/components/SideBar.js
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faMagnifyingGlass, faMessage, faPuzzlePiece } from '@fortawesome/free-solid-svg-icons';
import './SideBar.css';
import Image from "next/image";

import logo from "@/images/sportify_logo2.png"

const SideBar = () => {
    return (
        <>
        <div className="sideBar">
            <Image src={logo} alt={"logo"} className={"logo"}/>
            <div>
                <FontAwesomeIcon icon={faHouse} style={{ color: "#1c64a3" }} />
                <p>Home</p>
            </div>
            <div>
                <FontAwesomeIcon icon={faMagnifyingGlass} style={{ color: "#1c64a3" }} />
                <p>Search</p>
            </div>
            <div>
                <FontAwesomeIcon icon={faMessage} style={{ color: "#1c64a3" }} />
                <p>Message</p>
            </div>
            <div>
                <FontAwesomeIcon icon={faPuzzlePiece} style={{ color: "#1c64a3" }} />
                <p>Games</p>
            </div>
        </div>
        </>
    );
}

export default SideBar;
