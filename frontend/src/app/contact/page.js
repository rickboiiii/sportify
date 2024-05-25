"use client";

import "./Contact.css"
import Footer from "../../components/Footer/Footer";
import Navbar from "@/components/Navbar/Navbar";

const Page = () => {
    return (
        <>
            <Navbar/>
            <section className={"contact"}>
                <div className={"title"}>
                    <h3>Imate pitanja? Feedback?</h3>
                    <h1>Kontaktirajte nas</h1>
                </div>
                <div className={"message-box"}>
                    <form action="/action_page.php">
                        <label htmlFor="full-name"></label>
                        <input type="text" id="full-name" name="full-name" placeholder={"ime i prezime"} autoComplete={"off"}/><br/><br/>
                        <label htmlFor="email"></label>
                        <input type="email" id="email" name="email" placeholder={"email"} autoComplete={"off"}/><br/><br/>
                        <textarea placeholder={"unesite Vašu poruku ovdje"}></textarea><br/><br/>
                        <input type="submit" value="pošalji"/>
                    </form>
                </div>
            </section>
            <Footer/>
        </>
    );
};

export default Page;