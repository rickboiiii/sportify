// src/components/QuizCard.js
import React, { useState } from 'react';
import styled from 'styled-components';

const CardSelect = ({ pitanje, handleAnswer}) => {
    const [odgovor, setOdgovor]=useState(0);
    const odgovori=pitanje.odgovori.map((ponudjeno, indeks)=><option value={indeks+1}>{ponudjeno}</option>)
  return (
    <Tijelo>
    <Kartica>
      <Pitanje>
        <Tekst>{pitanje.pitanje}</Tekst>
      </Pitanje>
      <Odgovori>
      <select onChange={(e)=>setOdgovor(e.target.value)}>
        {odgovori}
      </select>
      <button onClick={()=>handleAnswer( pitanje.funkcija,Number(odgovor))}>Submit</button>
      </Odgovori>
    </Kartica>
    </Tijelo>
  );
};

export default CardSelect;

const Tijelo = styled.div`
color: #000;
border-radius: 10px;
box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
width: 100vw;
height: 100vh;
display: flex;
flex-direction: column;
align-items: center;
justify-content:center;
margin: auto;
`;

const Kartica = styled.div`
  background-color: #fff;
  color: #000;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  width: 400px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content:center;
`;

const Pitanje = styled.div`
  margin-bottom: 20px;
`;

const Tekst = styled.h1`
  font-size: 24px;
  text-align: center;
`;

const Odgovori = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Dugme = styled.button`
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px;
  margin: 5px 0;
  cursor: pointer;
  font-size: 18px;
  &:hover {
    background-color: #45a049;
  }
`;