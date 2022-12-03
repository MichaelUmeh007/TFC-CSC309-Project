import Navbar from "../../components/navbar";
import { Link, Outlet } from "react-router-dom";

function Layout() {
    return (
      <>
      <Navbar>
            <Link to={'/'}>Home</Link>
            <Link to={'/studios'}>Studios</Link>
            <Link to={'/subscriptions'}>Subscrptions</Link>
      </Navbar>
      <Outlet/>
      </>
      );
  }
  
  export default Layout;