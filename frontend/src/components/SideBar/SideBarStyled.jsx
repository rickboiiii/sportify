import styled from "styled-components";
import {ghostWhite, ghostWhiteLight, lapisLazuli, lapisLazuliLight, oxionLight} from "@/styles/GlobalStyle";


export const SideBarStyled = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100vh;
    width: 30%;

    div {
        display: flex;
        align-items: center;
    }

    p {
        margin: 0;
    }

    .logo {
        text-align: center;
        float: left;
        width: 3vw;
        height: 3vw;
        margin: 1rem 3rem;
    }

    &:hover {
        .header {
            color: ${ghostWhite};
        }
    }
`;

export const SideBarHeader = styled.div`
    display: flex;
    flex-direction: column;
    margin: 2rem;
    color: ${oxionLight};
    
    i {
        font-size: 2rem;
    }
    
    h2 {
        margin: 0;
    }
`;

export const SideBarTile = styled.a`
    text-decoration: none;
    margin: 0.5rem 0;
    
    .card-ghost-white {
        background: ${ghostWhite};
    }
    
    .border {
        border: 1px solid rgba(162, 155, 155, 0.9);
    }
`;