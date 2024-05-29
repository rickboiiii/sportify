"use client";
import {Container} from "../Containers/ContainerStyled";
import { Label, Select } from "./InputStyled";

export default function InputContainer({funkcija, vrijednost, pitanje}) {
const odgovori=pitanje.odgovori.map((odgovor, indeks)=>
    <option value={indeks}>odgovori</option>
)
    return (
        <Container>
        <Select onChange={(e)=>funkcija(e)} value={vrijednost}>
        {odgovori}

        </Select>
        </Container>
    )
}