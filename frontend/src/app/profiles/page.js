// "use client";

import {Container, ContainerOld} from "@/components/Containers/ContainerStyled";
import SearchBar from "@/components/SearchBar/SearchBar";
import axios from "axios";
import {SearchBarContainer, SearchBarResult, SearchBarResultSplitter} from "@/components/SearchBar/SearchBarStyled";
import Error404 from "@/components/Errors/404";

export default async function Profiles(props) {

    const queryParams = props.searchParams;
    const stock_pic = '/profile_picture_cute_nejra.jpg';

    try {
        let res = {};
        if(queryParams.search !== '' && queryParams.search !== null && queryParams.search !== undefined) {
            res = await axios("http://127.0.0.1:8000/profiles/username/" + queryParams.search);
        } else {
            res = await axios("http://127.0.0.1:8000/profiles");
        }

        let profilesIgraciList = [];
        let profilesVlasniciList = [];

        for(let i = 0; i < res.data.svi_korisnici.length; i++) {
            const current = res.data.svi_korisnici[i];
            profilesIgraciList.push(
                <SearchBarResult key={i}>
                    <img src={current.picture_data ?? stock_pic} alt="User profile thumbnail picture"/>
                    <h3>
                        {current.ime_igraca + ((current.srednje_ime !== null && current.srednje_ime !== '') ? (' (' + current.srednje_ime + ') ') : ' ') + current.prezime_igraca}
                        {(current.verifikovan) ? (<i className="fas fa-check-circle"></i>) : ''}
                        <br />
                        <small>{current.korisnici.korisnicko_ime}</small>
                    </h3>
                    <a href={"/profiles/igraci/id/" + current.id_igraca}>
                        <i className="fas fa-chevron-right"></i>
                    </a>
                </SearchBarResult>
            )
        }

        for (let i = 0; i < res.data.svi_vlasnici.length; i++) {
            const current = res.data.svi_vlasnici[i];
            profilesVlasniciList.push(
                <SearchBarResult key={i + 10}>
                    <img src={current.picture_data ?? stock_pic} alt="User profile thumbnail picture"/>
                    <h3>
                        {current.ime_vlasnika + ((current.srednje_ime !== null && current.srednje_ime !== '') ? (' (' + current.srednje_ime + ') ') : ' ') + current.prezime_vlasnika}
                        <br/>
                        <small>{current.korisnici.korisnicko_ime}</small>
                    </h3>
                    <a href={"/profiles/vlasnici/id/" + current.id_vlasnika}>
                        <i className="fas fa-chevron-right"></i>
                    </a>
                </SearchBarResult>
            )
        }

        return (
            <ContainerOld>
                <SearchBarContainer>
                    <SearchBar value={queryParams.search}/>
                    <SearchBarResultSplitter>
                        <h2>Igraci</h2>
                    </SearchBarResultSplitter>
                    {profilesIgraciList}
                    <SearchBarResultSplitter>
                        <h2>Vlasnici</h2>
                    </SearchBarResultSplitter>
                    {profilesVlasniciList}
                </SearchBarContainer>
            </ContainerOld>
        );
    } catch (e) {
        return (
            <Error404 message={e.response.data.detail}/>
        );
    }
}
