"use client";
import {Container} from "../Containers/ContainerStyled";
import { Label, Input } from "./InputStyled";

export default function InputContainer({funkcija, vrijednost}) {
    return (
        <Container>
       <Input type="number" onChange={(e)=>funkcija(e)} value={vrijednost}/>
        </Container>
    )
}