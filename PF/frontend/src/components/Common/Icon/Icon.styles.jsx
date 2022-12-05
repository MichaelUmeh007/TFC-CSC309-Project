import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

export const StyledIcon = styled(FontAwesomeIcon)`
    margin-right: ${props => props.marginright || 0};
    display: ${props => props.hide? "none": "inline"};
    color: ${props => props.valid? "limegreen": black}
    margin-left: 0.25em;
`