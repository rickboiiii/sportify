import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EventCard from "@/components/Events/EventCard";
import { useParams } from "next/navigation";
import {
  DropdownButton,
  DropdownContent,
  DropdownWrapper, NestedLabel,
  NestedSelects,
  OptionLabel
} from "@/components/DropdownFilter/DropdownStyle";
import PostCard from "@/components/PostCard/PostCard";

const Events = ({ setOptions }) => {
  const props = useParams();
  const [events, setEvents] = useState([]);
  const [currentUser, setCurrentUser] = useState([]);
  const [location, setLocation] = useState({ latitude: null, longitude: null });
  const [sport, setSport] = useState(0);
  const [sportovi, setSportovi] = useState([]);
  const [selectedOption, setSelectedOption] = useState('');
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [spol, setSpol] = useState(2);
  const [nivo, setNivo] = useState("svi");

  useEffect(() => {
    const fetchInitialEvents = async () => {
      try {
        const response = await axios.get('http://localhost:8000/eventi/');
        setEvents(response.data);
      } catch (error) {
        console.error('Error fetching initial events:', error);
      }
    };
    fetchInitialEvents();
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/user/${props.username}`);
        setCurrentUser(response.data);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };
    fetchUser();
  }, [props.username]);

  useEffect(() => {
    axios.get("http://localhost:8000/sportovi")
      .then(response => setSportovi(response.data.map(sport => {
        return { naziv_sporta: sport.naziv_sporta, id_sporta: sport.id_sporta };
      })))
      .catch(err => console.log(err));
  }, []);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        const { latitude, longitude } = position.coords;
        setLocation({ latitude, longitude });
      }, error => {
        console.error("Error fetching location:", error);
      });
    } else {
      console.error("Ovaj browser ne podrazava davanje lokacije!");
    }
  }, []);

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleClick = (id_sporta, potreban_nivo, ocekivani_spol, tip) => {
    if (tip === "oglasi") {
      axios.get(`http://localhost:8000/dajFiltriraneOglase/${id_sporta}/${potreban_nivo}/${ocekivani_spol}`)
        .then(response => setEvents(response.data))
        .catch(err => console.log(err));
    } else {
      axios.get(`http://localhost:8000/dajObjavePrijatelja/${currentUser.id_korisnika}`)
        .then(response => setEvents(response.data))
        .catch(err => console.log(err));
    }
    toggleDropdown();
  };
   const isPost = (selectedOption === "postovi")

  return (
    <>
      <DropdownWrapper>
        <DropdownButton onClick={toggleDropdown}>Filter</DropdownButton>
        <DropdownContent show={dropdownVisible}>
          <OptionLabel>
            <input
              type="radio"
              value="postovi"
              checked={selectedOption === 'postovi'}
              onChange={handleOptionChange}
            />
            Postovi
          </OptionLabel>
          <OptionLabel>
            <input
              type="radio"
              value="oglasi"
              checked={selectedOption === 'oglasi'}
              onChange={handleOptionChange}
            />
            Oglasi
          </OptionLabel>
          {selectedOption === 'oglasi' && (
            <NestedSelects>
              <NestedLabel>
                Sport:
                <select onChange={(e) => setSport(e.target.value)} value={sport}>
                  <option value={0}>Svi</option>
                  {sportovi.map((sport, indeks) => <option key={indeks} value={sport.id_sporta}>{sport.naziv_sporta}</option>)}
                </select>
              </NestedLabel>
              <NestedLabel>
                Spol:
                <select onChange={(e) => setSpol(e.target.value)} value={spol}>
                  <option value={2}>Svi</option>
                  <option value={0}>Muški</option>
                  <option value={1}>Ženski</option>
                </select>
              </NestedLabel>
              <NestedLabel>
                Nivo:
                <select onChange={(e) => setNivo(e.target.value)} value={nivo}>
                  <option value="svi">Svi</option>
                  <option value="0.33">Početnik</option>
                  <option value="0.66">Srednji nivo</option>
                  <option value="1">Profesionalno</option>
                </select>
              </NestedLabel>
            </NestedSelects>
          )}
          <button onClick={() => handleClick(sport, nivo, spol, selectedOption)}>Odaberi</button>
        </DropdownContent>
      </DropdownWrapper>

      <div>

        { isPost ? (
            <ul>
              {events.map(event => (
                <PostCard key={event.id} event={event} props={currentUser} />
              ))}
            </ul>
        ) : (
            <ul>
               {events.map(event => (
                   <EventCard key={event.id} event={event} props={currentUser} />
               ))}
            </ul>
        )}
      </div>
    </>
  );
};

export default Events;
