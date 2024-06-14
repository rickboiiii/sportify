import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Board from './Board';
import {  Row } from "@/components/Containers/ContainerStyled";
import Image from "next/image";
import left_arrow from "@/images/left_arrow.png"
import { Naslov } from '@/components/Containers/ContainerStyled';
import {Button} from '@/components/Button/ButtonStyled';
import { faL } from '@fortawesome/free-solid-svg-icons';

const GameContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: start;
    height: 100vh;
    font-family: Arial, sans-serif;
    margin-top: 10vh;
`;

const BoardContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 10vh;
`;

// const BoardGrid = styled.div`
//   display: grid;
//   grid-template-columns: repeat(3, 100px);
//   grid-gap: 5px;

//   @media (max-width: 600px) {
//     grid-template-columns: repeat(3, 80px);
//     grid-gap: 3px;
//   }
// `;

// const Square = styled.div`
//   width: 100px;
//   height: 100px;
//   background-color: #fff;
//   border: 1px solid #999;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   font-size: 24px;
//   cursor: pointer;

//   @media (max-width: 600px) {
//     width: 80px;
//     height: 80px;
//     font-size: 20px;
//   }

//   &:hover {
//     background-color: #f0f0f0;
//   }
// `;

const provjeriKrajMinimax = (igrac, noveKockice, maximizer) => {
    // red
    if (noveKockice[0].tekst === noveKockice[1].tekst && noveKockice[0].tekst === noveKockice[2].tekst && noveKockice[0].tekst !== "") return maximizer ? 10 : -10;
    if (noveKockice[3].tekst === noveKockice[4].tekst && noveKockice[3].tekst === noveKockice[5].tekst && noveKockice[3].tekst !== "") return maximizer ? 10 : -10;
    if (noveKockice[6].tekst === noveKockice[7].tekst && noveKockice[6].tekst === noveKockice[8].tekst && noveKockice[6].tekst !== "") return maximizer ? 10 : -10;
    // kolona
    if (noveKockice[0].tekst === noveKockice[3].tekst && noveKockice[0].tekst === noveKockice[6].tekst && noveKockice[0].tekst !== "") return maximizer ? 10 : -10;
    if (noveKockice[1].tekst === noveKockice[4].tekst && noveKockice[1].tekst === noveKockice[7].tekst && noveKockice[1].tekst !== "") return maximizer ? 10 : -10;
    if (noveKockice[2].tekst === noveKockice[5].tekst && noveKockice[2].tekst === noveKockice[8].tekst && noveKockice[2].tekst !== "") return maximizer ? 10 : -10;
    // glavna dijagonala 
    if (noveKockice[0].tekst === noveKockice[4].tekst && noveKockice[0].tekst === noveKockice[8].tekst && noveKockice[0].tekst !== "") return maximizer ? 10 : -10;
    // sporedna dijagonala
    if (noveKockice[2].tekst === noveKockice[4].tekst && noveKockice[2].tekst === noveKockice[6].tekst && noveKockice[2].tekst !== "") return maximizer ? 10 : -10;

    return 0;
}
// backtracking algoritam koji prije svakog poteza racuna optimalan potez na nacin da ispita sve slucajeve i vrati potez sa najoptimalnijom vrijednosti
// originalni kod sa https://www.geeksforgeeks.org/finding-optimal-move-in-tic-tac-toe-using-minimax-algorithm-in-game-theory/
// modificirao Matej Panić radi prilagodjavanja reactu i dodavanja funkcionalnosti
const minimax =(kockiceMinimax, trenutniIgrac,dubina,maximizer, brojSlobodnihMjesta, kompjuter)=>{
    //console.log("radim minimax")
    let rezultat=provjeriKrajMinimax(trenutniIgrac,kockiceMinimax,  !maximizer)
    if(rezultat<0) {
        return rezultat};
    if(rezultat>0) return rezultat;
    
    if (brojSlobodnihMjesta===0) return 0;
    let sljedeci
    if (trenutniIgrac==="x") sljedeci="o"
    else sljedeci="x";
    if (maximizer===true) {

        let najbolje=-1000;
        let ima_slobodnih=true;

        for (let i=0;i<9;i++){
            if (!kockiceMinimax[i].zauzeta){
                ima_slobodnih=false;
                kockiceMinimax[i]={pozicija:kockiceMinimax[i].pozicija, zauzeta:true, tekst:trenutniIgrac}

                let trenutno=minimax(kockiceMinimax, sljedeci, dubina+1, false, brojSlobodnihMjesta-1, kompjuter)
                najbolje=Math.max(trenutno, najbolje)
                kockiceMinimax[i]={pozicija:kockiceMinimax[i].pozicija, zauzeta:false, tekst:""}
    
                }


        }
        return najbolje ;
    }
    else {
        let najbolje=1000;
        let ima_slobodnih=false;
        for (let i=0;i<9;i++){
            if (!kockiceMinimax[i].zauzeta){
                
                ima_slobodnih=true;
                kockiceMinimax[i]={pozicija:kockiceMinimax[i].pozicija, zauzeta:true, tekst:trenutniIgrac}
    
                let trenutno=minimax(kockiceMinimax, sljedeci,dubina+1, true, brojSlobodnihMjesta-1, kompjuter)
                
                najbolje=Math.min(trenutno, najbolje)
                kockiceMinimax[i]={pozicija:kockiceMinimax[i].pozicija, zauzeta:false, tekst:""}
    
            }
        }
        
    return najbolje;
    }

}

