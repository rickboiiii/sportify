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
import { useRouter } from "next/navigation";

const Message = styled.h1`
  color: white;
  font-size: 32px;
  text-align: center;
  margin-top: 2rem;
`;

// Dinamički učitaj MapComponent bez SSR-a
const MapComponent = dynamic(() => import('@/components/Map/map'), { ssr: false });

//terenDetails
async function sendTerenDetails(terenDetails) {
  try {
    const response = await axios.post('http://localhost:8000/kreiraj_teren', terenDetails); //terenDetails
    return response.data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

export default function KreiranjeTerena() {
  const router=useRouter();
  const [token, setToken] = useState(null);
  const [idKorisnika, setIdKorisnika] = useState(null);
  const [id, setId]=useState(null);
  const [username, setUsername]=useState("");
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
        const parsedToken = JSON.parse(storedToken);
        setToken(parsedToken.access_token);
        fetchIdKorisnika(parsedToken.access_token);
    }
}, []);

const fetchIdKorisnika = async (token) => {
  try {
      const response = await fetch(`http://localhost:8000/get_id/${token}`, {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
          }
      });
      if (response.ok) {
          const data = await response.json();
          setIdKorisnika(data);
          console.log("data", data)
          let temp_username;
            axios.get(`http://localhost:8000/dajKorisnika/${data}`)
            .then(res=>{
              temp_username=res.data.korisnicko_ime;
              setUsername(temp_username);

            }).catch(err=>console.log(err))
          axios.get(`http://localhost:8000/dajVlasnika/${data}`)
          .then(res=>{
            console.log("res", res.data)
            if (res.data)
              setId(res.data.id_vlasnika)
            else
              router.push(`/feed/${temp_username}`)
          })

          .catch(err=>console.log(err))
      } else {
          console.error('Failed to fetch id_korisnika:', response.statusText);
      }
  } catch (error) {
      console.error('Error fetching id_korisnika:', error);
  }
};
  const labelSets = [
    {
      first: {
        label: "naziv terena",
        id: "id1",
        name: "naziv_terena",
      },
      second: {
        label: "kratki opis",
        id: "id2",
        name: "opis_terena",
      }
    },
    {
      first: {
        label: "lokacija terena",
        id: "id1",
        name: "id_adrese",
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
        label: "recenzija",
        id: "id2",
        name: "recenzija",
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
    let cijena_po_terminu = parseFloat(document.getElementById('id1').value);
    let slika = parseInt(document.getElementById('id2').value);
    let recenzija= parseFloat(document.getElementById('id2').value)
    const formData = {
      naziv_lokacije: formValues[0],
      opis_lokacije: formValues[1],
      id_adrese: parseInt(formValues[2]),
      kapacitet: parseInt(formValues[3]),
      cijena_po_terminu: cijena_po_terminu,
      recenzija: recenzija,
      slika: slika
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
              id_vlasnika:id,
              username:username
            }
    } />
        {/*Button goes here for picture*/}
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