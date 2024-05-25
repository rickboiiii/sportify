"use client";
import {Container} from "../Containers/ContainerStyled";
import { Label, Input } from "./InputStyled";

export default function InputContainer(props) {
    return (
        <Container>
        <Label>{props.label}</Label><Input id={props.id} name={props.name} type="text"/>
        </Container>
    )
}