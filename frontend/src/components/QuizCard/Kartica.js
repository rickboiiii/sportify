// src/components/QuizCard.js
import React from 'react';
import styled from 'styled-components';
import '@/app/globals.css';
import { useState } from 'react';
import { Container, Row } from "@/components/Containers/ContainerStyled";
import QuizYesNoForm from "@/components/Forms/QuizYesNoForm";
import ProgressIndicator from '@/components/Indicators/ProgressIndicator';
import {Button} from '@/components/Button/ButtonStyled';
import axios from "axios";
import {fontSize1, lapisLazuli} from "@/styles/GlobalStyle";
import Image from "next/image";
import left_arrow from "@/images/left_arrow.png"

const CardYesNo = ({ pitanje, handleAnswer, indeks, id}) => {
  const izbrisi=(id)=>{
    axios.delete(`http://localhost:8000/obrisiSportistu/${Number(id)}`).then(res=>console.log(res)).catch(err=>console.log(err))
  }
  return (
    <Container>
      <Row style={{justifyContent:"start", alignItems:"center"}}>
      <Image src={left_arrow} width={20} height={20}/>
        <a onClick={()=>izbrisi(id)} href='http://localhost:3000' style={{color:"white"}}>Povratak na prethodnu stranicu</a>
        </Row>
     <ProgressIndicator steps={10} active_number={indeks+1}/>
     <Row> <p style={{fontFamily: "Saira Condensed, sans-serif",fontSize:"16px", color:"white"
    }} >{indeks+1}  od  10</p> </Row>
     <QuizYesNoForm  h_text={pitanje.pitanje}>
     
        <Button style={{backgroundColor:"#D8ED0F", color:"#1C64A3", width:"20vw"}}  value={1} onClick={()=>handleAnswer(pitanje.udio,1)}>Da</Button>
        <Button style={{backgroundColor:"#D8ED0F", color:"#1C64A3", marginTop:"10vh", marginLeft:"5vw", width:"20vw"}} value={0} onClick={()=>handleAnswer(0,0)}>Ne</Button>
       
      </QuizYesNoForm>
    </Container>
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
