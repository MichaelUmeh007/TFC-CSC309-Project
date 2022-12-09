import React from "react";
import parsePhoneNumber from "libphonenumber-js";
import { StyledCard } from "./OverlayCard.styled";
import { StyledRow } from "../styles/Row.styled";
import { StyledLink } from "../styles/Link.styled";
import { StyledButton } from "../styles/Button.styled";
import { StyledCloseButton } from "./CloseButton.styled";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faPhone,
    faLocationDot,
    faMailBulk,
    faCircleInfo,
    faXmark,
  } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

// Figure out how to display multiple images (maybe in some )
// Figure out how to display "X" button to close it
// FIgure
const OverlayCard = (props) => {
    // Handling redirection to class schedule page when user views details for a studio
    const navigate = useNavigate();
    const viewDetailsHandler = () => {
        navigate(`/studios/${props.id}/classes`);
    };

    return (
        <StyledCard>
            <StyledCloseButton className="close-btn" onClick={props.cardCloseHandler}>
                <FontAwesomeIcon icon={faXmark} />
            </StyledCloseButton>

            <div className="flex-card">
                <StyledRow>
                    <h2>{props.name}</h2>
                </StyledRow>

                <StyledRow> 
                    <img src={props.imageUrl} 
                        alt="man walking down street" 
                        width="100" 
                        height="100"/>
                </StyledRow>

                <StyledRow>
                    <FontAwesomeIcon icon={faPhone} fixedWidth />
                    <StyledLink>{parsePhoneNumber(props.phoneNumber).formatNational()}</StyledLink>
                </StyledRow>

                <StyledRow>
                    <FontAwesomeIcon icon={faLocationDot} fixedWidth />
                    <StyledLink className="directions-link" href={props.directions} target="_blank">{props.address} (Directions)</StyledLink>
                </StyledRow>

                <StyledRow>
                    <FontAwesomeIcon icon={faMailBulk} fixedWidth />
                    <StyledLink href="">{props.postalCode}</StyledLink>
                </StyledRow>
                
                {props.amenities.length > 0 && 
                <StyledRow>
                    <FontAwesomeIcon icon={faCircleInfo} fixedWidth />
                    
                    <StyledLink>Amenities</StyledLink>
                    <ul>
                        {props.amenities.map(amenity => 
                            <li key={amenity.id}>{amenity.type}</li>)}
                    </ul>
                </StyledRow>}
            
                <StyledRow>
                    <StyledButton onClick={viewDetailsHandler}>View Class Schedule</StyledButton>
                </StyledRow>
            </div>
        </StyledCard>        
    )
}

export default OverlayCard;