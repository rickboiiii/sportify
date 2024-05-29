import React from 'react';
import styled from 'styled-components';
import Square from './Square';

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

const Board = ({ kockice, funkcija, trenutniIgrac }) => {
    const podaci= kockice.map((kocka, i) => {
       // console.log(kocka);
       // Square({tekst:kocka.tekst, funkcija:()=>funkcija(kocka, trenutniIgrac)})
       return <Square tekst={kocka.tekst} funkcija={()=>funkcija(kocka, trenutniIgrac)}></Square>
}   )
  return (
    <BoardContainer>
      <BoardGrid>
        {podaci}
      </BoardGrid>
    </BoardContainer>
  );
};

export default Board;
