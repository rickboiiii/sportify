"use client";

import styled from "styled-components";
import { ghostWhite, oxion, oxionLight } from "@/styles/GlobalStyle";

export const StyledSelect = styled.select`
    background: ${ghostWhite};
    color: ${oxion};
    width: 450px;
    height: 60px;
    border: 0;
    border-radius: 150px;
    font-size: 32px;
    font-family: inherit;
    margin: auto;
    
    &:hover {
        background: ${ghostWhite};
    }
`;
