import React, {useEffect, useState} from "react";
import "./SSBar.css";
import Tabela from "@/components/Tables/Tabela";
import SuggestedForYou from "@/components/SuggestedForYou/SuggestedForYou";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import {useParams} from "next/navigation";

const SSBar = () => {
    const params = useParams()
    const [isOpen, setIsOpen] = useState(false);
    const [profiles, setProfiles] = useState([]);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchSuggestions = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/get_suggestions/${params.username}`);
                setProfiles(response.data);
            } catch (error) {
                if (error.response && error.response.status === 404) {
                    setProfiles([]);
                    setMessage('Dodajte prijatelje')
                } else {
                    console.error("Error fetching suggestions:", error);
                }
            }
        };

        fetchSuggestions();
    }, []);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };


    return (
        <div>
            <FontAwesomeIcon icon={faBars} className="menu-icon" onClick={toggleSidebar} />
            {isOpen && <div className="backdrop" onClick={toggleSidebar}></div>}
            <div className={`bar ${isOpen ? 'open' : ''}`}>
                <Tabela />
                <SuggestedForYou profiles={profiles} />
            </div>
        </div>
    );
}

export default SSBar;
