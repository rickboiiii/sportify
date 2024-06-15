"use client";

import React from 'react';
import { Container } from "../Containers/ContainerStyled";
import { Label, Input } from "./InputStyled";
import SelectButton from "../Selects/Selectbutton"; 

export default function InputContainer(props) {
    return (
        <Container>
            <Label>{props.label}</Label>
            {props.values === undefined ? (
                <Input id={props.id} name={props.name} type="text" />
            ) : (
                <SelectButton id={props.id} name={props.name} options={props.values} />
            )}
        </Container>
    );
}
