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
export const Select = styled.select`
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

export const InputMasked = styled.span`
    
`;

export const InputMaskedStyled = styled.input`
    border: none;
    font-style: inherit;
    font-variant-ligatures: inherit;
    font-variant-caps: inherit;
    font-variant-numeric: inherit;
    font-variant-east-asian: inherit;
    font-variant-alternates: inherit;
    font-variant-position: inherit;
    font-weight: inherit;
    font-stretch: inherit;
    font-size: inherit;
    font-family: inherit;
    font-optical-sizing: inherit;
    font-kerning: inherit;
    font-feature-settings: inherit;
    font-variation-settings: inherit;
    color: inherit;
    letter-spacing: inherit;
    word-spacing: inherit;
    line-height: inherit;
    text-transform: inherit;
    text-indent: inherit;
    text-shadow: inherit;
    text-align: inherit;
    appearance: inherit;
    -webkit-rtl-ordering: logical;
    cursor: text;
    background-color: transparent;
    margin: 0;
    padding: inherit;
    padding-block: inherit;
    padding-inline: inherit;
    min-width: 3.5ch;
    width: 2ch;
    max-width: 10rem;

    &:hover {
        background: rgba(155, 155, 155, 0.2);
    }
    
    &:focus-visible {
        outline: none;
        border-bottom: 1px solid ${oxion};
    }
    
    &#maxDistance {
        min-width: 1.5ch;
    }
    
    &#dateOfBirth {
        min-width: 13ch;
    }
    
    &#fullName {
        min-width: 10ch !important;
    }
`;


export const SelectMaskedStyled = styled.select`
    font-style: inherit;
    font-variant-ligatures: inherit;
    font-variant-caps: inherit;
    font-variant-numeric: inherit;
    font-variant-east-asian: inherit;
    font-variant-alternates: inherit;
    font-variant-position: inherit;
    font-weight: inherit;
    font-stretch: inherit;
    font-size: inherit;
    font-family: inherit;
    font-optical-sizing: inherit;
    font-kerning: inherit;
    font-feature-settings: inherit;
    font-variation-settings: inherit;
    text-rendering: auto;
    color: inherit;
    letter-spacing: normal;
    word-spacing: normal;
    line-height: normal;
    text-transform: none;
    text-indent: 0;
    text-shadow: none;
    display: inline-block;
    text-align: start;
    margin: 0;
    background: transparent;
    border: none;
    
    &:hover {
        background: rgba(155, 155, 155, 0.2);
    }
    
    &:focus-visible {
        outline: none;
        border-bottom: 1px solid ${oxion};
    }
    
    option {
        font-weight: inherit;
        display: block;
        min-height: 1.2em;
        padding: 0 2px 1px;
        white-space: nowrap;
    }
`;