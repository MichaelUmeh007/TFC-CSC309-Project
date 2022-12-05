import React from "react";
import { StyledMapDisplay } from "./MapDisplay.styled";
import OverlayCard from "../../components/OverlayCard/OverlayCard";

const MapDisplay = (props) => {
    return (
        <StyledMapDisplay>
            {props.cardOpen && 
            <OverlayCard name="College and Bay Studio"
                         imageUrl="https://upload.wikimedia.org/wikipedia/commons/7/7c/Fit_young_man_doing_deadlift_exercise_in_gym.jpg"
                         phoneNumber="416-123-4567"
                         address="100 Queen St. W"
                         directions="https://www.google.com/maps/dir/?api=1&origin=100%20Queen%20St.%20W&destination=380%20The%20East%20Mall%2C%20Etobicoke%2C%20ON&travelmode=driving"
                         postalCode="M2J 3K9"
                         amenities={[{ id: 1, type: "Massage Room"}, { id: 2, type: "Washrooms"}]}
                         cardCloseHandler={props.closeCard}
            />}
        </StyledMapDisplay>

    );
}

export default MapDisplay;