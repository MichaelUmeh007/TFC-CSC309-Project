import styled from "styled-components";
//     line-height: 12px;
export const StyledCloseButton = styled.button`
    border: none;
    background-color: white;
    float: right;
    position: absolute;
    top: 0;
    right: 0;
    padding: 2%;
    margin: 2%;

    &:hover {
        border-radius: 50%;
        background-color: #f2f0f0;
        cursor: pointer;
        padding: 2%;
    }
`