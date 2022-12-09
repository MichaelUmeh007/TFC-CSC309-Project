import styled from "styled-components"
import { Link } from "react-router-dom"


export const StyledLink = styled(Link)`
  text-decoration: ${props => props.decor? "default" : "none"}; 
  color: white;
  margin: ${props => props.margin || "10%"};
  font-weight: bold;
  @font-face {
    font-family: 'Alexandria', 'san-serif';
    src: url('https://fonts.googleapis.com/css2?family=Alexandria:wght@500&display=swap');
  }
  `