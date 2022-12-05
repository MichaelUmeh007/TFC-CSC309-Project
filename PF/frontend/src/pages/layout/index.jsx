import Navbar from "../../components/navbar";
import { Outlet } from "react-router-dom";
<<<<<<< HEAD
import StyledLink from "../../components/link";
import Dropdown from "../../components/dropdown";
=======
import StyledLink from "../../components/Common/Link"
>>>>>>> e3d4586056c75173a3842e366ef306382967e415

function Layout() {
  return (
    <>
      <Navbar>
<<<<<<< HEAD
        <StyledLink to={"/"}>Home</StyledLink>
        <StyledLink to={"/studios"}>Studios</StyledLink>
        <StyledLink to={"/subscriptions"}>Subscriptions</StyledLink>
        <Dropdown />
=======
            <StyledLink to={'/'}>Home</StyledLink>
            <StyledLink to={'/studios'}>Studios</StyledLink>
            <StyledLink to={'/subscriptions'}>Subscriptions</StyledLink>
            <StyledLink to={'/landing'}>Landing</StyledLink>
>>>>>>> e3d4586056c75173a3842e366ef306382967e415
      </Navbar>
      <Outlet />
    </>
  );
}

export default Layout;
