import React, { useState, useEffect } from "react";
import QuerySelect from "./QuerySelect/QuerySelect";
import SearchBar from "./SearchBar/SearchBar";

import { StyledSearchFilter } from "./SearchFilter.styled";

const SearchFilter = (props) => {
    // TODO: Maybe add a blank option for no query (or just handle that by checking if search bar is empty)
    const options= [
        { label: 'Studio', value: 'studio_name' },
        { label: 'Amenities', value: 'amenity' },
        { label: 'Classes', value: 'class_name' },
        { label: 'Coach', value: 'coach' },
    ];

    // Handle changes in the value of the search bar
    const searchValueChangeHandler = (e) => {
        e.preventDefault();
        // console.log(e.target.value);
        props.searchValueHandler(e.target.value);
    }

    return (
        <StyledSearchFilter>
            <QuerySelect options={options} defaultValue={options[0]} querySelectHandler={props.querySelectHandler} />
            <SearchBar onChangeHandler={searchValueChangeHandler} />
        </StyledSearchFilter>
    );
}

export default SearchFilter;