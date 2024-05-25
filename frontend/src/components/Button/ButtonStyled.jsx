"use client";

import styled from "styled-components";
import {ghostWhite, oxion, oxionLight} from "@/styles/GlobalStyle";

export const Button = styled.button`
    background: ${oxion};
    color: ${ghostWhite};
    width: 450px;
    height: 60px;
    border: 0;
    border-radius: 150px;
    font-size: 32px;
    font-family: inherit;
    margin: auto;
    
    &:hover {
        background: ${oxionLight};
    }

`;
