import styled from "styled-components";

export const StyledFormContainer = styled.div`
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    background-color: ${props => props.inputColor || "black"};
`
