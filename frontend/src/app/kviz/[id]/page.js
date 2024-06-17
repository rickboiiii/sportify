"use client"

import { useEffect, useState } from "react";
import CardYesNo from "@/components/QuizCard/Kartica";
import CardNumeric from "@/components/QuizCard/KarticaNumeric";
import CardSelect from "@/components/QuizCard/KarticaSelect";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import axios from "axios"
import "./Kviz.css"
// import Quiz from "@/components/QuizCard/TestYesNo";



 function Kviz () {
    const pitanja= [
        {
            pitanje:"Da li ste se profesionalno bavili sportom?",
            tip:"da-ne",
            udio:0.15
        },
        {
            pitanje:"Da li ste ikada bili član startne postave svoje ekipe?",
            tip:"da-ne",
            udio:0.1
        },
        {
            pitanje:"Da li ste ikada bili kapiten svoje ekipe?",
            tip:"da-ne",
            udio:0.1
        },
        {
            pitanje:"Da li pratite svoj napredak u sportu?",
            tip:"da-ne",
            udio:0.05
        },
        {
            pitanje:"Da li pored svog sporta imate još neki vid fizičkih aktivnosti?",
            tip:"da-ne",
            udio:0.1
        },
        {
            pitanje:"Koliko prosječno dana u sedmici izdvojite za trening?",
            tip:"numericko",
            funkcija: (x)=>((x)/7)*0.15
        },
        {
            pitanje:"Koliko sati traje vaš prosječan trening?",
            tip:"numericko",
            funkcija: (x)=>((Math.min(Math.max(x,0.5),3 )-0.5)/2.5)*0.1
        },
        {
            pitanje:"Koliko godina se bavite ovim sportom?",
            tip:"numericko",
            funkcija: (x)=>((x)/20)*0.15
        },
        {
            pitanje:"Koji je vaš cilj u ovome sportu?",
            tip:"select",
            funkcija: (x)=>((Math.min(Math.max(x,1),4 )-1)/3)*0.02, 
            odgovori:["Da se zabavim i provedem vrijeme.",
            "Nije mi toliko bitan cilj, samo želim biti aktivan.",
             "Volio bih poboljšati svoje vještine i možda sudjelovati na lokalnim natjecanjima.",
             "Ciljam na postizanje vrhunskih rezultata na nacionalnoj ili međunarodnoj razini." ]
        },
        {
            pitanje:"Na koji način održavate svoju formu?",
            tip:"select",
            funkcija: (x)=>((Math.min(Math.max(x,1))-1)/3)*0.08,
            odgovori:["Ne vježbam redovno i ne brinem se previše o svojoj formi.",
            "Ponekad odradim neki trening ili vježbu kad se sjetim.", 
            "Pokušavam redovito vježbati i pratiti neki jednostavan plan treninga.",
            "Imam strukturiran trening program i kombiniram različite aktivnosti kako bih održao/la svoju formu na visokoj razini."]
        }
    ]

    const router=useRouter()
    const params=useParams();
    const {id}=params;
    const [stanje, setStanje]=useState(0);
    const [indeksPitanja, setIndeksPitanja]=useState(0);
    const handleYesNoAnswer=(udio, odgovor)=>{setStanje(prethodnoStanje=>prethodnoStanje+odgovor*udio);setIndeksPitanja(prethodniIndeks=>prethodniIndeks+1) }
    const handleNumericAnswer=(funkcija, odgovor)=>{setStanje(prethodnoStanje=>prethodnoStanje+funkcija(odgovor));setIndeksPitanja(prethodniIndeks=>prethodniIndeks+1)}
    useEffect(()=>{
        if (indeksPitanja===pitanja.length)  {
    axios.put(`http://localhost:8000/dodajSposobnost/${stanje}/${id}`)
    .then(response=>{
        router.push("/login")
        console.log(response)
    }
        
    ).catch(error=>console.log(error))
}
    }, [indeksPitanja])

    return (
        (indeksPitanja < pitanja.length) ? 
                (pitanja[indeksPitanja].tip==="da-ne") ?
                    <CardYesNo pitanje={pitanja[indeksPitanja]} handleAnswer={handleYesNoAnswer} indeks={indeksPitanja} id={Number(id)} /> 
                    : (pitanja[indeksPitanja].tip==="numericko") ? 
                        <CardNumeric pitanje={pitanja[indeksPitanja]} handleAnswer={handleNumericAnswer} indeks={indeksPitanja} id={Number(id)} />
                         : <CardSelect pitanje={pitanja[indeksPitanja]} handleAnswer={handleNumericAnswer} indeks={indeksPitanja} id={Number(id)} /> 
        : <h1></h1>
      );
    }

// <CardFinish vrijednost={stanje} id={id} router={router}></CardFinish>
export default Kviz;