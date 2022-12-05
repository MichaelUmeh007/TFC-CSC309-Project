import { useRef } from "react";
import { useState, useEffect } from "react";
import profilepic from "../../profile.png";
import {
  DropdownMenu,
  StyledUL,
  ProfilePic,
  StyledH3,
  StyledLI,
  DropdownLink,
} from "./Dropdown.styles";

const Dropdown = () => {
  // state hook for dropdown being open or closed
  const [open, setOpen] = useState(false);

  let menuRef = useRef();

  // use effect hook to listen for mouseclicks once an item is clicked / clicked outside
  useEffect(() => {
    let handler = (e) => {
      if (!menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("click", handler);

    // cleanup event listener
    return () => {
      document.removeEventListener("click", handler);
    };
  });

  return (
    <div className="Dropdown">
      {/* TODO: check if backend profile has image, if not give default image */}
      <div className="menu-container" ref={menuRef}>
        {/* profile picture button that opens dropdown with onclick function that sets state*/}
        <div className="menu-trigger" onClick={() => setOpen(!open)}>
          <ProfilePic src={profilepic} alt="profile"></ProfilePic>
        </div>

        {/* dropdown block */}
        <DropdownMenu className={open ? "active" : "inactive"}>
          {/* TODO: here we'll use the User's name that we grabbed from the backend*/}
          <StyledH3>First Last</StyledH3>
          <StyledUL>
            <DropdownItem
              text={"My Profile"}
              url={"/profile"}
              onClick={console.log("hello")}
            />
            <DropdownItem text={"Manage Subscription"} url={"/subscriptions"} />
            <DropdownItem text={"Logout"} url={"/"} />
            {/* TODO: need to add handling to logout when user presses logout */}
          </StyledUL>
        </DropdownMenu>
      </div>
    </div>
  );
};

function DropdownItem(props) {
  return (
    <StyledLI className="dropdownItem">
      <DropdownLink to={props.url}>{props.text}</DropdownLink>
    </StyledLI>
  );
}

export default Dropdown;
