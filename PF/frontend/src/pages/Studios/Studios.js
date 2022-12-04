import React, { useState } from "react";
import { StyledStudios } from "../../components/styles/Studios.styled";
import StudioList from "./StudioList";

const Studios = (props) => {
    const [cardOpen, setCardOpen] = useState(false);

    const closeCard = () => {
        setCardOpen(false);
    }

    const openCard = () => {
        setCardOpen(true);
    }


    return (
        <StyledStudios>
            <h2>Studios</h2>

            <div className="split-screen">
                <StudioList className="list-column" />
                
                <div className="map-column">
                    <h2>Placeholder for Map</h2>
                </div>

            </div>

        </StyledStudios>
    );
}

export default Studios;