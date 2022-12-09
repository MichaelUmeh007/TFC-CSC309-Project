import React from "react";
import { StyledSearchBar } from "./SearchBar.styled";

// onChange here could potentially be onKeyUp instead
const SearchBar = (props) => {
    const submitHandler = (e) => {
        e.preventDefault();
    }

    return (
        <StyledSearchBar onSubmit={submitHandler} noValidate>
            <input
                type="text"
                id="header-search"
                placeholder="Search"
                name="search-bar" 
                onChange={props.onChangeHandler}
            />
            <button className="search-button" type="submit">Search</button>
        </StyledSearchBar>
    );
    
}

export default SearchBar;