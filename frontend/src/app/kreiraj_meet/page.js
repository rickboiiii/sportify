"use client";

import '@/app/globals.css';
import { useState } from 'react';
import { Container } from "@/components/Containers/ContainerStyled";
import ParForm from "@/components/Forms/ParForm";
import ProgressIndicator from '@/components/Indicators/ProgressIndicator';
import styled from 'styled-components';
import {Button} from '@/components/Button/ButtonStyled';
import axios from "axios";
import {lapisLazuli} from "@/styles/GlobalStyle";

const Message = styled.h1`
  color: white;
  font-size: 32px;
  text-align: center;
  margin-top: 2rem;
`;

async function sendMeetDetails(meetDetails) {
  try {
    const response = await axios.post('http://localhost:8000/meet_and_greet', meetDetails);
    return response.data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

export default function Home() {
  const labelSets = [
    {
      first: {
        label: "naziv okupljanja",
        id: "id1",
        name: "naziv_okupljanja",
      },
      second: {
        label: "kratki opis",
        id: "id2",
        name: "opis_okupljanja",
      }
    },
    {
      first: {
        label: "kapacitet",
        id: "id1",
        name: "kapacitet",
      },
      second: {
        label: "sport",
        id: "id2",
        name: "sport",
      }
    },
    {
      first: {
        label: "lokacija",
        id: "id1",
        name: "lokacija",
      },
      second: {
        label: "datum odrzavanja",
        id: "id2",
        name: "datum_odrzavanja",
      }
    }
  ];

  const [formKey, setFormKey] = useState(0);
  const [currentLabelSetIndex, setCurrentLabelSetIndex] = useState(0);
  const [formSubmitCount, setFormSubmitCount] = useState(0);
  const [formValues, setFormValues] = useState([]);

  const handlePress = () => {
    let lokacija = parseInt(document.getElementById('id1').value);
    let datum_odrzavanja = (document.getElementById('id2').value);
    const formData = {
      naziv_okupljanja: formValues[0],
      opis_okupljanja: formValues[1],
      kapacitet:parseInt( formValues[2]),
      sport: parseInt(formValues[3]),
      lokacija: lokacija,
      datum_odrzavanja: datum_odrzavanja
    };console.log(formData)

    try {
      axios.post('http://localhost:8000/meet_and_greet', formData)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
       sendMeetDetails(formData);
    } catch (error) {
      console.error('Failed to submit form', error);
    }

    setFormSubmitCount((prevCount) => prevCount + 1);
  };

  const NextSlide = () => {
    let prvaVrijednost= document.getElementById("id1").value;
    let drugaVrijednost= document.getElementById("id2").value;
    setFormValues([...formValues,prvaVrijednost,drugaVrijednost])
    if (formSubmitCount < 1) {
      setFormKey((prevKey) => prevKey + 1);
      setCurrentLabelSetIndex((prevIndex) => (prevIndex + 1) % labelSets.length);
      setFormSubmitCount((prevCount) => prevCount + 1);
    } else {
      setFormSubmitCount((prevCount) => prevCount + 1);
    }
  }


  return (
    <Container>
      {formSubmitCount < 3 ? (
        <>
          <ProgressIndicator steps={3} active_number={formSubmitCount + 1} />
          <ParForm
            key={formKey}
            inputs={labelSets[currentLabelSetIndex]}
            h_text={"Osnovne informacije o okupljanju"}
          >{(formSubmitCount===2)?(<Button onClick={handlePress}>Završite</Button>) : (<Button onClick={NextSlide}>sljedeće</Button>)}</ParForm>
        </>
      ) : (
        <Message>uspješno ste organizovali okupljanje</Message>
      )
      }
    </Container>
  );
}