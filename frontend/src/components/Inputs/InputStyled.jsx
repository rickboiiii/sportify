"use client";
import styled from "styled-components";
import {ghostWhite, ghostWhiteLight, oxion} from "@/styles/GlobalStyle";

export const Input = styled.input`
    background: ${ghostWhite};
    color: ${oxion};
    width: 450px;
    padding: 10px;
    padding-left: 25px;
    height: 60px;
    border: 0;
    border-radius: 150px;
    font-size: 30px;
    font-family: inherit;

    &:hover {
        background: ${ghostWhiteLight};
    }

    &:focus {
        border: none;
        outline: none;
        background: ${ghostWhiteLight};
    }
`;

export const Label = styled.label`
    color: ${ghostWhite};
    font-size: 30px;
    letter-spacing: 1px;
    font-family: inherit;
    margin-bottom: 1rem;
`;
