
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faHouse,
    faMagnifyingGlass,
    faMessage,
    faPuzzlePiece,
    faUser,
    faUserPlus
} from '@fortawesome/free-solid-svg-icons';
import './SideBar.css';
import Image from "next/image";

import logo from "@/images/sportify_logo2.png"
import Link from "next/link";
import {usePathname} from "next/navigation";

const SideBar = () => {
    const pathname = usePathname();

    return (
        <>
            <div className="sideBar">
                <Image src={logo} alt={"logo"} className={"logo"}/>
                <div>
                    {pathname === '/feed' ? <Link href={"/profiles"} passHref><FontAwesomeIcon icon={faUser} className="icon"/></Link> : pathname === '/profiles' ? <Link href={"/feed"} passHref><FontAwesomeIcon icon={faHouse} className="icon"/></Link> : null}
                    {pathname === '/feed' ? <p><Link href={"/profiles"} passHref>Profil</Link></p> : pathname === '/profiles' ? <p><Link href={"/feed"} passHref>Feed</Link></p> : null}
                </div>
                <div>
                    <Link href={'/'}><FontAwesomeIcon icon={faMagnifyingGlass} className="icon"/></Link>
                    <p><Link href={'/'}>Pretraži</Link></p>
                </div>
                <div>
                    <Link href={'/'}><FontAwesomeIcon icon={faMessage} className="icon"/></Link>
                    <p><Link href={'/'}>Poruke</Link></p>
                </div>
                <div>
                    <Link href={'/'}><FontAwesomeIcon icon={faPuzzlePiece} className="icon"/></Link>
                    <p><Link href={'/'}>Igre</Link></p>
                </div>
                <div>
                    <Link href={'/'}><FontAwesomeIcon icon={faUserPlus} className="icon"/></Link>
                    <p><Link href={'/'}>Dodaj ekipu</Link></p>
                </div>
            </div>
        </>
    );
}

export default SideBar;
