"use client";

import '@/app/globals.css';
import { useState } from 'react';
import { Container } from "@/components/Containers/ContainerStyled";
import ParForm from "@/components/Forms/ParForm";
import ProgressIndicator from '@/components/Indicators/ProgressIndicator';
import styled from 'styled-components';
import {Button} from '@/components/Button/ButtonStyled';
import axios from "axios";


const Message = styled.h1`
  color: white;
  font-size: 32px;
  text-align: center;
  margin-top: 2rem;
`;

async function sendEventDetails(eventDetails) { //eventDetails
  try {

    axios.post('http://localhost:8000/oglas_eventa', eventDetails)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });

    
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

export default function KreiranjeEventa() {
  const labelSets = [
    {
      first: {
        label: "naziv termina",
        id: "id1",
        name: "naziv_termina",
      },
      second: {
        label: "kratki opis",
        id: "id2",
        name: "opis_termina",
      }
    },
    {
      first: {
        label: "mjesto održavanja",
        id: "id1",
        name: "lokacija",
      },
      second: {
        label: "vrijeme održavanja",
        id: "id2",
        name: "pocetak_termina",
      }
    },
    {
      first: {
        label: "broj igrača",
        id: "id1",
        name: "broj_slobodnih_mjesta",
      },
      second: {
        label: "sport",
        id: "id2",
        name: "sport",
        values: [{id: 5, name: "odbojka"},{id:6, name:"fudbal"} ,{id:7, name:"rukomet"},{id:8, name:"kosarka"},{id:9, name:"tenis"},{id:10, name:"teretana"},{id:11, name:"plivanje"}]
      }
    },
    {
      first: {
        label: "spol",
        id: "id1",
        name: "spol",
        values: [{id:0, name: "musko"},{id: 1, name: "zensko"}]
      },
      second: {
        label: "nivo sposobnosti",
        id: "id2",
        name: "nivo_sposobnosti",
        values: [{id:0, name:"pocetnik"},{id:1, name: "srednji"},{id:2,  name: "profesionalac"}]
      }
    }
  ];

  const [formKey, setFormKey] = useState(0);
  const [currentLabelSetIndex, setCurrentLabelSetIndex] = useState(0);
  const [formSubmitCount, setFormSubmitCount] = useState(0);
  const [formValues, setFormValues] = useState([]);
 
 
  const handlePress = () => {
    let spol = parseInt(document.getElementById('id1').value);
    console.log(spol);
    let nivo_sposobnosti = document.getElementById('id2').value;
    console.log(nivo_sposobnosti);
    const formData = {
      naziv_termina: formValues[0],
      opis_termina: formValues[1],
      id_lokacije: formValues[2],
      pocetak_termina: formValues[3],
      broj_slobodnih_mjesta: formValues[4],
      sport: parseInt(formValues[5]),
      spol: spol,
      potreban_nivo_sposobnosti : nivo_sposobnosti
    };
    console.log(formData);

    try {
      axios.post('http://localhost:8000/oglas_eventa', formData)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
       sendEventDetails(formData);
    } catch (error) {
      console.error('Failed to submit form', error);
    }

    setFormSubmitCount((prevCount) => prevCount + 1);
  };

  const NextSlide = () => {
    let prvaVrijednost= document.getElementById("id1").value;
    let drugaVrijednost= document.getElementById("id2").value;
    setFormValues([...formValues,prvaVrijednost,drugaVrijednost])
    if (formSubmitCount < 3) {
      setFormKey((prevKey) => prevKey + 1);
      setCurrentLabelSetIndex((prevIndex) => (prevIndex + 1) % labelSets.length);
      setFormSubmitCount((prevCount) => prevCount + 1);
    } else {
      setFormSubmitCount((prevCount) => prevCount + 1);
    }
  }


  return (
    <Container>
      {formSubmitCount < 4 ? (
        <>
          <ProgressIndicator steps={4} active_number={formSubmitCount + 1} />
          <ParForm
            key={formKey}
            inputs={labelSets[currentLabelSetIndex]}
            h_text={"Osnovne informacije o terminu"}
          >{(formSubmitCount===3)?(<Button onClick={handlePress}>Završite</Button>) : (<Button onClick={NextSlide}>sljedeće</Button>)}</ParForm>
        </>
      ) : (
        <Message>uspješno ste dodali termin</Message>
      )
      }
    </Container>
  );
}

