import styled from "styled-components";

export const StyledButton = styled.button`
    background-color: black;
    border: none;
    border-radius: 10px;
    color: white;
    padding: 15px 30px;
    text-align: center;
    font-weight: bold;
    text-decoration: none;
    margin: 4px 4px;
    cursor: pointer;

    &:hover {
        background-color: white;
        color: black;
        border: 1px solid black;
    }
`