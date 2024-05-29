"use client";
import {Container} from "../Containers/ContainerStyled";
import { Label, Select } from "./InputStyled";

export default function InputContainer({funkcija, vrijednost, pitanje, children}) {
    const odgovori=pitanje.odgovori.map((odgovor, indeks)=>
        <option value={indeks+1}>{odgovor}</option>
    )
    return (
        <Container>
       <Select onChange={(e)=>funkcija(e)} value={vrijednost}>
        {odgovori}
       </Select>
        </Container>
    )
}