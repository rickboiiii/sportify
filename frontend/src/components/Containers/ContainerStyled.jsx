"use client";

import styled from "styled-components";
import {dirtyWhite, lapisLazuli, oxion, taupeGray, ghostWhite} from "@/styles/GlobalStyle";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 2rem 0;
`;

export const ContainerOld = styled.div`
    display: flex;
    justify-content: center;
    margin: 2rem 0;
    padding: 0 4rem;
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

export const Card = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: left;
    max-width: 60vw;
    flex: 0.8;
    border: 0;
    border-radius: 1.25rem;
    background: ${taupeGray};
    color: black;
    
    i {
        color: ${lapisLazuli};
        margin: 0.25rem;
        font-size: 14px;
    }
`;

export const CardRow = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 0 1rem;
    margin: 1rem 0;
    
    @media only screen and (max-width: 768px) {
        flex-direction: column;
    }
`;

export const CardColumn = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 1rem 0;
    margin: 0 1rem;
`;

export const CardHeader = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 1rem;
    border: 0;
    border-top-left-radius: 1.25rem;
    border-top-right-radius: 1.25rem;
    background: ${dirtyWhite};
    color: ${oxion};
    
    @media only screen and (max-width: 768px) {
        flex-direction: column;
    }
`;
export const CardFooter = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 1rem;
    border: 0;
    border-bottom-left-radius: 1.25rem;
    border-bottom-right-radius: 1.25rem;
    background: ${dirtyWhite};
    color: ${oxion};
`;

export const CardSpan = styled.span`
    background: ${dirtyWhite};
    color: ${oxion};
    border: 0;
    border-radius: 1rem;
    flex: 1;
    padding: 0 0.5rem;
`;

export const CardImg = styled.img`
    width: 7rem;
    height: 7rem;
    margin: 0.5rem;
    border: 0;
    border-radius: 50%;
`;