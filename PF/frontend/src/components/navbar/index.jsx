import { StyledNav } from "./Navbar.styles";
import logo from "../../TFC_logo.png"
import StyledLogo from "../Logo";

function Navbar(props) {
    return (
      <>
        <StyledNav>
            <StyledLogo src={logo} alt="Logo" />
            <ul>
              {props.children}
            </ul>
        </StyledNav>
        
      </>
      );
  }
  
  export default Navbar;