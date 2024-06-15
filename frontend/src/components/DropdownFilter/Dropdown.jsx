"use client"

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Events from "@/components/Events/Events";
import {
  DropdownButton,
  DropdownContent,
  DropdownWrapper,
  NestedLabel,
  NestedSelects,
  OptionLabel
} from "./DropdownStyle";

const DropdownComponent = () => {

  const max_udaljenost=10000 // promijeniti nakon sto u sesiji bude max udaljenost
  const id_korisnika=1 // promijeniti nakon sto u sesiji bude id

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
      const R = 6371; // Radius of the Earth in kilometers
      const dLat = (lat2 - lat1) * Math.PI / 180;
      const dLon = (lon2 - lon1) * Math.PI / 180;
      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      const distance = R * c; // Distance in kilometers

      return distance;
  };

  const [location, setLocation] = useState({ latitude: null, longitude: null });

  useEffect( () => { getLocation();},[])

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        const { latitude, longitude } = position.coords;
        console.log(calculateDistance(latitude, longitude,43.8563, 18.4131))
        setLocation({ latitude, longitude });
      }, error => {
        console.error("Error fetching location:", error);
      });
    } else {
      console.error("Ovaj browser ne podrazava davanje lokacije!");
    }
  };

  const [selectedOption, setSelectedOption] = useState('');
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [sportovi, setSportovi]=useState();
  const [feed, setFeed]=useState();
  const [sport, setSport]=useState(0);
  const [spol, setSpol]=useState(2)
  const [nivo, setNivo]=useState("svi");

  useEffect(()=>{
    axios.get("http://localhost:8000/sportovi")
    .then(response=>setSportovi(response.data.map(sport=>{return {naziv_sporta:sport.naziv_sporta, id_sporta:sport.id_sporta}})))
    .catch(err=>console.log(err));
  }, [])

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleClick=(id_sporta, potreban_nivo, ocekivani_spol, tip)=>{
    if (tip ==="oglasi")
      axios.get(`http://localhost:8000/dajFiltriraneOglase/${id_sporta}/${potreban_nivo}/${ocekivani_spol}`).then(response=>setFeed(response.data)).catch(err=>console.log(err));
    else
      axios.get(`http://localhost:8000/dajObjavePrijatelja/${id_korisnika}`).then(response=>setFeed(response.data)).catch(err=>console.log(err));



    toggleDropdown();
  }

  return (
      <>
      <DropdownWrapper>
        <DropdownButton onClick={toggleDropdown}>Izaberi opciju</DropdownButton>
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
                <select onChange={(e)=>setSport(e.target.value)} value={sport}>
                  <option value={0}>Svi</option>
                  {sportovi.map((sport, indeks)=> <option value={sport.id_sporta}>{sport.naziv_sporta}</option>)}

                </select>
              </NestedLabel>
              <NestedLabel>
                Spol:
                <select onChange={(e)=>setSpol(e.target.value)} value={spol} >
                <option value={2}>Svi</option>
                  <option value={0}>Muški</option>
                  <option value={1}>Ženski</option>

                </select>
              </NestedLabel>
              <NestedLabel>
                Nivo:
                <select onChange={(e)=>setNivo(e.target.value)} value={nivo}>
                <option value="svi">Svi</option>
                  <option value="0.33">Početnik</option>
                  <option value="0.66">Srednji nivo</option>
                  <option value="1">Profesionalno</option>
                </select>
              </NestedLabel>

            </NestedSelects>

          )}
          <button onClick={()=>handleClick(sport, nivo, spol, selectedOption)}>Odaberi</button>
        </DropdownContent>
      </DropdownWrapper>
    </>
  );
};

export default DropdownComponent;
