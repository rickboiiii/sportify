"use client";

import "./Contact.css"
import Footer from "../../components/Footer/Footer";
import Navbar from "@/components/Navbar/Navbar";
import ContactForm from "@/components/ContactForm/ContactForm";

const Page = () => {
    return (
        <>
            <Navbar/>
            <section className={"contact"}>
                <div className={"title"}>
                    <h3>Imate pitanja? Feedback?</h3>
                    <h1>Kontaktirajte nas</h1>
                </div>
                <ContactForm/>
            </section>
            <Footer/>
        </>
    );
};

export default Page;