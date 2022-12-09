import styled from "styled-components";

export const StyledSearchBar = styled.form`
    width: 85%;
    align-self: center;
    margin: 0% auto;

    input {
        width: 85%;
        height: 30px;
        border-radius: 5px;
    }

    button.search-button {
        margin: 1%;
        height: 40px;
        background-color: black;
        border: 2px solid black;
        border-radius: 10px;
        color: white;
        
    }

    button.search-button:hover {
        cursor: pointer;
        background-color: #313332;
        border: 2px solid #313332;
    }
`;