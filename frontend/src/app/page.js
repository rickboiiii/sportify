"use client";

import '@/app/globals.css';
import { useState } from 'react';
import { Container } from "@/components/Containers/ContainerStyled";
import ParForm from "@/components/Forms/ParForm";
import ProgressIndicator from '@/components/Indicators/ProgressIndicator';
import styled from 'styled-components';
import LocationFetcher from '@/components/Location/Locations';
import {Button} from '@/components/Button/ButtonStyled';

const Message = styled.h1`
  color: white;
  font-size: 32px;
  text-align: center;
  margin-top: 2rem;
`;

async function sendEventDetails(eventDetails) {
  try {
    const response = await fetch('http://localhost:8000/oglas_eventa', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(eventDetails),
    });

    if (!response.ok) {
      throw new Error('Failed to submit event details');
    }

    return await response.json();
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

export default function Home() {
  const labelSets = [
    {
      first: {
        label: "naziv termina",
        id: "id_termina",
        name: "naziv_termina",
      },
      second: {
        label: "kratki opis",
        id: "id_opisa",
        name: "opis_termina",
      }
    },
    {
      first: {
        label: "mjesto održavanja",
        id: "id_lokacije",
        name: "lokacija",
      },
      second: {
        label: "vrijeme održavanja",
        id: "id_vremena",
        name: "pocetak_termina",
      }
    },
    {
      first: {
        label: "broj igrača",
        id: "id_broja_igraca",
        name: "broj_slobodnih_mjesta",
      },
      second: {
        label: "sport",
        id: "id_sporta",
        name: "sport",
      }
    }
  ];

  const [formKey, setFormKey] = useState(0);
  const [currentLabelSetIndex, setCurrentLabelSetIndex] = useState(0);
  const [formSubmitCount, setFormSubmitCount] = useState(0);

  const handlePress = async () => {
    const formData = {
      naziv_termina: document.getElementById('id_termina').value,
      opis_termina: document.getElementById('id_opisa').value,
      lokacija: parseInt(document.getElementById('id_lokacije').value),
      pocetak_termina: document.getElementById('id_vremena').value,
      broj_slobodnih_mjesta: parseInt(document.getElementById('id_broja_igraca').value),
      sport: parseInt(document.getElementById('id_sporta').value),
    };

    try {
      await sendEventDetails(formData);
    } catch (error) {
      console.error('Failed to submit form', error);
    }
  };
  const NextSlide = () => {
    if (formSubmitCount < 2) {
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
            h_text={"Osnovne informacije o terminu"}
          ><button >sljedeće</button></ParForm>
        </>
      ) : (
        
        <Message>uspješno ste dodali termin</Message>
        
      ) 
      }
    </Container>

  );
}

/*"use client";
import '@/app/globals.css'
import { useState } from 'react';
import { Container } from "@/components/Containers/ContainerStyled";
import ParForm from "@/components/Forms/ParForm";
import ProgressIndicator from '@/components/Indicators/ProgressIndicator';
import styled from 'styled-components';
import LocationFetcher from '@/components/Location/Locations';

const Message = styled.h1`
  color: white;
  font-size: 32px;
  text-align: center;
  margin-top: 2rem;
`;

export default function Home() {
  const labelSets = [
    {
      first: {
        label: "naziv termina",
        id: "id_termina",
        name: "naziv1",
      },
      second: {
        label: "kratki opis",
        id: "id_opisa",
        name: "naziv2",
      }
    },
    {
      first: {
        label: "mjesto održavanja",
        id: "id_lokacije",
        name: "naziv3",
      },
      second: {
        label: "vrijeme održavanja",
        id: "id_vremena",
        name: "naziv4",
      }
    },
    {
      first: {
        label: "broj igrača",
        id: "id_broja_igraca",
        name: "naziv5",
      },
      second: {
        label: "sport",
        id: "id_sporta",
        name: "naziv6",
      }
    }
  ];

  const [formKey, setFormKey] = useState(0);
  const [currentLabelSetIndex, setCurrentLabelSetIndex] = useState(0);
  const [formSubmitCount, setFormSubmitCount] = useState(0);

  const handlePress = () => {
    if (formSubmitCount < 2) {
      setFormKey(prevKey => prevKey + 1);
      setCurrentLabelSetIndex(prevIndex => (prevIndex + 1) % labelSets.length);
      setFormSubmitCount(prevCount => prevCount + 1);
    } else {
      setFormSubmitCount(prevCount => prevCount + 1);
    }
  };

  return (
    <Container>
      {formSubmitCount < 3 ? (
        <>
         <ProgressIndicator steps={3} active_number={formSubmitCount +1} />
          <ParForm
            key={formKey}
            onPress={handlePress}
            inputs={labelSets[currentLabelSetIndex]}
            h_text={"Osnovne informacije o terminu"}
          />
        </>
      ) : (
        <>
        <Message>uspješno ste dodali termin</Message>
        <LocationFetcher></LocationFetcher></>
      )}
    </Container>
  );
}
*/
