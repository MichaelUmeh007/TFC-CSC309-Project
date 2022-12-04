import Navbar from "../../components/navbar";
import { Outlet } from "react-router-dom";
import StyledLink from "../../components/link";
import Dropdown from "../../components/dropdown";

function Layout() {
  return (
    <>
      <Navbar>
        <StyledLink to={"/"}>Home</StyledLink>
        <StyledLink to={"/studios"}>Studios</StyledLink>
        <StyledLink to={"/subscriptions"}>Subscriptions</StyledLink>
        <Dropdown />
      </Navbar>
      <Outlet />
    </>
  );
}

export default Layout;
