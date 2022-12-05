import styled from "styled-components";

export const StyledInstructionMessage = styled.p`

    position: ${props => props.offscreen ? "absolute" : "relative"};
    left: ${props => props.offscreen ? "-9999px" : "0px"};
    font-size: 0.75rem;
    border-radius: 0.5rem;
    background: #000;
    color: #fff;
    padding: 0.25rem;
    bottom: -10px;
`