"use client";

import styled from "styled-components";
import {ghostWhite, oxion, oxionLight} from "@/styles/GlobalStyle";

export const LogInButton = styled.button`
    background: ${oxion};
    color: ${ghostWhite};
    width: 500px;
    height: 70px;
    border: 0;
    border-radius: 150px;
    font-size: 32px;
    font-family: inherit;
    
    &:hover {
        background: ${oxionLight};
    }
`;
