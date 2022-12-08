import styled from "styled-components";

export const StyledButton = styled.button`
    background-color: black;
    border: 1px solid black;
    border-radius: 10px;
    color: white;
    padding: 3% 5%;
    text-align: center;
    font-weight: bold;
    text-decoration: none;
    margin: 5%;
    cursor: pointer;

    &:hover {
        background-color: #313332;
        color: white;
        border: 1px solid black;
    }
`