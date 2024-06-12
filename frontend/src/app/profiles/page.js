"use client";

import {ContainerOld} from "@/components/Containers/ContainerStyled";
import SearchBar from "@/components/SearchBar/SearchBar";
import Error404 from "@/components/Errors/404";

export default function Profiles(props) {

    const searchUrl = "http://127.0.0.1:8000/profiles/username/";
    const defaultSearchUrl = "http://127.0.0.1:8000/profiles/";

    try {
        return (
            <ContainerOld>
                <SearchBar default_search_url={defaultSearchUrl} search_url={searchUrl} type="profiles"/>
            </ContainerOld>
        );
    } catch (e) {
        if(e.response !== undefined && e.response.status === 404) {
            return (
                <Error404 message={e.response.data.detail}/>
            );
        }
    }
}
