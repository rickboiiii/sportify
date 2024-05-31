import "./EventCard.css";

const EventCard = ({ event }) => {
    return (
        <div className="event-card">
            <div className="event-card-header">
                <button>{event.korisnicko_ime}</button> {/* na ovo mjesto treba da ide username i slika */}
                <div>
                    <h1>{event.naziv_termina}</h1>
                    <h2>{event.vrsta_termina}</h2>
                    <p className="datum">Date: {event.pocetak_termina}</p>
                </div>
            </div>
            <p>{event.opis_termina}</p>
        </div>
    );
};

export default EventCard;

