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
import { Button } from "@/components/Button/ButtonStyled";
import Image from "next/image";
import left_arrow from "@/images/left_arrow.png"
import { useRouter } from "next/navigation";



 const Ekipa=()=>{
    const router=useRouter();
    const [imeEkipe, setImeEkipe]=useState("")
    const [sport, setSport]=useState(1);
    const [saigraci, setSaigraci]=useState([])
    const [sportovi, setSportovi]=useState()
    const id=7 // promijeniti ovo kad bude sesije
    const [ponudjeniSaigraci, setPonudjeniSaigraci]=useState([])
    const [username, setUsername]=useState("");
    
    // <InputContainer funkcija={funkcija} vrijednost={vrijednost} pitanje={pitanje} children={children} />

    const customStyles = {
        option: (provided, state) => ({
          ...provided,
          color: 'black',
          backgroundColor: state.isSelected ? 'lightgrey' : 'white',
          fontSize: '30px',
          width: '450px',
          borderRadius:"150px"

        }),
        singleValue: (provided) => ({
          ...provided,
          color: 'black',
          fontSize: '30px',
          borderRadius:"150px"
        }),
        multiValue: (provided) => ({
          ...provided,
          color: 'black',
          fontSize: '30px',
          borderRadius:"150px"
        }),
        multiValueLabel: (provided) => ({
          ...provided,
          color: 'black',
          fontSize: '30px',
          borderRadius:"150px"
        }),
        placeholder: (provided) => ({
          ...provided,
          color: 'black',
          fontSize: '30px',
          borderRadius:"150px"
        }),
        input: (provided) => ({
          ...provided,
          color: 'black',
          fontSize: '30px',
          width: '450px',
          borderRadius:"150px",
          paddingLeft:"10px"
        }),
        control: (provided) => ({
          ...provided,
          width: '450px',
          borderRadius:"150px"
        }),
        container: (provided) => ({
          ...provided,
          width: '450px',
          borderRadius:"150px"
        }),
      };
      

    

    useEffect(()=>{
        axios.get("http://localhost:8000/sportovi")
        .then(response=>
            setSportovi(()=> {return {pitanje:"sport", odgovori:response.data
            .map(sport=>{return{odgovor:sport.naziv_sporta, indeks:sport.id_sporta}})}}))
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
        <option value={odgovor.indeks}>{odgovor.odgovor}</option>
    )
    SelectSport=<>
    <Label>Odaberite sport</Label><br></br>
    <SelectKomponenta  onChange={(e)=>handleSelect(e)} value={sport} >
    {odgovori}
    </SelectKomponenta></>;
let SelectSaigrac=<p></p>


if (ponudjeniSaigraci)
   SelectSaigrac= ponudjeniSaigraci.map((saigrac) => ({
    value: saigrac.id_korisnika,
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
console.log("sport", sportovi)
const dodajEkipu=(id, ime, clanovi, sport)=>{
    if (!ime  || !sport || !clanovi)
        {alert("niste unijeli sve podatke"); return}
    let ekipa={
        naziv_ekipe:ime,
        id_sporta:Number(sport), 
        id_kapitena:Number(id)
    }
    axios.post(`http://localhost:8000/dodajEkipu`,ekipa)
    .then(res=>{axios.post(`http://localhost:8000/dodajClanoveEkipe`, {id_ekipe:res.data.id_ekipe, igraci:clanovi}).then(res=>console.log(res)).catch(err=>console.log(err))
    ;router.push("/")})
    .catch(err=>console.log(err))

}
console.log(saigraci)


    return (
    <Container style={{alignItems:"center", overflow:"visible !important", marginBottom:"50vh"}}>
    <Row style={{justifyContent:"start", alignItems:"space-between"}}>
      <Image src={left_arrow} width={20} height={20}/>
        <a href='http://localhost:3000'>Povratak na prethodnu stranicu</a>
        
        </Row>
        <Label>Kreirajte svoju ekipu</Label>
    <Container style={{alignItems:"center", overflow:"visible !important"}}>
                
                <Label>Ime Ekipe</Label>
                <Input placeholder="Unesite ime ekipe" value={imeEkipe} onChange={(e)=>setImeEkipe(e.target.value)} type="text"></Input>
                <p>{imeEkipe}</p>
                <br></br>
                {SelectSport}
                <br></br>
                <Label>Dodajte saigrače</Label><br></br>
                <Select 
                    isMulti
                    options={SelectSaigrac}
                    styles={customStyles}
                    onChange={(e)=>setSaigraci(e.map(igrac=>igrac.value))}
                    openMenuOnClick={true}
                    placeholder="Pretražite prijatelje po korisničkom imenu"
                    isSearchable={true}

                />
                <Button onClick={(()=>dodajEkipu(id, imeEkipe, saigraci, sport))} style={{marginTop:"10vh"}}>Kreirajte</Button>
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