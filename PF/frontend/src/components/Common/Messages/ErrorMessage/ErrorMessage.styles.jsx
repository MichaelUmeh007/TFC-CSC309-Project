import styled from "styled-components";

export const StyledErrorMessage = styled.p`

    position: ${props => props.offscreen ? "absolute" : "static"};
    left: ${props => props.offscreen ? "-9999px" : "0px"};
    background-color: lightpink;
    color: firebrick;
    font-weight: bold;
    padding: 0.5rem;
    margin-bottom: 0.5rem;
    border-radius: 0.5rem;
`