import styled from "styled-components";

export const StyledSuccessMessage = styled.p`

    position: ${props => props.offscreen ? "absolute" : "relative"};
    left: ${props => props.offscreen ? "-9999px" : "0px"};
    background-color: lightblue;
    color: darkgreen;
    font-weight: bold;
    padding: 0.5rem;
    margin-bottom: 0.5rem;
    border-radius: 0.5rem;
`