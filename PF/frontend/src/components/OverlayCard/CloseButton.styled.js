import styled from "styled-components";
//     line-height: 12px;
export const StyledCloseButton = styled.button`
    border: none;
    background-color: white;
    float: right;
    position: absolute;
    top: 0;
    right: 0;

    &:hover {
        border-radius: 75%;
        background-color: #f2f0f0;
        cursor: pointer;
        padding: 11px 0px;
    }
`