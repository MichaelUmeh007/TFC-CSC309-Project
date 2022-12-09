import styled from "styled-components";

export const StyledFormContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100%;
    background-color: ${props => props.inputColor || "black"};
`
