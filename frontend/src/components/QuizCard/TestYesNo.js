
import React from 'react';
import styled from 'styled-components';

const QuizContainer = styled.div`
  font-family: Arial, sans-serif;
  background-color: #2b6ba4;
  color: white;
  padding: 20px;
  border-radius: 10px;
  width: 50%;
  margin: auto;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const BackLink = styled.a`
  align-self: flex-start;
  color: white;
  text-decoration: none;
  margin-bottom: 20px;
`;

const Progress = styled.div`
  display: flex;
  align-items: center;
`;

const Circle = styled.div`
  background-color: ${props => props.active ? '#d1d1d1' : '#c4e538'};
  color: #2b6ba4;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 5px;
`;

const Line = styled.div`
  width: 50px;
  height: 5px;
  background-color: #c4e538;
`;

const QuestionSection = styled.div`
  text-align: center;
`;

const QuestionCount = styled.div`
  margin: 20px 0;
`;

const QuestionText = styled.div`
  font-size: 1.2em;
  margin-bottom: 20px;
`;

const AnswerOptions = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const AnswerOption = styled.div`
  display: flex;
  align-items: center;
  margin: 10px 0;
  width: 60%;
  cursor:pointer;
`;

const OptionLetter = styled.span`
  background-color: #2b6ba4;
  color: #c4e538;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
`;

const OptionText = styled.span`
  color:black;
  display:flex;
  width:25vw;
  background-color: #d1d1d1;
  height: 30px;
  border-radius: 15px;
  justify-content:center;
  align-items:center;
`;

const SubmitButton = styled.button`
  background-color: #333;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 20px;
`;

const Quiz = ({ pitanje, handleAnswer, i }) => {
    return (
      <QuizContainer>
        <Header>
          <BackLink href="#">Povratak na prethodnu stranicu</BackLink>
          <Progress>
            {Array.from(9).map((_,indeks)=>{i===indeks ? 
            <><Circle active> {indeks+1}</Circle> <Line/> </>  : <><Circle > {indeks+1}</Circle> <Line/> </>  })}
            <Circle active>1</Circle>
            <Line />
            <Circle>2</Circle>
            <Line />
            <Circle>3</Circle>
            <Line />
            <Circle>4</Circle>
          </Progress>
        </Header>
        <QuestionSection>
          <QuestionCount>1 od 10</QuestionCount>
          <QuestionText>{pitanje.pitanje}</QuestionText>
          <AnswerOptions>
            <AnswerOption onClick={() => handleAnswer(pitanje.udio, 1)}>
              <OptionLetter>a</OptionLetter>
              <OptionText>Da</OptionText>
            </AnswerOption>
            <AnswerOption onClick={() => handleAnswer(pitanje.udio, 1)}>
              <OptionLetter>b</OptionLetter>
              <OptionText>Ne</OptionText>
            </AnswerOption>
          </AnswerOptions>
          
        </QuestionSection>
      </QuizContainer>
    );
  };
export default Quiz;  