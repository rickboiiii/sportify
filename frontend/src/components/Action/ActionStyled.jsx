"use client";

import styled from "styled-components";
import {lapisLazuli, lapisLazuliLight} from "@/styles/GlobalStyle";

export const Action = styled.button`
    background: white;
    width: 3rem;
    height: 3rem;
    border: 0;
    border-radius: 1rem;
    font-size: 1.5rem;
    
    i {
        color: ${lapisLazuli};
    }
    
    &:hover {
        i {
            color: ${lapisLazuliLight};
        }
    }
`;
