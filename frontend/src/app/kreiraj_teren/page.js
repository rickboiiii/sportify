"use client";
import '@/app/globals.css';
import { useState, useEffect } from 'react';
import { Container } from "@/components/Containers/ContainerStyled";
import ParForm from "@/components/Forms/ParForm";
import ProgressIndicator from '@/components/Indicators/ProgressIndicator';
import styled from 'styled-components';
import { Button } from '@/components/Button/ButtonStyled';
import axios from "axios";
import { lapisLazuli } from "@/styles/GlobalStyle";
import dynamic from 'next/dynamic';
import {ghostWhite, ghostWhiteLight, oxion} from "@/styles/GlobalStyle";

const Message = styled.h1`
  color: white;
  font-size: 32px;
  text-align: center;
  margin-top: 2rem;
`;

// Dinamički učitaj MapComponent bez SSR-a
const MapComponent = dynamic(() => import('@/components/Map/map'), { ssr: false });

async function sendTerenDetails(formData) {
  try {
    const response = await axios.post('http://localhost:8000/kreiraj_teren', formData); //terenDetails
    return response.data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

export default function Home() {
  const id_vlasnika=1;//MOLIM TE PROMIJENI OVO DA BUDE PREKO TOKENA
  const labelSets = [
    {
      first: {
        label: "naziv terena",
        id: "id1",
        name: "naziv_terena",
      },
      second: {
        label: "kapacitet terena",
        id: "id2",
        name: "kapacitet_terena",
      }
    },
    {
      first: {
        label: "cijena po terminu",
        id: "id1",
        name: "cijena_po_terminu",
      },
      second: {
        label: "prostor za sliku",
        id: "id2",
        name: "slika",
      }
    }
  ];
  const [sport, setSport]=useState(1)
  const [listaMogucihSportova, setListaMogucihSportova]=useState([]);
  const [prikazSportova, setPrikazSportova]=useState([])
  const [formKey, setFormKey] = useState(0);
  const [currentLabelSetIndex, setCurrentLabelSetIndex] = useState(0);
  const [formSubmitCount, setFormSubmitCount] = useState(0);
  const [formValues, setFormValues] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/sportovi");
        setListaMogucihSportova(response.data);
      } catch (error) {
        console.log(error); // Rukovanje greškom u slučaju neuspješnog dohvata
      }
    };
  
    fetchData(); // Pozivanje funkcije za dohvat podataka
  }, []); // Prazna niz ovisnosti kako bi se hook izvršio samo prilikom montiranja komponente
  
  useEffect(  ()=>{
  setPrikazSportova(
    listaMogucihSportova.map((sport, indeks) => (
      
      <option value={sport.id_sporta}>{sport.naziv_sporta} </option>
    )))
  console.log(listaMogucihSportova)
  console.log(typeof(listaMogucihSportova))
  console.log(prikazSportova)}, [listaMogucihSportova])

  const handlePress = () => {
    let cijena_po_terminu = parseInt(document.getElementById('id1').value);
    let slika = parseInt(document.getElementById('id2').value);
    const formData = {
      naziv_terena: formValues[0],
      kapacitet: formValues[1],
      cijena_po_terminu: cijena_po_terminu,
      slika: slika,
    };console.log(formData)

    try {
      axios.post('http://localhost:8000/kreiraj_teren', formData)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
      sendTerenDetails(formData);
    } catch (error) {
      console.error('Failed to submit form', error);
    }

    setFormSubmitCount((prevCount) => prevCount + 1);
  };

  const NextSlide = () => {
    console.log(formValues, "forma")
    let prvaVrijednost = document.getElementById("id1").value;
    let drugaVrijednost = document.getElementById("id2").value;
    setFormValues([...formValues, prvaVrijednost, drugaVrijednost]);
    if (formSubmitCount < 2) {
      setFormKey((prevKey) => prevKey + 1);
      setCurrentLabelSetIndex((prevIndex) => (prevIndex + 1) % labelSets.length);
      setFormSubmitCount((prevCount) => prevCount + 1);
    } else {
      setFormSubmitCount((prevCount) => prevCount + 1);
    }
  };

  let komponenta = <p></p>;
  if (formSubmitCount<2) {
    komponenta = (
      <Container>
        {formSubmitCount < 2 ? (
          <>
            <ProgressIndicator steps={3} active_number={formSubmitCount + 1} />
            <ParForm
              key={formKey}
              inputs={labelSets[currentLabelSetIndex]}
              h_text={"Osnovne informacije o terenu"}
            >
              {formSubmitCount===1 && (<><label>Odaberite sport</label><br></br>
          <SelectKomponenta
                value={sport}
                onChange={e => setSport(e.target.value)} 
              >
                {prikazSportova}
                
          </SelectKomponenta><br></br></>)}
              {(formSubmitCount === 2) ? (<Button onClick={handlePress}>Završite</Button>) 
              : (<Button style={{marginTop:"50px"}} onClick={NextSlide}>sljedeće</Button>)}</ParForm>

          </>
        ) : (
          <Message>uspješno ste dodali teren</Message>
        )}
      </Container>
    );
  } else {
    komponenta = (
      <div style={{display:"flex", justifyContent:"center", alignItems:"center", flexDirection:"column"}}>
        <h1>Odaberite lokaciju</h1>
        <ProgressIndicator steps={3} active_number={formSubmitCount + 1} />
        <MapComponent formData={
              {naziv_terena: formValues[0],
                kapacitet: parseInt(formValues[1]),
              cijena_po_terminu: parseInt(document.getElementById('id1').value),
              slika: parseInt(document.getElementById('id2').value),
              sport:sport, 
              id_vlasnika:id_vlasnika
            }
    } />
        
      </div>
    );
  }

  return komponenta;
}
const SelectKomponenta = styled.select`
background: ${ghostWhite};
color: ${oxion};
width: 450px;
padding: 10px;
padding-left: 25px;
height: 60px;
border: 0;
border-radius: 150px;
font-size: 30px;
font-family: inherit;

&:hover {
    background: ${ghostWhiteLight};
}

&:focus {
    border: none;
    outline: none;
    background: ${ghostWhiteLight};
}
`;