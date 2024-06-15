// src/components/QuizCard.js
import React from 'react';
import styled from 'styled-components';
import '@/app/globals.css';
import { useState } from 'react';
import { Container, Row } from "@/components/Containers/ContainerStyled";
import QuizForm from "@/components/Forms/QuizForm";
import ProgressIndicator from '@/components/Indicators/ProgressIndicator';
import {Button} from '@/components/Button/ButtonStyled';
import Image from "next/image";
import left_arrow from "@/images/left_arrow.png"
import axios from "axios";
import {lapisLazuli} from "@/styles/GlobalStyle";

const CardNumeric = ({ pitanje, handleAnswer, indeks,id }) => {
    const [odgovor, setOdgovor]=useState(0)
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
      <Row style={{color:"white"}}> <h4>{indeks+1}  od  10</h4> </Row>
        <QuizForm h_text={pitanje.pitanje} funkcija={(e)=>setOdgovor(e.target.value)} vrijednost={odgovor}>
            <Button onClick={()=>handleAnswer( pitanje.funkcija,Number(odgovor))}>Submit</Button>
    </QuizForm>
    </Container>
  );
};

export default CardNumeric;