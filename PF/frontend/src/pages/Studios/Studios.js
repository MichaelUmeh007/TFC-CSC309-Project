import React, { useState } from "react";
import MapDisplay from "../../components/MapDisplay/MapDisplay";
import { StyledStudios } from "../../components/styles/Studios.styled";
import StudioList from "./StudioList";

const Studios = (props) => {
    // State to keep track of whether a Studio Details Card is open on the page or not
    const [cardOpen, setCardOpen] = useState(false);
    // Handler for the onClick event of the close button for a studio's details card (in MapDisplay)
    const closeCard = () => {
        setCardOpen(false);
    }
    // Handler for the onClick event of a studio's "view details" button in StudioList
    const openCard = () => {
        setCardOpen(true);
    }


    return (
        <StyledStudios>
            <h2>Studios</h2>

            <div className="split-screen">
                <StudioList className="list-column" openCard={openCard} />
                <MapDisplay className="map-column" cardOpen={cardOpen} closeCard={closeCard} />
            </div>

        </StyledStudios>
    );
}

export default Studios;