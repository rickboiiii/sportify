"use client"
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';
import Image from 'next/image';
import image7 from '../../../../files/images/image7.png';
import left_arrow from '../../../../files/images/left_arrow.png';
import { fontSize1, fontSize2, fontSize3, fontSize4, fontSize5, pear, ghostWhite, ghostWhiteLight, fontSize6 } from '@/styles/GlobalStyle';
import { Button } from "@/components/Button/ButtonStyled";


const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  flex-wrap: wrap;
  color: ${ghostWhiteLight};
  font-size: ${fontSize1};

  @media (max-width: 900px) {
    flex-direction: column-reverse;
    font-size: ${fontSize4};
  }
`;
const LeftSection = styled.div`
  flex: 1;
  padding: 2.5em 2em 4em 5em; 
  justify-content: center;
  @media (max-width: 700px) {
    padding-top: 1em;
    padding-left: 4em;
    padding-bottom: 2em;
    padding-right: 0em;
  }
`;

const RightSection = styled.div`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-image: url(${image7.src});
  background-size: cover;
  background-position: center;
  min-height:100vh;
  @media (max-width: 985px) {
    min-height: 15vh;
  }
`;
const BackLink = styled.a`
overflow-x: hidden;
  display: flex;
  color: ${ghostWhiteLight}; 
  box-sizing: border-box;
  align-items: center;
  text-decoration: none;
  margin-bottom: 1em;
  &:hover {
    color: ${ghostWhite}; 
    font-weight: bold; 
  }
`;

const Title = styled.p`
overflow-x: hidden;
box-sizing: border-box;
  font-size: ${fontSize3};
  font-weight: bold;
  color: ${ghostWhite};
  margin: 0.5em 0;
  @media (max-width: 985px) {
    font-size: ${fontSize6};
  }
`;

const Subtitle = styled.span`
overflow-x: hidden;
  a {
    color: ${pear};
    font-weight: bold;
    text-decoration: none;
  }
`;

const Form = styled.form`
  color: ${ghostWhite};
  font-weight: bold;
  letter-spacing: 0.15em;
  margin-top: 2em;
  overflow-x: hidden;

  label {
    padding-left: 0.5em;
  }

  input {
    font-size: ${fontSize5};
    height: 50px;
    border-radius: 150px;
    border: none;
    width: 70%;
    padding-left: 15px;
    box-sizing: border-box;
    margin-bottom: 2em;
  }
`;
function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  /* ---- EDIT FOR REGISTER PURPOSES -----
  const router = useRouter();

  const validateForm = () => {
    if (!username || !password) {
      setError('Username and password are required');
      return false;
    }
    setError('');
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateForm()) return;

    const formDetails = new URLSearchParams();
    formDetails.append('username', username);
    formDetails.append('password', password);

    try {
      const response = await fetch('http://localhost:8000/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formDetails,
      });

      if (response.ok) {
        const data = await response.json();
        router.push('/');
      } else {
        const errorData = await response.json();
        setError(errorData.detail || 'Authentication failed!');
      }
    } catch (error) {
      setError('An error occurred. Please try again later.');
    }
  };
  */
  return (
    <Container>
      <LeftSection>
        <BackLink href="http://localhost:3000">
          <Image src={left_arrow} alt="Back arrow" width={40} />
          <span style={{ marginLeft: 15 }}>Vratite se nazad na početnu stranicu</span>
        </BackLink>
        <Title>Nemojte biti samo posmatrač</Title>
        <Subtitle>
          Kreirajte besplatan račun ili se <a href="http://localhost:3000" style={{textDecoration: 'underline'}}> prijavite na postojeći</a>
        </Subtitle>
        <Form autoComplete="off">
          <div>
            <label>email</label><br />
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="off"
            />
          </div>
          <div>
            <label>password</label><br />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="off"
            />
          </div>
          <Button type="submit" style={{ width: '70%' }}>submit</Button>
          {error && <div className="text-danger mt-2" style={{fontSize: fontSize4}}>{error}</div>}
        </Form>
      </LeftSection>
      <RightSection></RightSection>
    </Container>
  );
}

export default Register;