const nadjiNajbolji=(tabla, trenutniIgrac, slobodnaMjesta, kompjuter)=>{
    let maks=-1000;
    let izbor=-1;
    
    for (let i=0;i<9;i++){
        if (tabla[i].zauzeta===false)
        {
            
            tabla[i]={zauzeta:true, tekst:trenutniIgrac, pozicija:tabla[i].pozicija}
            console.log(slobodnaMjesta.length)
            let vrijednost=minimax(tabla, trenutniIgrac==="x"?"o":"x", 1, false, slobodnaMjesta.length-1, kompjuter)
            tabla[i]={zauzeta:false, tekst:"", pozicija:tabla[i].pozicija}
            console.log(vrijednost, i)
            //console.log(tabla)
            if(vrijednost>maks){
                
                izbor=i;
                maks=vrijednost;
            }
        
        }
        
    }
    return izbor;

}

const Game = () => {
    const [ishod, setIshod]= useState("nerijeseno");
    const [tezina, setTezina]=useState("lagano")
    const [slobodnaMjesta, setSlobodnaMjesta]=useState([1,2,3,4,5,6,7,8,9])
    const [kompjuter, setKompjuter]=useState();
    const [trenutniIgrac, setTrenutniIgrac]=useState("x");
    const [zavrsenaIgra, setZavrsenaIgra]=useState(false)
    const [kockice, setKockice]=useState(
        [
            {pozicija:1,zauzeta:false, tekst:""},
            {pozicija:2,zauzeta:false, tekst:""},
            {pozicija:3,zauzeta:false, tekst:""},
            {pozicija:4,zauzeta:false, tekst:""},
            {pozicija:5,zauzeta:false, tekst:""},
            {pozicija:6,zauzeta:false, tekst:""},
            {pozicija:7,zauzeta:false, tekst:""},
            {pozicija:8,zauzeta:false, tekst:""},
            {pozicija:9,zauzeta:false, tekst:""}
        
        ]
    
    )

    
    useEffect(()=>{
        const randomIgrac=Math.floor(Math.random()*2)
         setKompjuter(randomIgrac===0 ? "x": "o")
         
       
    }, [])
        
    useEffect(()=>{
        if (slobodnaMjesta.length>8) {
            if (trenutniIgrac===kompjuter && !zavrsenaIgra ) {
                const randomMjesto=Math.floor(Math.random() * slobodnaMjesta.length)
                
                const randomPozicija=slobodnaMjesta[randomMjesto]
                
                let randomKocka=kockice[randomPozicija-1];
               
                odigrajPotez(randomKocka, trenutniIgrac)
            
        }}
        else{
            if (trenutniIgrac===kompjuter && !zavrsenaIgra ) {

                
                let noveKockice=kockice.map(element=>element)
                let novaSlobodnaMjesta=slobodnaMjesta.map(element=>element)
                let noviTrenutniIgrac=trenutniIgrac;
                const MinimaxMjesto=nadjiNajbolji(noveKockice, noviTrenutniIgrac, novaSlobodnaMjesta, kompjuter);
                
               
                odigrajPotez(kockice[MinimaxMjesto], trenutniIgrac);
            
        }
        }

    }, [trenutniIgrac, kompjuter, tezina])

   
    const provjeriKraj=(igrac, noveKockice)=>{
        let kraj=false;
        // red
        if (noveKockice[0].tekst===igrac && noveKockice[1].tekst===igrac && noveKockice[2].tekst===igrac) kraj= true;
       else if (noveKockice[3].tekst===igrac && noveKockice[4].tekst===igrac && noveKockice[5].tekst===igrac) kraj= true;
       else if (noveKockice[6].tekst===igrac && noveKockice[7].tekst===igrac && noveKockice[8].tekst===igrac) kraj= true;
        // kolona
       else if (noveKockice[0].tekst===igrac && noveKockice[3].tekst===igrac && noveKockice[6].tekst===igrac) kraj= true;
       else if (noveKockice[1].tekst===igrac && noveKockice[4].tekst===igrac && noveKockice[7].tekst===igrac) kraj= true;
       else if (noveKockice[2].tekst===igrac && noveKockice[5].tekst===igrac && noveKockice[8].tekst===igrac) kraj= true;
        // glavna dijagonala 
       else if (noveKockice[0].tekst===igrac && noveKockice[4].tekst===igrac && noveKockice[8].tekst===igrac) kraj= true;
        // sporedna dijagonala
        else if (noveKockice[2].tekst===igrac && noveKockice[4].tekst===igrac && noveKockice[6].tekst===igrac) kraj= true;
       else if (slobodnaMjesta.length===0) return true;

        if (kraj)
            {   
                setIshod("pobjednik je "+ igrac);
                return true;
            }

        return false;


    }

    const odigrajPotez=(trenutnaKocka, trenutniIgrac)=>{
 
        if(trenutnaKocka && !trenutnaKocka.zauzeta && !zavrsenaIgra){
            const noveKockice=kockice.map(kocka=>{
                if (kocka.pozicija===trenutnaKocka.pozicija)
                    {   
                        return {pozicija:kocka.pozicija, zauzeta:true, tekst:trenutniIgrac};}
                else 
                    return kocka;
    
            })
            setKockice(noveKockice)
            if (provjeriKraj(trenutniIgrac, noveKockice)) {
                setZavrsenaIgra(true);
                setIshod("pobjednik je "+trenutniIgrac);
            }
            else setTrenutniIgrac(prethodni=>prethodni==="x" ? "o" : "x")
            setSlobodnaMjesta( ()=>{
                let novaSlobodnaMjesta=[];
                for (let i=0;i<noveKockice.length;i++){
                    if (!noveKockice[i].zauzeta) novaSlobodnaMjesta.push(noveKockice[i].pozicija)
                }
            return novaSlobodnaMjesta;
            }
                
            )

        }
    }

    const restart=()=>{
    setIshod("nerijeseno")
    setSlobodnaMjesta([1,2,3,4,5,6,7,8,9])
    setKompjuter(prethodni=>{return prethodni==="x"?"o":"x"})
    setTrenutniIgrac("x");
    setZavrsenaIgra(false)
    setKockice(
        [
            {pozicija:1,zauzeta:false, tekst:""},
            {pozicija:2,zauzeta:false, tekst:""},
            {pozicija:3,zauzeta:false, tekst:""},
            {pozicija:4,zauzeta:false, tekst:""},
            {pozicija:5,zauzeta:false, tekst:""},
            {pozicija:6,zauzeta:false, tekst:""},
            {pozicija:7,zauzeta:false, tekst:""},
            {pozicija:8,zauzeta:false, tekst:""},
            {pozicija:9,zauzeta:false, tekst:""}
        
        ]
    
    )

    }
  return (
    <>
    <Row style={{paddingLeft: "10vw" ,justifyContent:"start", alignItems:"center"}}>
      <Image src={left_arrow} width={20} height={20} alt={"strelica"}/>
        <a style={{color:"white"}} href='http://localhost:3000/feed'>Povratak na prethodnu stranicu</a>
        </Row>
    <GameContainer>
      <BoardContainer>
      <Naslov>Tic Tac Toe</Naslov>
        <Board kockice={kockice} funkcija={odigrajPotez} trenutniIgrac={trenutniIgrac}></Board>
      </BoardContainer>
      {zavrsenaIgra || slobodnaMjesta.length===0 ? 
      <> <Naslov style={{color:"white", fontSize:"30px"}}>{ishod}</Naslov>
       <Button style={{backgroundColor:"white", color:"black"}} onClick={restart}>Restart</Button> </>
       :
       <p></p>}
    </GameContainer>
    </>
  );
};

export default Game;
