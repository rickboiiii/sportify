import styled from "styled-components";
import {lapisLazuli, taupeGrayLight} from "@/styles/GlobalStyle";


export const RatingStarsStyled = styled.span`
    
    &:hover {
        i {
            color: ${lapisLazuli};
            cursor: pointer;
            
            &:hover~ i {
                color: ${taupeGrayLight};
            }
        }
    }
`;