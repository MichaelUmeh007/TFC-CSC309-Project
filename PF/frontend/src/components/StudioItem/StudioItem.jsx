import React from "react";
import { StyledStudioItem } from "./StudioItem.styled";

const StudioItem = (props) => {
    return (
        <StyledStudioItem>
            <h3>{props.name}</h3>
            <p>{props.address}</p>
            <p>{props.phoneNumber}</p>
            <button onClick={props.openStudioDetailsHandler}>View Details</button>
        </StyledStudioItem>
    );
}

export default StudioItem;