import styled from "styled-components";

export const StyledClassItem = styled.div`
font-family: 'Alexandria', sans-serif;
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

    button {
        color: white;
        padding: 1%;
        background-color: #454444;
        border: 1.5px solid #454444;
        border-radius: 3px;
        margin: 0% 5%;
        margin-bottom: 3%;
    }

    button:hover {
        background-color: #525151;
        border 1.5px solid #525151;
        cursor: pointer;
    }
`