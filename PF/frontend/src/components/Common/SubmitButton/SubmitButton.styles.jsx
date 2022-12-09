import styled from "styled-components";

export const StyledSubmitButton = styled.button`
    font-size: 22px;
    font-weight: 900;
    padding: 0.25rem;
    border-radius: 0.5rem;
    border: none;
    background-color: ${props=> props.disabled? "grey": "black"};
    color: ${props=> props.disabled? "dark grey": "white"};
    padding: 1rem;
    margin-top: 1rem;
    &:hover {
    cursor: pointer;
  }
    
`