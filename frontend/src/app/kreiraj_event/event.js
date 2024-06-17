"use client";

import '@/app/globals.css';
import { useState } from 'react';
import { Container } from "@/components/Containers/ContainerStyled";
import ParForm from "@/components/Forms/ParForm";
import ProgressIndicator from '@/components/Indicators/ProgressIndicator';
import styled from 'styled-components';
import {Button} from '@/components/Button/ButtonStyled';
import axios from "axios";
import {useRouter} from "next/navigation";


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

export default function KreiranjeEventaClient({locations, sports}) {
  const router = useRouter();
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
        values: locations
      },
      second: {
        label: "vrijeme održavanja",
        id: "id2",
        name: "pocetak_termina",
        type: "date"
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
        values: sports
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
        values: [{id:0, name:"pocetnik"},{id:0.33, name: "srednji"},{id:0.66,  name: "profesionalac"}]
      }
    }
  ];

  const [formKey, setFormKey] = useState(0);
  const [currentLabelSetIndex, setCurrentLabelSetIndex] = useState(0);
  const [formSubmitCount, setFormSubmitCount] = useState(0);
  const [formValues, setFormValues] = useState([]);


  const handlePress = async (e) => {
    e.preventDefault();
    let spol = parseInt(document.getElementById('id1').value);
    let nivo_sposobnosti = document.getElementById('id2').value;
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

    try {
       await sendEventDetails(formData);
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
    <Container style={{height: "100vh", margin: 0}}>
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
          // TODO Add username from token
          <Message>uspješno ste dodali termin {router.push("/feed")}</Message>
      )
      }
    </Container>
  );
}

