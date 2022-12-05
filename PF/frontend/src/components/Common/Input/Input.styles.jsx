import styled from "styled-components";

export const StyledInput = styled.input`
    @font-face {
        font-family: 'Alexandria', 'Roboto';
        src: url('https://fonts.googleapis.com/css2?family=Alexandria:wght@700&display=swap');
    }
    font-size: 22px;
    padding: 0.25rem;
    border-radius: 0.5rem;
    border: none;
    margin: ${props => props.margin || "default"};
`