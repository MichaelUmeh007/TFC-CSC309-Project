import { StyledNav } from "./Navbar.styles";
import logo from "../../TFC_logo.png"
import StyledLogo from "../Logo";
import { useLocation } from 'react-router-dom';

// The routes that should exclude the navigation bar
const excludeNavBarRoutes = ["/landing", "/profile"];

function Navbar(props) {
    const {pathname} = useLocation();

    // Checks if the current pathname is one that should exclude the navigation bar
    if (excludeNavBarRoutes.some((item) => pathname.includes(item))) return null;

    return (
      <>
        <StyledNav>
            <StyledLogo src={logo} alt="Logo" mright="0px" mleft="0px" display="block" width="142px" height="80px"/>
            <ul>
              {props.children}
            </ul>
        </StyledNav>
        
      </>
      );
  }
  
  export default Navbar;