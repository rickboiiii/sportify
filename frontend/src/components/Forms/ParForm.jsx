"use client";

import { Container, Naslov, Forma } from "../Containers/ContainerStyled";
import InputContainer from "../Inputs/Input";


export default function ParForma (props,children) {
    console.log(children)
    return(
        <Container>
        <Naslov>{props.h_text}</Naslov>
        <Forma method="get" action="#">
            <InputContainer {...props.inputs.first} />
            <InputContainer {...props.inputs.second}/>
            {children}
        </Forma></Container>
    )
}
