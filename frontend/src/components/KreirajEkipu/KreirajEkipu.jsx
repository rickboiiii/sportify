"use client";

import { Container, Naslov, Forma } from "../Containers/ContainerStyled";
import InputContainer from "../Inputs/Input";
import SelectContainer from "@/components/Inputs/InputSelect"


export default function ParForma () {

    return(
        <Container>
        <Naslov>{h_text}</Naslov>
        <Forma method="get" action="#">
            {/* <InputContainer {} />
            <SelectContainer {}/> */}
            <SelectContainer></SelectContainer>
            {children}
        </Forma></Container>
    )
}