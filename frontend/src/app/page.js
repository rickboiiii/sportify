"use client";
import React from "react";
import "./Home.css"
import Footer from "@/components/Footer/Footer";
import About from "@/components/About/About";
import JoinUs from "@/components/JoinUs/JoinUs";
import Quote from "@/components/Quote/Quote";
import Services from "@/components/Services/Services";
import Navbar from "@/components/Navbar/Navbar";

export default function Home() {
  return (
        <>
            <Navbar/>
            <div className={"banner"}>
                <h1 className={"message"}><h2 className={"name"}> SPORTIFY </h2> - VAŠA RUTA DO SPORTSKE ZABAVE </h1>
            </div>
            <About/>
            <JoinUs/>
            <Services/>
            <Quote/>
            <Footer/>
        </>
  );
}
