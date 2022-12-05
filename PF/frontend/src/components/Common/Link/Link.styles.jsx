import styled from "styled-components"
import { Link } from "react-router-dom"


export const StyledLink = styled(Link)`

  color: white;
  text-decoration: ${props => props.decor? "default" : "none"}; 
  margin: ${props => props.margin || "10%"};
  font-weight: bold;
  @font-face {
    font-family: 'Alexandria';
    src: url('https://fonts.googleapis.com/css2?family=Alexandria:wght@700&display=swap');
  }
  `