import styled from "styled-components";

// Figure out how to make a row for each row of data in the flex box
// Figure out how to handle flex-items
// Figure out how to round the corners of the shadow if possible
export const StyledCard = styled.div`
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    align-items: left;
    background-color: white;
    padding: 40px;
    border: 2px solid black
    border-radius: 10px;
    -webkit-box-shadow: 2px 2px 15px  rgba(0, 0, 0, 0.233);
    box-shadow: 2px 2px 15px  rgba(0, 0, 0, 0.233);
    width: 80%;

    button {
        float: left;
        margin: 16px 16px;
    }

    &.close-row {
        width: 100%;
        height: 10px;
    }
`
