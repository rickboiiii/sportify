"use client";
import React from "react";
import "./Home.css"
import Footer from "@/components/Footer/Footer";
import About from "@/components/About/About";
import JoinUs from "@/components/JoinUs/JoinUs";
import Quote from "@/components/Quote/Quote";
import Services from "@/components/Services/Services";
import Navbar from "@/components/Navbar/Navbar";
import {ghostWhite} from "@/styles/GlobalStyle";

export default function Home() {
  return (
        <section style={{background: ghostWhite}}>
            <Navbar/>
            <div className={"banner"}>
                <h1 className={"message"}><span className={"name"}> SPORTIFY </span> - VAŠA RUTA DO SPORTSKE ZABAVE </h1>
            </div>
            <About/>
            <JoinUs/>
            <Services/>
            <Quote/>
            <Footer/>
        </section>
  );
}
