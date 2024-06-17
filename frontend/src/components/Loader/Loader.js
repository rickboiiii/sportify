// RESURSI: https://www.youtube.com/watch?v=dk-38jYcVRU
"use client";
import "./Loader.css";
import {useEffect} from "react";


const Loader = () => {
    useEffect(() => {
        const loader = document.getElementById("pre-loader");

        const hideLoader = () => {
            setTimeout(() => {
                if (loader) {
                    loader.style.display = "none";
                }
            }, 1500);
        };

        hideLoader();
    }, []);

    return (
        <div id="pre-loader"></div>
    );
};

export default Loader;
