import styled from "styled-components";

export const StyledFormSection = styled.section`
  width: 100%;
  max-width: 420px;
  min-height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 1rem;
  margin: 1em;
  background-color: ${props => props.backgroundcolor || "#FE5800"};
  color: #fff;
  border-radius: 1em;
`