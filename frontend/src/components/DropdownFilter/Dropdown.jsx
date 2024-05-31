"use client"

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const DropdownWrapper = styled.div`
  position: relative;
  display: inline-block;
`;

const DropdownButton = styled.button`
  background-color: #3498db;
  color: white;
  padding: 10px;
  font-size: 16px;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #2980b9;
  }
`;

const DropdownContent = styled.div`
  display: ${(props) => (props.show ? 'flex' : 'none')};
  position: absolute;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
`;

const OptionLabel = styled.label`
  display: block;
  padding: 12px 16px;
  cursor: pointer;

  &:hover {
    background-color: #f1f1f1;
  }
`;

const NestedSelects = styled.div`
  display:flex;
  margin-top: 10px;
`;

const NestedLabel = styled.label`
  display: block;
  margin: 10px 0;
`;

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
useEffect( () => {
  getLocation();
},[])

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
    console.log(tip, selectedOption)
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
                <option value="pocetnik">Početnik</option>
                <option value="intermediate">Srednji nivo</option>
                <option value="profesionalni">Profesionalno</option>
              </select>
            </NestedLabel>
            
          </NestedSelects>

        )}
        <button onClick={()=>handleClick(sport, nivo, spol, selectedOption)}>Odaberi</button>
      </DropdownContent>
    </DropdownWrapper>
    {feed  && selectedOption==="oglasi"&& feed.filter(post=>{
      console.log(post.latituda, post.longituda, location.longitude, location.latitude)
      return calculateDistance(post.latituda, post.longituda, location.latitude, location.longitude)<max_udaljenost})  
    .map(post=><p>{post.ime_igraca}</p>) }
    {feed  && selectedOption==="postovi"&& feed 
    .map(post=><p>{post.tekst_objave}</p>) }

    </>
  );
};
// ispisi u konzolu feed vidi koje sve podatke imas i bit ce lakse ispisivati oglase i postove
// iz feeda salji propse umjesto da sve state-ove cuvas u ovoj komponenti
export default DropdownComponent;
