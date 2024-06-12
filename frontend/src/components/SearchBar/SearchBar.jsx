import {
    SearchBarContainer,
    SearchBarResult,
    SearchBarResultContainer, SearchBarResultSplitter,
    SearchBarStyled
} from "@/components/SearchBar/SearchBarStyled";
import {useEffect, useState} from "react";
import axios from "axios";

function customSearchResultsProfiles(searchResults, setIgraciList, setVlasniciList) {

    const stock_pic = '/profile_picture_cute_nejra.jpg';
    let profilesIgraciList = [];
    let profilesVlasniciList = [];

    for(let i = 0; i < searchResults.svi_korisnici.length; i++) {
        const current = searchResults.svi_korisnici[i];
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

    setIgraciList(profilesIgraciList);

    for (let i = 0; i < searchResults.svi_vlasnici.length; i++) {
        const current = searchResults.svi_vlasnici[i];
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

    setVlasniciList(profilesVlasniciList);
}

function basicSearchResults(searchResults, setBasicList) {

    let basic_list = [];

    for (let i = 0; i < searchResults.length; i++) {
        const current = searchResults[i];
        basic_list.push(
           <SearchBarResult>
                <h3>
                    {current.main_info}
                    <br/>
                    <small>{current.small_info}</small>
                </h3>
                <a href={current.goto_url}>
                    <i className="fas fa-chevron-right"></i>
                </a>
           </SearchBarResult>
        );
    }

    setBasicList(basic_list);
}

export default function SearchBar({default_search_url, search_url, type = 'generic'}) {

    const [igraciList, setIgraciList] = useState([]);
    const [vlasniciList, setVlasniciList] = useState([]);

    const [basicList, setBasicList] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const [resultsContainer, setResultsContainer] = useState(<></>);

    const onFocusLoss = () => {
        document.getElementById("searchBarResults").style.display = "none";
    }

    const onChange = () => {
        const searchValue = document.getElementById("searchBar").value;

        if(searchValue !== '') {
            axios(search_url + searchValue).then((res) => {
                setSearchResults(res.data);
                document.getElementById("searchBarResults").style.display = "flex";
            });
        }

        if(searchValue === "@everybody") {
            axios(default_search_url).then((res) => {
                setSearchResults(res.data);
                document.getElementById("searchBarResults").style.display = "flex";
            });
        }
    }

    useEffect(() => {
        if(searchResults.length !== 0) {
            if(type === 'profiles') {
                // Custom search for profiles
                customSearchResultsProfiles(searchResults, setIgraciList, setVlasniciList);
            } else {
                /*
                    Works if data is received as an array where every entry is JSON this format:
                    {
                        main_info: "Main information about search result",
                        small_info: "Quick / small description",
                        goto_url: "/url/for/navigating/to/search/result"
                    }
                 */
                basicSearchResults(searchResults, setBasicList);
            }
        }
    }, [searchResults]);

    if(type === "profiles") {
        useEffect(() => {
            setResultsContainer(
                <SearchBarContainer style={{flex: 1}}>
                    <SearchBarResultSplitter>
                        <h2>Igraci</h2>
                    </SearchBarResultSplitter>
                    {(igraciList.length !== 0) ? igraciList : <p>{"No data found "}<i className="fas fa-question"></i></p>} <br/>
                    <SearchBarResultSplitter>
                        <h2>Vlasnici</h2>
                    </SearchBarResultSplitter>
                    {(vlasniciList.length !== 0) ? vlasniciList  : <p>{"No data found "}<i className="fas fa-question"></i></p>}
                </SearchBarContainer>
            );
        }, [igraciList, vlasniciList])
    } else {
        useEffect(() => {
            setResultsContainer(
                <SearchBarContainer>
                    {basicList}
                </SearchBarContainer>
            );
        }, [basicList]);
    }

    return (
        <SearchBarContainer onPointerLeave={onFocusLoss}>
            <SearchBarContainer>
                <SearchBarStyled>
                    <input id="searchBar" name="search" placeholder="Search..."
                           onChange={onChange}/>
                    <button onClick={onChange}>
                        <i className="fas fa-search"></i>
                    </button>
                </SearchBarStyled>
                <SearchBarResultContainer id="searchBarResults">
                    {resultsContainer}
                </SearchBarResultContainer>
            </SearchBarContainer>
        </SearchBarContainer>
    );
}