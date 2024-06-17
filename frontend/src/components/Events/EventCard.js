import "./EventCard.css";
import React, { useState } from "react";
import Link from "next/link";
import stock_pic from "@/images/stock_pic.png";
import Image from "next/image";


const EventCard = ({ event, props }) => {
  const [showMore, setShowMore] = useState(false);
  const [isPrijavljen, setIsPrijavljen] = useState(false);
  const [message, setMessage] = useState("");
  const [events, setEvents] = useState(event)

  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

  const sendNotification = async () => {
    try {
      let endpoint = "";
      let method = "";
      if (!isPrijavljen) {
        endpoint = `/prijava/${events.id_eventa}/${props.korisnicko_ime}`;
        method = "POST";
      } else {
        endpoint = `/odjava/${events.id_eventa}/${props.korisnicko_ime}`;
        method = "DELETE";
      }

      const response = await fetch(`http://localhost:8000${endpoint}`, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({

        }),
      });

      if (response.ok) {
        if (!isPrijavljen) {
          setIsPrijavljen(true);
          setMessage("Uspešno ste se prijavili na termin.");
        } else {
          setIsPrijavljen(false);
          setMessage("Uspešno ste se odjavili sa termina.");
        }

        const updatedEvents = {
          ...events,
          broj_slobodnih_mjesta: isPrijavljen
            ? events.broj_slobodnih_mjesta + 1
            : events.broj_slobodnih_mjesta - 1,
        };
        setEvents(updatedEvents);
      } else {
        setMessage("Došlo je do greške prilikom obrade zahteva.");
      }
    } catch (error) {
      console.error("Došlo je do greške:", error);
    }
  };

  // Parsiramo datum i vreme iz event.pocetak_termina
  const datum = new Date(event.pocetak_termina);
  const datumStr = datum.toLocaleDateString("hr-HR"); // Formatiranje datuma
  const vremeStr = datum.toLocaleTimeString("hr-HR", {
    hour: "2-digit",
    minute: "2-digit",
  }); // Formatiranje vremena

  return (
    <div className="event-card">
      <div className="event-card-header">
        <div className={"profilna-slika"}>
          <Image src={event.slika ?? stock_pic} alt={"Profile Picture"}/>
        </div>
        <Link
          className={"username"}
          href={`/profiles/igraci/id/${event.id_organizatora}`}
        >
          {event.korisnicko_ime}
        </Link>
      </div>
      <div className="event-card-body">
        <div>
          <div className={"slika-oglasa"}>

          </div>
          {/* treba zamijeniti za sliku*/}
          <h1>{event.naziv_termina}</h1>
          <h2>{event.vrsta_termina}</h2>
          <p className="datum">Datum: {datumStr}</p>
          <p className="vreme">Vrijeme: {vremeStr}</p>
        </div>
        {showMore && <p className="opis-termina">{event.opis_termina}</p>}
        {showMore && (
          <p className="br-slobodnih-mjesta">
            Broj slobodnih mjesta: {events.broj_slobodnih_mjesta}
          </p>
        )}
        {showMore && message && <p>{message}</p>}
        {showMore && (
          <button onClick={sendNotification} className="prijava-na-termin">
            {isPrijavljen ? "Odjavi se sa termina" : "Prijavi se na termin"}
          </button>
        )}
      </div>
      <button onClick={toggleShowMore} className={"dugme"}>
        {showMore ? "Sakrij termin" : "Pogledaj termin"}
      </button>
    </div>
  );
};

export default EventCard;
