// src/components/StatusBar.js
import React, { useState } from 'react';
import { faImage, faPlusCircle, faSmile } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import PopupForm from '@/components/PopUpForm/PopupForm'; // Import the PopupForm component

import profilnaSlika from "@/images/profilna_slika_1.jpg";
import './StatusBar.css';
import '@/components/PopUpForm/PopupForm.css';

const StatusBar = () => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const openPopup = () => {
        setIsPopupOpen(true);
    };

    const closePopup = () => {
        setIsPopupOpen(false);
    };

    return (
        <>
            <div className={isPopupOpen ? "blurred" : ""}>
                <div className="statusBar">
                    <div>
                        <Image src={profilnaSlika} alt="profilna slika usera" />
                        <button onClick={openPopup}>Podijelite Vaš sportski duh sa ostalima</button>
                    </div>
                    <div>
                        <button onClick={openPopup}><FontAwesomeIcon icon={faImage} style={{ color: "#1c64a3" }} /> Slika</button>
                        <button onClick={openPopup}><FontAwesomeIcon icon={faSmile} style={{ color: "#1c64a3" }} /> Status</button>
                        <button onClick={openPopup}><FontAwesomeIcon icon={faPlusCircle} style={{ color: "#1c64a3" }} /> Termin</button>
                    </div>
                </div>
            </div>
            {isPopupOpen && <PopupForm onClose={closePopup} />}
        </>
    );
}

export default StatusBar;
