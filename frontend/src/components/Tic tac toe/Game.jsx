import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Board from './Board';
import { faL } from '@fortawesome/free-solid-svg-icons';

const GameContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  font-family: Arial, sans-serif;
`;

const BoardContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const BoardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 100px);
  grid-gap: 5px;

  @media (max-width: 600px) {
    grid-template-columns: repeat(3, 80px);
    grid-gap: 3px;
  }
`;

const Square = styled.div`
  width: 100px;
  height: 100px;
  background-color: #fff;
  border: 1px solid #999;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  cursor: pointer;

  @media (max-width: 600px) {
    width: 80px;
    height: 80px;
    font-size: 20px;
  }

  &:hover {
    background-color: #f0f0f0;
  }
`;

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
            
            tabla[i]={zauzeta:true, tekst:"o", pozicija:tabla[i].pozicija}
            console.log(slobodnaMjesta.length)
            let vrijednost=minimax(tabla, "x", 1, false, slobodnaMjesta.length-1, kompjuter)
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
    const [slobodnaMjestaMinimax, setSlobodnaMjestaMinimax]=useState([1,2,3,4,5,6,7,8,9])
    const [kompjuter, setKompjuter]=useState();
    const [trenutniIgrac, setTrenutniIgrac]=useState("x");
    const [trenutniIgracMinimax, setTrenutniIgracMinimax]=useState("x");
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
       // setKompjuter(randomIgrac===0 ? "x": "o")
       setKompjuter("o")
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
                const MinimaxMjesto=nadjiNajbolji(noveKockice, "o", novaSlobodnaMjesta, kompjuter);
                
               
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

    
  return (
    <GameContainer>
      <BoardContainer>
        <Board kockice={kockice} funkcija={odigrajPotez} trenutniIgrac={trenutniIgrac}></Board>
      </BoardContainer>
      {zavrsenaIgra || slobodnaMjesta.length===0 ? <p> {ishod}</p>:<p></p>}
    </GameContainer>
  );
};

export default Game;
