"use client";

import styled from "styled-components";
import {
    dirtyWhite,
    lapisLazuli,
    lapisLazuliLight,
    oxion,
    taupeGrayLight,
    ghostWhite,
    taupeGray
} from "@/styles/GlobalStyle";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 2rem 0;
`;

export const ContainerOld = styled.div`
    display: flex;
    width: 100%;
    justify-content: center;
    margin: 2rem 0;
    padding: 0 4rem;
`;
export const ContainerSearch = styled.div`
    display: flex;
    width: 100%;
    flex-direction: column;
    align-items: center;
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
    font-size: 4vw;
    color: ${ghostWhite}
`;

export const Forma1 = styled.div`
    margin: auto;
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
    background: ${taupeGrayLight};
    color: black;
    
    i {
        color: ${lapisLazuli};
        margin: 0.25rem;
        font-size: 14px;
        vertical-align: 1px;
    }
    
    p {
        align-self: end;
        font-weight: bold;
        text-align: end;
    }
    
    h4 {
        margin-top: 0;
    }
    
    h5 {
        margin: 0;
        color: ${lapisLazuli};
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
    flex-direction: column;
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

    &.event-img {
        border-radius: 10% 10% 0 0;
    }
`;

export const ProgressBarContainer = styled.div`
    display: flex;
    flex: 1;
`;

export const ProgressBarBackground = styled.div`
    position: relative;
    display: flex;
    flex: 1;
    height: 1rem;
    border: 0;
    border-radius: 10px;
    background: ${taupeGrayLight};
`;

export const ProgressBarForeground = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    height: 1rem;
    border: 0;
    border-radius: 10px;
    background: ${lapisLazuliLight};
`;

export const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(8rem, 1fr));
    gap: 1rem;
`;

export const GridItem = styled.div`
    border: 1px solid ${taupeGray};
    border-radius: 10px;
    color: ${lapisLazuli};
`;

export const GridItemHeader = styled.div`
    padding: 0.5rem;
    border-top-left-radius: 9px;
    border-top-right-radius: 9px;
    border-bottom: 1px solid ${taupeGrayLight};
    
    &.active {
        background: ${lapisLazuliLight};
        color: ${ghostWhite};
    }
`;

export const GridItemBody = styled.div`
    display: flex;
    flex-direction: column;
    padding: 0.5rem;
    flex: 1;
    
    h6 {
        margin: 0;
    }
`;

export const GridItemFooter = styled.div`
    padding: 0.5rem;
    font-size: small;
    text-align: end;
    border-bottom-left-radius: 9px;
    border-bottom-right-radius: 9px;
    border-top: 1px solid ${taupeGrayLight};
    
    &.active {
        background: ${lapisLazuliLight};
        color: ${ghostWhite};
    }
`;