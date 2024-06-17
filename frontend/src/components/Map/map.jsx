"use client"
import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Button } from '../Button/ButtonStyled';
import axios from 'axios';
import { useRouter } from "next/navigation";


L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const MapComponent = ({formData}) => {
    console.log("formdata", formData)
    const router=useRouter();
  const [position, setPosition] = useState(null);
  const [address, setAddress] = useState("");
  const [currentLocation, setCurrentLocation] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCurrentLocation([latitude, longitude]);
        setPosition([latitude, longitude]);
        fetchAddress({lat:latitude, lng:longitude})
        setLoading(false);
      },
      (error) => {
        console.error("Error getting location: ", error);
        setLoading(false);
      }
    );
  }, []);

  const LocationMarker = () => {
    useMapEvents({
      click(e) {
        setPosition(e.latlng);
        fetchAddress(e.latlng);
      },
    });

    return position === null ? null : (
      <Marker position={position}>
        <Popup>Trenutno odabrana lokacija</Popup>
      </Marker>
    );
  };

  const fetchAddress = async (latlng) => {
    const { lat, lng } = latlng;
    const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`);
    const data = await response.json();

    const street = data.address.road || "N/A";
    const houseNumber = data.address.house_number || "N/A";
    const city = data.address.city || data.address.town || "N/A";
    const country = data.address.country || "N/A";

    setAddress(`${street} ${houseNumber}, ${city}, ${country}, ${data.address.postcode}`);
  };

  if (loading) {
    return <div>Loading...</div>;
  }
  const handleClick= async (e)=>{
    e.preventDefault();
    let lat
    let lng
    (typeof(position)==="object" ? {lat, lng}=position: [lat, lng]=position)
    
    const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`);
    const data = await response.json();
   
      const adresa= {
        naziv_ulice: data.address.road,
        postanski_broj: parseInt(data.address.postcode),
        grad: data.address.city||data.address.town,
        drzava: data.address.country
      }
      const teren= {
        id_vlasnika: formData.id_vlasnika,
        naziv_lokacije: formData.naziv_terena,
        opis_Lokacije:"opis",
        recenzija:4,
        cijena_po_terminu: parseInt(formData.cijena_po_terminu),
        
        longituda: parseFloat(lng),
        latituda: parseFloat(lat), 
        kapacitet: parseInt(formData.kapacitet),
        
      }

    
    console.log("podaci", {adresa:adresa, teren:teren}, typeof({adresa:adresa, teren:teren}))
    axios.post(`http://localhost:8000/dodajTeren/${formData.sport}`,{adresa:adresa, teren:teren} ).then(r=>router.push(`/feed/${formData.username}`))
    .catch(er=>console.log(er))
    // axios.post(`http://localhost:8000/dodajAdresu`,adresa)
    // .then(res=>axios.post(`http://localhost:8000/dodajTeren/${formData.sport}/${res.data.id_adrese}`, teren)
    // .then(r=>console.log(r))
    // .catch(er=>console.log(er))
    // .catch(err=>console.log(err)))
    
  }

  return (
    <div style={{display:"flex", justifyContent:"center", alignItems:"center", flexDirection:"column"}}>
      <MapContainer center={currentLocation} zoom={13} style={{ height: '500px', width: '80vw' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <LocationMarker />
      </MapContainer>
      {address && <h3> Trenutno odabrana adresa : {address} </h3>}
      <Button onClick={(e)=>handleClick(e)} style={{marginTop:"50px"}}>Dodaj teren</Button>
    </div>
  );
};

export default MapComponent;
