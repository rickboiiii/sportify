"use client";
import React from "react";

import "@/components/About/About.css"
import slika from "@/images/s1.jpg"
import Image from "next/image";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import {ghostWhite} from "@/styles/GlobalStyle";
const Page = () => {
    return (
        <section style={{background: ghostWhite}}>
            <Navbar/>
            <div className={"about-div"}>
                <div className={"about-img"}>
                    <Image src={slika} alt={"slika tenisera"}/>
                </div>
                <div className={"about-text"}>
                    <h1> | </h1> <h2> O NAMA</h2>
                    <p>Dobrodošli na <b style={{ color: 'var(--lapis-lazuli)'}}>SPORTIFY</b>, vašu ultimativnu platformu za rezervaciju sportskih termina i povezivanje sa ljudima koji dijele vašu strast prema sportu! Naša aplikacija omogućava igračima da lako pronađu termine za omiljene sportove, dok poduzetnici mogu jednostavno iznajmljivati svoje sportske terene. Kreirajte svoj profil i dopustite nam da vas smjestimo u kategorije prema vašim vještinama i preferencijama, kako biste uvijek igrali s igračima sličnog nivoa. Naša ocjenjivačka funkcija osigurava transparentnost i povjerenje među korisnicima, omogućujući igračima i poduzetnicima da ocijene jedni druge nakon svakog termina.<br/><br/>
                        Pored rezervacija, Sportify vam nudi i bogate društvene mogućnosti: komunicirajte putem chata, dijelite postove, slike i videozapise na feed-u, te koristite hashtagove <b>#izgubljeno</b> i <b>#nadjeno</b> za izgubljene ili pronađene stvari. Organizirajte ili učestvujte u turnirima i pratite rezultate uživo kroz naš integrirani sistem rangiranja. <br/><br/> <i>Sa Sportify-jem, sport nikada nije bio pristupačniji i zabavniji! Pridružite nam se i postanite dio naše rastuće zajednice.</i></p>
                </div>
            </div>
            <Footer/>
        </section>
    );
};

export default Page;