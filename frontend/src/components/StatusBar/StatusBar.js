// src/components/StatusBar.js
import React, { useState } from 'react';
import {faPersonCircleQuestion, faPlusCircle, faSmile} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import PopupForm from '@/components/PopUpForm/PopupForm'; // Import the PopupForm component

import profilnaSlika from "@/images/profilna_slika_1.jpg";
import './StatusBar.css';
import '@/components/PopUpForm/PopupForm.css';
import {useRouter} from "next/navigation";

const StatusBar = () => {

    const router = useRouter();
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
                        <button type="button">Podijelite Vaš sportski duh sa ostalima</button>
                    </div>
                    <div>
                        <button onClick={() => router.push("/kreiraj_lost")}><FontAwesomeIcon icon={faPersonCircleQuestion} style={{ color: "#1c64a3" }} /> Lost&Found</button>
                        <button onClick={() => router.push("/kreiraj_meet")}><FontAwesomeIcon icon={faSmile} style={{ color: "#1c64a3" }} /> Meet&Greet</button>
                        <button onClick={() => router.push("/kreiraj_event")}><FontAwesomeIcon icon={faPlusCircle} style={{ color: "#1c64a3" }} /> Termin</button>
                    </div>
                </div>
            </div>
            {isPopupOpen && <PopupForm onClose={closePopup} />}
        </>
    );
}

export default StatusBar;
