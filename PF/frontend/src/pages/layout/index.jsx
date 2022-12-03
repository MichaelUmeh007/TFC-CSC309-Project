import Navbar from "../../components/navbar";
import { Outlet } from "react-router-dom";
import StyledLink from "../../components/link";

function Layout() {
    return (
      <>
      <Navbar>
            <StyledLink to={'/'}>Home</StyledLink>
            <StyledLink to={'/studios'}>Studios</StyledLink>
            <StyledLink to={'/subscriptions'}>Subscriptions</StyledLink>
      </Navbar>
      <Outlet/>
      </>
      );
  }
  
  export default Layout;