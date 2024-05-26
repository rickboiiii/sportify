'use client';
import React, {useState} from 'react';

import {redirect} from "next/navigation";
import {POST} from "@/app/api/submit/route";

const ContactForm = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')

    const [statusMessage, setStatusMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData(event.target);

        try {
          let response = await fetch('/api/submit', {
            method: 'POST',
            body: formData,
          });
          if (response.ok) {
              response = await response.json()
              setName('')
              setEmail('')
              setMessage('')
              setStatusMessage('Email je uspješno poslan. Hvala Vam na poruci :)');
          }
          else {
              setStatusMessage('Poruka nije poslana.');
          }

        } catch (error) {
          console.error('Desila se greška prilikom slanja!', error);
          setStatusMessage('Desila se greška.');
        }
    };

    return (
        <div className={"message-box"}>
            <form onSubmit={handleSubmit} method={POST}>
                <input
                    type="text"
                    id="full-name"
                    name={"name"}
                    value = {name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={"ime i prezime"}
                    autoComplete={"off"}
                /><br/><br/>

                <input
                    type="email"
                    id="email"
                    name={"email"}
                    value = {email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={"email"}
                    autoComplete={"off"}
                /><br/><br/>

                <textarea
                    name={"message"}
                    value = {message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder={"unesite Vašu poruku ovdje"}
                ></textarea><br/><br/>

                <input type="submit" value="pošalji"/>
            </form>
            <br/><br/>
            {statusMessage && <p>{statusMessage}</p>}
        </div>
    )
}

export default ContactForm;