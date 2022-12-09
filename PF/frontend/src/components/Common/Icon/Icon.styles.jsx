import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

export const StyledIcon = styled(FontAwesomeIcon)`
    margin-left: 0.25rem;
    margin-right: 0.25rem;
    color: ${props => props.valid? "limegreen": "blue"};
    display: ${props => props.hide? "none": "inline"};
    
`