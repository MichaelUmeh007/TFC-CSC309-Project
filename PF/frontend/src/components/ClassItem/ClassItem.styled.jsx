import styled from "styled-components";

export const StyledClassItem = styled.div`
    border-left: 5px solid DarkOrange;
    border-right: none;
    border-top: none;
    border-bottom: none;
    margin: 3% 5%;
    width: 100%;
    background-color: Gainsboro;
    & > * {
        margin: 3%;
    }
`