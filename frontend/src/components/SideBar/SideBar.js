
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
import {usePathname, useParams} from "next/navigation";
import {lapisLazuliLight} from "@/styles/GlobalStyle";

const SideBar = () => {
    const pathname = usePathname();
    const params = useParams();

    const isFeedRoute = /^\/feed/.test(pathname);
    const isProfilesRoute = /^\/profiles/.test(pathname);

    return (
        <>
            <div className="sideBar">
                <Image src={logo} alt={"logo"} className={"logo"}/>
                <div>
                    {isFeedRoute ? (
                        <>
                            <Link href={"/profiles/vlasnici/username/" + params.username} passHref>
                                <FontAwesomeIcon icon={faUser} className="icon"/>
                            </Link>
                            <p>Profil</p>
                            <p><i className="fas fa-chevron-left" style={{fontSize: "1.5rem", color: lapisLazuliLight}}></i></p>
                            <p style={{textAlign: "center"}}>
                                <Link href={"/profiles/vlasnici/username/" + params.username} passHref>Vlasnik</Link>
                                <br/>
                                <Link href={"/profiles/igraci/username/" + params.username} passHref>Igrac</Link>
                            </p>
                        </>
                    ) : isProfilesRoute ? (
                        <>
                        <Link href={`/feed/${params.username}`} passHref>
                                <FontAwesomeIcon icon={faHouse} className="icon"/>
                            </Link>
                            <p>
                                <Link href={`/feed/${params.username}`} passHref>Feed</Link>
                            </p>
                        </>
                    ) : null}
                </div>
                {/*<div>*/}
                {/*    <Link href={'/'}><FontAwesomeIcon icon={faMagnifyingGlass} className="icon"/></Link>*/}
                {/*    <p><Link href={'/'}>Pretraži</Link></p>*/}
                {/*</div>*/}
                <div>
                    <Link href={'/chat'}><FontAwesomeIcon icon={faMessage} className="icon"/></Link>
                    <p><Link href={'/chat'}>Poruke</Link></p>
                </div>
                <div>
                    <Link href={'/xo'}><FontAwesomeIcon icon={faPuzzlePiece} className="icon"/></Link>
                    <p><Link href={'/xo'}>Igre</Link></p>
                </div>
                <div>
                    <Link href={'/kreiraj_ekipu'}><FontAwesomeIcon icon={faUserPlus} className="icon"/></Link>
                    <p><Link href={'/kreiraj_ekipu'}>Dodaj ekipu</Link></p>
                </div>
            </div>
        </>
    );
}

export default SideBar;
