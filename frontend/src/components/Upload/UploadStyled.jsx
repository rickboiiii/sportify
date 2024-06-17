import styled from "styled-components";
import {lapisLazuli, lapisLazuliLight, pearLight} from "@/styles/GlobalStyle";


export const Upload = styled.div`
    i {
        color: ${lapisLazuli};
        padding: 0.375rem;
        
        &:hover {
            cursor: pointer;
            color: ${lapisLazuliLight};
        }
        
        &:active {
            background: ${pearLight};
            border: 0;
            border-radius: 25%;
        }
    }
    
    &.position-absolute {
        position: absolute;
        bottom: 12%;
        right: 0;
    }
`;