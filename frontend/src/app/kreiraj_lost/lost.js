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

async function sendLostDetails(eventDetails) {//lostDEtails
  try {
    const response = await axios.post('http://localhost:8000/lost_and_found', eventDetails);
    return response.data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

export default function KreiranjeLostaClient({locations}) {

    const router = useRouter();

  const labelSets = [
    {
      first: {
        label: "tag:lost/found",
        id: "id1",
        name: "tag",
      },
      second: {
        label: "kratki opis",
        id: "id2",
        name: "opis",
      }
    },
    {
      first: {
        label: "lokacija terena",
        id: "id1",
        name: "lokacija",
          values: locations
      },
      second: {
        label: "slika",
        id: "id2",
        name: "picture_data",
        type: "file"
      }
    }
  ];

  const toBase64 = file => new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
  });

  const [formKey, setFormKey] = useState(0);
  const [currentLabelSetIndex, setCurrentLabelSetIndex] = useState(0);
  const [formSubmitCount, setFormSubmitCount] = useState(0);
  const [formValues, setFormValues] = useState([]);

  const handlePress = async (e) => {
    e.preventDefault();
    let lokacija = parseInt(document.getElementById('id1').value);
    let slika = (document.getElementById('id2').files[0]);
    const formData = {
      tag: formValues[0],
      opis: formValues[1],
      id_lokacije: lokacija,
      picture_data: await toBase64(slika),
    };
    console.log(formData)

    try {
       await sendLostDetails(formData);
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
      {formSubmitCount < 2 ? (
        <>
          <ProgressIndicator steps={2} active_number={formSubmitCount + 1} />
          <ParForm
            key={formKey}
            inputs={labelSets[currentLabelSetIndex]}
            h_text={"Osnovne informacije o izgubljenom predmetu"}
          >{(formSubmitCount===1)?(<Button onClick={handlePress}>Završite</Button>) : (<Button onClick={NextSlide}>sljedeće</Button>)}</ParForm>
        </>
      ) : (
        // TODO add username
        <Message>uspješno ste dodali izgubljeni/pronadjeni predmet {router.push("/feed")}</Message>
      )
      }
    </Container>
  );
}



