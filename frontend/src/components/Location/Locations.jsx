"use client";
/*import React, { useEffect, useState } from 'react';

const LocationFetcher = () => {
  const [location, setLocation] = useState({ latitude: null, longitude: null });
  useEffect( () => {
    getLocation();
  },[])
  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      }, error => {
        console.error("Error fetching location:", error);
      });
    } else {
      console.error("Ovaj browser ne podrazava davanje lokacije!.");
    }
  };

  return (
    <div>
      {location.latitude && location.longitude && (
        <div>
          <p>Latitude: {location.latitude}</p>
          <p>Longitude: {location.longitude}</p>
        </div>
      )}
    </div>
  );
};

export default LocationFetcher;*/

import React, { useEffect, useState } from 'react';

const LocationFetcher = () => {
  const [location, setLocation] = useState({ latitude: null, longitude: null });
  const [address, setAddress] = useState({
    naziv_ulice: '',
    postanski_broj: '',
    grad: '',
    drzava: ''
  });
  useEffect( () => {
    getLocation();
  },[])

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        const { latitude, longitude } = position.coords;
        setLocation({ latitude, longitude });
        fetchAddress(latitude, longitude);
      }, error => {
        console.error("Error fetching location:", error);
      });
    } else {
      console.error("Ovaj browser ne podrazava davanje lokacije!");
    }
  };

  const fetchAddress = (latitude, longitude) => {
    fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`)
      .then(response => response.json())
      .then(data => {
        const addressData = {
          naziv_ulice: data.address.road || '',
          postanski_broj: data.address.postcode || '',
          grad: data.address.city || data.address.town || data.address.village || '',
          drzava: data.address.country || ''
        };
        setAddress(addressData);
        // Slanje podataka na backend server
        //saveAddressToServer(addressData);
      })
      .catch(error => console.error('Greska', error));
  };

  /*const saveAddressToServer = (addressData) => {
    fetch('http://localhost:5000/api/adresa', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(addressData),
    })
    .then(response => response.json())
    .then(data => console.log('Success:', data))
    .catch(error => console.error('Error:', error));
  };*/

  return (
    <div>
      {location.latitude && location.longitude && (
        <div>
          <p>Latitude: {location.latitude}</p>
          <p>Longitude: {location.longitude}</p>
          <p>Ulica: {address.naziv_ulice}</p>
          <p>Poštanski broj: {address.postanski_broj}</p>
          <p>Grad: {address.grad}</p>
          <p>Država: {address.drzava}</p>
        </div>
      )}
    </div>
  );
};

export default LocationFetcher;

