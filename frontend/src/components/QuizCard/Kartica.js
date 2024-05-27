// src/components/QuizCard.js
import React from 'react';
import styled from 'styled-components';

const CardYesNo = ({ pitanje, handleAnswer }) => {
  return (
    <Tijelo>
    <Kartica>
      <Pitanje>
        <Tekst>{pitanje.pitanje}</Tekst>
      </Pitanje>
      <Odgovori>
        <Dugme value={1} onClick={()=>handleAnswer(pitanje.udio,1)}>Da</Dugme>
        <Dugme value={0} onClick={()=>handleAnswer(0,0)}>Ne</Dugme>
      </Odgovori>
    </Kartica>
    </Tijelo>
  );
};

export default CardYesNo;

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
