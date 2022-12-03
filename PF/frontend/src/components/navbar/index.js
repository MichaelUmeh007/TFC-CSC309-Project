import styled from "styled-components";

const StyledNav = styled.nav`
  
  `

function Navbar(props) {
    return (
      <>
        <StyledNav>
            {props.children}
        </StyledNav>
        
      </>
      );
  }
  
  export default Navbar;