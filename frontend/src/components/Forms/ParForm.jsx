"use client";

import { Container, Naslov, Forma } from "../Containers/ContainerStyled";
import { Button } from "../Button/ButtonStyled";
import InputContainer from "../Inputs/Input";


export default function ParForma (props ) {
    return(
        <Container>
        <Naslov>{props.h_text}</Naslov>
        <Forma method="get" action="#">
            <InputContainer {...props.inputs.first} />
            <InputContainer {...props.inputs.second}/>
            <Button onClick={props.onPress} type="button">sljedeće</Button>
        </Forma></Container>
    )
}
