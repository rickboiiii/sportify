"use client";

import { ghostWhite } from "@/styles/GlobalStyle";
import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 2rem 0;
`;

export const Row = styled.div`
    display: flex;
    justify-content: space-between;
    margin: 2vw 0;
    padding: 0 15vw;
`;

export const Column = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 2vw 0;
    padding: 0 4vw;
`;


export const Naslov = styled.h1`
    margin:auto;
    letter-spacing: 1px;
    font-size: 3rem;
    color: ${ghostWhite}
`;

export const Forma = styled.form`
    margin: auto;
`;