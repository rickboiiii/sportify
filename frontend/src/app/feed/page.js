"use client";

import {useEffect, useState} from "react";

export default function RedirectFeed() {

    const [username, setUsername] = useState("");

    useEffect(() => {
        const storedToken = localStorage.getItem('token');

        if (storedToken) {
            const parsedToken = JSON.parse(storedToken);
            setUsername(JSON.parse(atob(parsedToken.access_token.split('.')[1])).sub);
        }
    }, [username]);

    useEffect(() => {
        window.location.href = "/feed/" + username;
    }, [username]);
}