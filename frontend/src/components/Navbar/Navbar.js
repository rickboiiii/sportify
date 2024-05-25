/*RESURSI: https://www.geeksforgeeks.org/create-a-responsive-navbar-using-reactjs/*/
/*         https://www.w3schools.com/howto/howto_js_responsive_navbar_dropdown.asp*/
"use client";

import React from "react";
import "./Navbar.css";
import {usePathname} from 'next/navigation';
import styled from 'styled-components';
import Link from 'next/link';
import logo from '../../images/sportify_logo2.png';
import Image from "next/image";

const Navbar = () => {
    const currentPath = usePathname();

    console.log(currentPath)

    return (
        <div className="topnav" id="myTopnav">
            <Image src={logo} alt="logo" className="logo" />
            <NavLink href={"/"} passHref>
                POČETNA
            </NavLink>
            {currentPath !== '/about' && (
                <NavLink href={"/about"} passHref>
                    O NAMA
                </NavLink>
            )}
            {currentPath !== '/contact' && (
                <NavLink href={"/contact"} passHref>
                    KONTAKT
                </NavLink>
            )}

            {(currentPath !== '/sign-up' && currentPath !== '/log-in') && (
                <>
                    <NavLinkBtn href={"/sign-up"} passHref>
                        SIGN UP
                    </NavLinkBtn>
                    <NavLinkBtn href={"/log-in"} passHref>
                        LOG IN
                    </NavLinkBtn>
                </>
            )}
            {/* eslint-disable-next-line no-script-url */}
            <a href="javascript:void(0);" className="icon" onClick={myFunction}>
                &#9776;
            </a>
        </div>
    );
};

export const NavLink = styled(Link)`
    display: flex;
    align-items: center;
    text-decoration: none;
    padding: 0 1rem;
    height: 100%;
    cursor: pointer;
    &.active {
        color: var(--pear);
    }
`;

export const NavLinkBtn = styled(Link)`
    display: flex;
    align-items: center;
    text-decoration: none;
    margin: 1rem;
    height: 1.5rem;
    cursor: pointer;
    
    border: 2px solid var(--pear);
    &.active {
        color: var(--pear);
    }
    @media screen and (max-width: 750px) {
        border: none;
        margin: 0;
        padding: 0;
        height: 100%;
    }
`;

const myFunction = () => {
    const topnav = document.getElementById("myTopnav");
    if (topnav.className === "topnav") {
        topnav.className += " responsive";
    } else {
        topnav.className = "topnav";
    }
};

export default Navbar;
