import React from "react";
import parsePhoneNumber from "libphonenumber-js";
import { StyledStudioItem } from "./StudioItem.styled";
import { StyledButton } from "../styles/Button.styled";

const StudioItem = (props) => {
    const viewDetailsHandler = () => {
        props.openStudioDetailsHandler(props.id);
    }
    return (
        <StyledStudioItem id={props.id}>
            <h3>{props.name}</h3>
            <p>{props.address}</p>
            <p>{parsePhoneNumber(props.phoneNumber).formatNational()}</p>
            <StyledButton onClick={viewDetailsHandler}>View Details</StyledButton>
        </StyledStudioItem>
    );
}

export default StudioItem;