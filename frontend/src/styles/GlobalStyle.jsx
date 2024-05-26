"use client";

import styled from "styled-components";

/*
 * Primary color theme
 *  - Base color
 *  - Light color (90% alpha)
 */
export const oxion = "#393E44";
export const oxionLight = "rgba(57,62,68,0.9)";
export const ghostWhite = "#F0F3FA";
export const ghostWhiteLight = "rgba(240,243,250,0.9)";
export const pear = "#D8ED0F";
export const pearLight = "rgba(216,237,15,0.9)";
export const taupeGray = "#A29B9B";
export const taupeGrayLight = "rgba(162,155,155,0.9)";
export const lapisLazuli = "#1C64A3";
export const lapisLazuliLight = "rgba(28,100,163,0.9)";

/*
 * Sizes
 */
export const fontSize1= "24px";
export const fontSize2 = "32px";
export const fontSize3 = "40px";
export const fontSize4 = "20px";
export const fontSize5 = "16px";
export const fontSize6 = "28px";

/*
 * Global style regarding body and every tag that is going to inherit this
 */
export const GlobalStyle = styled.body`
    font-family: "Saira Condensed", sans-serif;
    font-weight: 100;
    font-style: normal;
    background: ${ghostWhite};
    margin: 0;
    padding: 0;
    
`;
