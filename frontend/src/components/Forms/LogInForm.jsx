"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';
import { fontSize4, ghostWhite, fontSize5 } from '@/styles/GlobalStyle';
import { LogInButton } from "@/components/Button/ButtonStyled";

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

const LogInForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
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

  return (
    <Form onSubmit={handleSubmit} autoComplete="off">
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
      <LogInButton type="submit" style={{ width: '70%' }}>log in</LogInButton>
      {error && <div className="text-danger mt-2" style={{fontSize: fontSize4}}>{error}</div>}
    </Form>
  );
};

export default LogInForm;
