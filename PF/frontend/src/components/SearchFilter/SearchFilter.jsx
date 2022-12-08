import React, { useState, useEffect } from "react";
import QuerySelect from "./QuerySelect/QuerySelect";
import { StyledSearchBar } from "./SearchBar/SearchBar.styled";

import { StyledSearchFilter } from "./SearchFilter.styled";

const SearchFilter = (props) => {
    // TODO: In Studios.jsx, create a state for the currently selected query

    // TODO: Maybe add a blank option for no query (or just handle that by checking if search bar is empty)
    const options= [
        { label: 'Studio', value: 'studio_name' },
        { label: 'Amenities', value: 'amenity' },
        { label: 'Classes', value: 'class_name' },
        { label: 'Coach', value: 'coach' },
    ];

    return (
        <StyledSearchFilter>
            <QuerySelect options={options} />
            <StyledSearchBar />
        </StyledSearchFilter>
    );
}

export default SearchFilter;