"use client";

import { Container, Naslov, Forma1 } from "../Containers/ContainerStyled";
import InputContainer from "../Inputs/InputSelect";


export default function ParForma ({h_text, funkcija, vrijednost, children, pitanje}) {

    return(
        <Container>
        <Naslov>{h_text}</Naslov>
        <Forma1 >
            <InputContainer funkcija={funkcija} vrijednost={vrijednost} pitanje={pitanje} children={children} />
            {children}
        </Forma1></Container>
    )
}