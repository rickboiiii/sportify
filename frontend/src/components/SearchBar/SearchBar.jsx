import {SearchBarStyled} from "@/components/SearchBar/SearchBarStyled";

export default function SearchBar({value = ''}) {
    return(
        <SearchBarStyled>
            <form action="" method="GET">
                <input id="searchBar" name="search" placeholder="Search..." defaultValue={value}/>
                <button type="submit">
                    <i className="fas fa-search"></i>
                </button>
            </form>
        </SearchBarStyled>
    );
}