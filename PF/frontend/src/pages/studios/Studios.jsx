
import React, { useState } from "react";
import MapDisplay from "../../components/MapDisplay/MapDisplay";
import { StyledStudios } from "./Studios.styled";
import StudioList from "../../components/StudioList/StudioList";
import SearchFilter from "../../components/SearchFilter/SearchFilter";

const Studios = (props) => {
    // State to keep track of whether a Studio Details Card is open on the page or not
    const [cardOpen, setCardOpen] = useState(false);
    const [openStudio, setOpenStudio] = useState(1);
    // Handler for the onClick event of the close button for a studio's details card (in MapDisplay)
    const closeCard = () => {
        setCardOpen(false);
    }
    // Handler for the onClick event of a studio's "view details" button in StudioList
    const openCard = (studioId) => {
        setCardOpen(true);
        console.log("Card Open value: " + cardOpen)
        setOpenStudio(studioId);
        console.log("Studio Id value: " + studioId);
    }

    // State to keep track of the query the user is making against the list of studios if applicable
    const [queryType, setQueryType] = useState(null);
    // Set the type of query that the user is making 
    const setQueryTypeHandler = (queryObj) => {
        setQueryType(queryObj);
    };

    const [searchValue, setSearchValue] = useState("");
    // Set the value of the current search made by the user (in the search bar)
    const setSearchValueHandler = (value) => {
        setSearchValue(value);
    }

    return (
        <StyledStudios className="studios">
            <h2 id="studios-header">Studios</h2>
            <SearchFilter querySelectHandler={setQueryTypeHandler} searchValueHandler={setSearchValueHandler} />
            <div className="split-screen">
                <StudioList openCard={openCard} searchQuery={queryType} searchValue={searchValue} />
                <MapDisplay cardOpen={cardOpen} closeCard={closeCard} studioId={openStudio}/>
            </div>
        </StyledStudios>
    );
}
export default Studios;
