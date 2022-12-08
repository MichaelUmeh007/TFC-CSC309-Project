import React from "react";
import { StyledStudioItem } from "./StudioItem.styled";

const StudioItem = (props) => {
    const viewDetailsHandler = () => {
        props.openStudioDetailsHandler(props.key);
    }
    return (
        <StyledStudioItem id={props.key}>
            <h3>{props.name}</h3>
            <p>{props.address}</p>
            <p>{props.phoneNumber}</p>
            <button onClick={viewDetailsHandler}>View Details</button>
        </StyledStudioItem>
    );
}

export default StudioItem;