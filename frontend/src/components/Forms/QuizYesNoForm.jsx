"use client";

import { Container, Naslov, Forma1 } from "../Containers/ContainerStyled";
import InputContainer from "../Inputs/InputQuiz";


export default function ParForma ({h_text, children}) {

    return(
        <Container>
        <Naslov>{h_text}</Naslov>
        <Forma1 >
            {children}
        </Forma1></Container>
    )
}
