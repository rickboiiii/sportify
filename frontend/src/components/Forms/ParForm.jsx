"use client";

import { Container, Naslov, Forma } from "../Containers/ContainerStyled";
import InputContainer from "../Inputs/Input";


export default function ParForma ({h_text, inputs, children}) {

    return(
        <Container>
        <Naslov>{h_text}</Naslov>
        <Forma method="get" action="#">
            <InputContainer {...inputs.first} />
            <InputContainer {...inputs.second}/>
            {children}
        </Forma></Container>
    )
}
