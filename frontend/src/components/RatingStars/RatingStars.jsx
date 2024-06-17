import {taupeGrayLight} from "@/styles/GlobalStyle";
import {RatingStarsStyled} from "@/components/RatingStars/RatingStarsStyled";
import {useState} from "react";


export default function RatingStars({stars, stateSetter, mode = "view"}) {

    let starsList = [];

    for(let i = 1; i <= 5; i++) {
        if(i <= stars) {
            starsList.push(<i className="fas fa-star" key={i} onClick={() => stateSetter(i)}></i>)
        } else {
            starsList.push(<i className="fas fa-star" key={i} onClick={() => stateSetter(i)} style={{color: taupeGrayLight}}></i>)
        }
    }

    return (
        <>
            {
                (mode === "view") ?
                (starsList) :
                (<RatingStarsStyled>
                    {starsList}
                </RatingStarsStyled>)
            }
        </>
    );
}