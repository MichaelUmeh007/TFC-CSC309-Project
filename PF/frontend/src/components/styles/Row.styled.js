import styled from "styled-components";

// Flex Item for a Flexbox
export const StyledRow = styled.div`
    height: 20%;
    margin: 10px;

    a {
        display: inline-block;
        margin: 0 10px;
    }

    &.close-btn {
        position: absolute;
        top: 0px;
        right: 0px;
        margin: 0;
        padding: 0;
    }
`