"use client";

import styled from "styled-components";
import {ghostWhite, lapisLazuli, oxion, oxionLight, pear, taupeGray, taupeGrayLight} from "@/styles/GlobalStyle";

export const SearchBarStyled = styled.div`
    display: flex;
    margin: auto auto 1.5rem;
    width: 16rem;
    height: 2rem;
    background: ${ghostWhite};
    padding: 0.5rem 1rem;
    border: 0;
    border-radius: 1.25rem;

    form {
        display: flex;
        flex: 1;
    }

    input {
        flex: 1;
        height: 2rem;
        font-family: inherit;
        background: ${ghostWhite};
        border: 4px solid ${oxion}; 
        color: ${oxion};

        &:focus-visible {
            outline: 0;
        }

        &:focus {
            border-bottom: 1px solid ${taupeGrayLight};
        }
    }

    button {
        background: transparent;
        border: 0;
        color: ${taupeGrayLight};

        i {
            font-size: 1rem;
        }

        &:hover {
            color: ${taupeGray};
        }
    }
`;

export const SearchBarStyled2 = styled.div`
    display: flex;
    flex: 1;
    margin: 0;
    width: 90%;
    height: 2rem;
    background: ${ghostWhite};
    padding: 0.5rem ;
    border: 1px solid ${taupeGray};
    border-radius: 1.25rem;

    form {
        display: flex;
        flex: 1;
    }

    input {
        flex: 1;
        max-width: 90%;
        height: 2rem;
        font-family: inherit;
        background: ${ghostWhite};
        border: 0;
        color: ${oxion};

        &:focus-visible {
            outline: 0;
        }

        &:focus {
            border-bottom: 1px solid ${taupeGrayLight};
        }
    }

    button {
        background: transparent;
        border: 0;
        color: ${taupeGrayLight};

        i {
            font-size: 1rem;
        }

        &:hover {
            color: ${taupeGray};
        }
    }
`;

export const SearchBarContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 50%;
`;

export const SearchBarResult = styled.div`
    display: flex;
    margin: 0.5rem;
    background: ${ghostWhite};
    border: 0;
    border-radius: 0.625rem;
    
    img {
        width: 4rem;
        height: 4rem;
        border-radius: 50%;
        margin: 0.5rem
    }
    
    a {
        align-content: center;
    }
    
    i {
        font-size: 1.5rem;
        color: ${lapisLazuli};
        margin: 0 1rem;
        align-self: center;
    }
    
    h3 {
        flex: 1;
        margin: 0.75rem 0;
        color: ${oxionLight};
        
        i {
            font-size: 0.825rem;
            margin: 0.25rem;
            vertical-align: 2px;
        }
    }
`;
export const SearchBarResult2 = styled.div`
    display: flex;
    margin: 0.5rem;
    background: ${ghostWhite};
    border: 1px solid ${taupeGray};
    border-radius: 0.625rem;
    
    img {
        width: 4rem;
        height: 4rem;
        border-radius: 50%;
        margin: 0.5rem
    }
    
    a {
        align-content: center;
    }
    
    i {
        font-size: 1.5rem;
        color: ${lapisLazuli};
        margin: 0 1rem;
        align-self: center;
    }
    
    h3 {
        flex: 1;
        margin: 0.75rem 0;
        color: ${oxionLight};
        
        i {
            font-size: 0.825rem;
            margin: 0.25rem;
            vertical-align: 2px;
        }
    }
`;

export const SearchBarResultSplitter = styled.div`
    display: flex;
    height: 2.25rem;
    background: ${pear};
    color: ${oxion}
    border: 0;
    border-radius: 0.625rem;
    
    h2 {
        margin: 0 0.25rem;
    }
`;