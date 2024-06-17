"use client"
import React, { useState, useEffect } from 'react';
import Game from '@/components/TicTacToe/Game';
import "./XO.css"
import axios from 'axios';

const Igrica = () => {
  const [token, setToken] = useState(null);
  const [idKorisnika, setIdKorisnika] = useState(null);
  const [username, setUsername]=useState(null);
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
        const parsedToken = JSON.parse(storedToken);
        setToken(parsedToken.access_token);
        fetchIdKorisnika(parsedToken.access_token);
    }
}, []);

const fetchIdKorisnika = async (token) => {
  try {
      const response = await fetch(`http://localhost:8000/get_id/${token}`, {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
          }
      });
      if (response.ok) {
          const data = await response.json();
          setIdKorisnika(data);
          console.log("data", data)
          axios.get(`http://localhost:8000/dajKorisnika/${data}`)
          .then(res=>setUsername(res.data.korisnicko_ime))
          
          .catch(err=>console.log(err))
      } else {
          console.error('Failed to fetch id_korisnika:', response.statusText);
      }
  } catch (error) {
      console.error('Error fetching id_korisnika:', error);
  }
};
console.log(username, "Username")
  return (
    <div>
      <Game username={username} />
    </div>
  );
};

export default Igrica;
