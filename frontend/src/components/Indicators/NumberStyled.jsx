
import styled from "styled-components";
import {lapisLazuli, pear} from "@/styles/GlobalStyle";

export const Number = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 2.4vw;
    font-weight: bold;
    font-family: inherit;
    border: 0.3vw solid ${pear};
    border-radius: 50%;
    width: 4.7vw;
    height: 3vw;
    background: transparent;
    color: ${pear};

    &.active {
        background: ${pear};
        color: ${lapisLazuli};
    }
`;