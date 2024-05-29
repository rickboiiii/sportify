import React from 'react';
import styled from 'styled-components';

const StyledSquare = styled.button`
  width: 100px;
  height: 100px;
  background-color: #fff;
  border: 1px solid #999;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  cursor: pointer;

  &:hover {
    background-color: #f0f0f0;
  }

  @media (max-width: 600px) {
    width: 80px;
    height: 80px;
    font-size: 20px;
  }
`;

const Square = ({  funkcija, tekst }) => {
  return <StyledSquare  onClick={funkcija}>{tekst}</StyledSquare>;
};

export default Square;
