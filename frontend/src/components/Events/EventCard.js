"use client";
import "./EventCard.css";
import Image from "next/image";
import {useState} from "react";

const EventCard = ({ event }) => {
    const [showMore, setShowMore] = useState(false);

    const toggleShowMore = () => {
        setShowMore(!showMore);
    };

    // Parsiramo datum i vreme iz event.pocetak_termina
    const datum = new Date(event.pocetak_termina);
    const datumStr = datum.toLocaleDateString('hr-HR'); // Formatiranje datuma
    const vremeStr = datum.toLocaleTimeString('hr-HR', { hour: '2-digit', minute: '2-digit' }); // Formatiranje vremena

    return (
        <div className="event-card">
            <div className="event-card-header">
                <div className={"profilna-slika"}></div>
                {/* treba zamijeniti za sliku*/}
                <button className={"username"}>{event.korisnicko_ime}</button>
                {/* na ovo mjesto treba da ide username i slika */}
            </div>
            <div className="event-card-body">
                <div>
                    <div className={"slika-oglasa"}></div>
                    {/* treba zamijeniti za sliku*/}
                    <h1>{event.naziv_termina}</h1>
                    <h2>{event.vrsta_termina}</h2>
                    <p className="datum">Datum: {datumStr}</p>
                    <p className="vreme">Vrijeme: {vremeStr}</p>
                </div>
                {showMore && <p className="opis-termina">{event.opis_termina}</p>}
                {showMore && <button className="prijava-na-termin">Prijavi se na termin</button>}
            </div>
            <button onClick={toggleShowMore} className={"dugme"}>
                {showMore ? "Sakrij termin" : "Pogledaj termin"}
            </button>
        </div>
    );
};

export default EventCard;

