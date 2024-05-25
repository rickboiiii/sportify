"use client";
import instagramIcon from '@/images/instagram.svg';
import facebookIcon from '@/images/facebook.svg';
import linkedinIcon from '@/images/linkedin.svg';
import Image from 'next/image'
import "./Footer.css"

const Footer = () => {
    return (
        <section className={"footer"}>
            <div className={"socials"}>
                <a href="https://www.instagram.com/spotify/">
                    <Image src={instagramIcon} alt="Instagram"/>
                </a>
                <a href="https://www.facebook.com/Spotify">
                    <Image src={facebookIcon} alt="Facebook"/>
                </a>
                <a href="https://www.linkedin.com/company/spotify/">
                    <Image src={linkedinIcon} alt="LinkedIn"/>
                </a>
            </div>
            <div className={"links"}>
                <a href={"https://en.wikipedia.org/wiki/Terms_of_service"}>Terms & Conditions</a>
                <a href={"/"}>Privacy policy</a>
            </div>
        </section>
    );
};

export default Footer;