"use client";

import { useState } from 'react';
import axios from 'axios';
import { ContainerSearch } from '../Containers/ContainerStyled';
import {SearchBarStyled2, SearchBarResult2} from "@/components/SearchBar/SearchBarStyled";

const Search = ({ onProfileClick, value = '' }) => {
    const [searchQuery, setSearchQuery] = useState(value);
    const [searchResults, setSearchResults] = useState({ svi_korisnici: [], svi_vlasnici: [] });
    const stock_pic = '/blank_profile_picture.png';
    const handleSearch = async () => {
        if (searchQuery.trim() === '') {
            setSearchResults([]);
            return;
        }
        try {
            const response = await axios.get(`http://127.0.0.1:8000/users/username/${searchQuery}`);
            const sviKorisnici = response.data.svi_korisnici || [];
            const sviVlasnici = response.data.svi_vlasnici || [];
            setSearchResults({ svi_korisnici: sviKorisnici, svi_vlasnici: sviVlasnici });
       
            console.log('Search results:', response.data.svi_korisnici.concat(response.data.svi_vlasnici));
        } catch (error) {
            console.error('Error fetching search results:', error);
            setSearchResults([]);
        }
    };


    const profilesIgraciList = searchResults.svi_korisnici.map((current, index) => (
        <SearchBarResult2 key={index} onClick={() => handleClickProfile(current)}>
            <img src={stock_pic} alt="User profile thumbnail picture" />
            <h3>
                {current.ime_igraca + ((current.srednje_ime !== null && current.srednje_ime !== '') ? (' (' + current.srednje_ime + ') ') : ' ') + current.prezime_igraca}
                
                <br />
                <small>{current.korisnici.korisnicko_ime}</small>
            </h3>
            <i className="fas fa-chevron-right"></i>

        </SearchBarResult2>
    ));

    const handleClickProfile = (profile) => {
        onProfileClick(profile);
    };
    const profilesVlasniciList = searchResults.svi_vlasnici.map((current, index) => (
        <SearchBarResult2 key={index + 10} onClick={() => handleClickProfile(current)}>
            <img src={stock_pic} alt="User profile thumbnail picture" />
            <h3>
                {current.ime_vlasnika + ((current.srednje_ime !== null && current.srednje_ime !== '') ? (' (' + current.srednje_ime + ') ') : ' ') + current.prezime_vlasnika}
                <br />
                <small>{current.korisnici.korisnicko_ime}</small>
            </h3>

                <i className="fas fa-chevron-right"></i>

        </SearchBarResult2>
    ));

    return (
        <ContainerSearch>
            <SearchBarStyled2>
                <input
                    id="searchBar"
                    name="search"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button type="button" onClick={handleSearch}>
                    <i className="fas fa-search"></i>
                </button>
            </SearchBarStyled2>
            {profilesIgraciList.length > 0 && (
                <>
                    {profilesIgraciList}
                </>
            )}
            {profilesVlasniciList.length > 0 && (
                <>
                    {profilesVlasniciList}
                </>
            )}
        </ContainerSearch>
    );
};

export default Search;
