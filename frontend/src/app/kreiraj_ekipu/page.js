"use client"
import axios from "axios";
import Select from 'react-select';
import React, { useEffect, useState } from "react"
import CardSelect from "@/components/QuizCard/KarticaSelect";
import { Label, Input } from "@/components/Inputs/InputStyled";
import { Container } from "@/components/Containers/ContainerStyled";
import { Row } from "@/components/Containers/ContainerStyled";
import styled from "styled-components";
import {ghostWhite, ghostWhiteLight, oxion} from "@/styles/GlobalStyle";



 const Ekipa=()=>{
    const [imeEkipe, setImeEkipe]=useState("")
    const [sport, setSport]=useState(1);
    const [saigraci, setSaigraci]=useState([])
    const [sportovi, setSportovi]=useState()
    const id=1 // promijeniti ovo kad bude sesije
    const [ponudjeniSaigraci, setPonudjeniSaigraci]=useState([])
    const [username, setUsername]=useState("");
    
    // <InputContainer funkcija={funkcija} vrijednost={vrijednost} pitanje={pitanje} children={children} />



    useEffect(()=>{
        axios.get("http://localhost:8000/sportovi")
        .then(response=>
            setSportovi(()=> {return {pitanje:"sport", odgovori:response.data.map(sport=>sport.naziv_sporta)}}))
        .catch(err=>console.log(err))
    }, []
)
useEffect(()=>{
    axios.get(`http://localhost:8000/pretraziPrijatelje/${id}/${"Svi"}/${Boolean(true)}`)
    .then(response=>setPonudjeniSaigraci(response.data.map(saigrac=>{return{username:saigrac.korisnicko_ime, id_korisnika:saigrac.id_korisnika}})))
    .catch(err=>console.log(err)) 
}, [])
const handleSelect=(e)=>{
    setSport(e.target.value)
}

let odgovori=<option></option>
let SelectSport=<p></p>;
if (sportovi)
     odgovori=sportovi.odgovori.map((odgovor, indeks)=>
        <option value={indeks+1}>{odgovor}</option>
    )
    SelectSport=<>
    <Label>Odaberite sport</Label><br></br>
    <SelectKomponenta  onChange={(e)=>handleSelect(e)} value={sport} >
    {odgovori}
    </SelectKomponenta></>;
let SelectSaigrac=<p></p>


if (ponudjeniSaigraci)
   SelectSaigrac= ponudjeniSaigraci.map((saigrac) => ({
    value: saigrac.id,
    label: saigrac.username,
  }));
const handleChange=(id, e)=>{
    if (!e.target) return
    
    if(e.target.value)
        {setUsername(e.target.value);
            axios.get(`http://localhost:8000/pretraziPrijatelje/${id}/${e.target.value}/${Boolean(false)}`)
        .then(response=>setPonudjeniSaigraci(response.data.map(saigrac=>{return{username:saigrac.korisnicko_ime, id_korisnika:saigrac.id_korisnika}})))
        .catch(err=>console.log(err))}
    else
    {   setUsername("")
        axios.get(`http://localhost:8000/pretraziPrijatelje/${id}/${"Svi"}/${Boolean(true)}`)
    .then(response=>setPonudjeniSaigraci(response.data.map(saigrac=>{return{username:saigrac.korisnicko_ime, id_korisnika:saigrac.id_korisnika}})))
    .catch(err=>console.log(err))
}
}
console.log(ponudjeniSaigraci)

const test = [{
    value: "test",
    label: "test"
  }, {
    value: "test1",
    label: "test1"
  }];

    return (
    <Container style={{alignItems:"center", overflow:"visible !important"}}>
    <h1>Kreirajte svoju ekipu</h1>
    <Container style={{alignItems:"center", overflow:"visible !important"}}>
                
                <Label>Ime Ekipe</Label><br></br>
                <Input value={imeEkipe} onChange={(e)=>setImeEkipe(e.target.value)} type="text"></Input>
                <p>{imeEkipe}</p>
                {SelectSport}
                <br></br>

                <Select 
                    isMulti
                    menuIsOpen={true}
                    options={test}
                    styles={{color:"red"}}
                    openMenuOnClick={true}
                    placeholder="Select players..."
                    isSearchable={true}

                />
    </Container>
    </Container>)


}
export default Ekipa

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