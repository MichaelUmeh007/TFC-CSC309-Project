import Navbar from "../../components/navbar";
import { Outlet } from "react-router-dom";
import StyledLink from "../../components/Common/Link";
import Dropdown from "../../components/dropdown";

function Layout() {
  return (
    <>
      <Navbar>
        <StyledLink to={"/"}>Home</StyledLink>
        <StyledLink to={"/studios"}>Studios</StyledLink>
        <StyledLink to={"/subscriptions"}>Subscriptions</StyledLink>
        <StyledLink to={"/landing"}>Landing</StyledLink>
        <StyledLink to={"/transactions"}>Transactions</StyledLink>
        <Dropdown />
      </Navbar>
      <Outlet />
    </>
  );
}

export default Layout;
