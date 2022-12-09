import { useRef } from "react";
import { useState, useEffect } from "react";
import defaultprofilepic from "../../profile.png";
import {
  DropdownMenu,
  StyledUL,
  ProfilePic,
  StyledH3,
  StyledLI,
  DropdownLink,
} from "./Dropdown.styles";
import { useSignOut } from "react-auth-kit";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuthHeader } from "react-auth-kit";

const Dropdown = () => {
  // state for dropdown
  const [open, setOpen] = useState(false);
  // state for profile stuff
  const [pfp, setPfp] = useState(null);
  const [name, setName] = useState("First Last");

  // signout functionanlity
  const signOut = useSignOut();
  const navigate = useNavigate();

  const handleLogout = (e) => {
    console.log("logged out");
    signOut();
    navigate("/landing");
  };

  //api call to get profile
  const authheader = useAuthHeader();
  const getProfile = async () => {
    const response = await axios.get(
      "http://127.0.0.1:8000/accounts/profile/",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${authheader()}`,
        },
        withCredentials: false,
      }
    );
    // get user's full name
    let fullName = response.data.first_name + " " + response.data.last_name;
    setName(fullName);
    // get user pfp url
    let userAvatar = response.data.avatar;
    setPfp(userAvatar);
  };

  // TODO conditional rendering for the avatar
  let avatarComponent;
  if (pfp === null) {
    avatarComponent = (
      <ProfilePic src={defaultprofilepic} alt="profile"></ProfilePic>
    );
  } else {
    avatarComponent = <ProfilePic src={pfp} alt="profile"></ProfilePic>;
  }
  useEffect(() => {
    getProfile();
  });

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
    <div
      className="Dropdown"
      style={{ position: "absolute", right: "1.5%", top: "10px" }}
    >
      {/* TODO: check if backend profile has image, if not give default image */}
      <div className="menu-container" ref={menuRef}>
        {/* profile picture button that opens dropdown with onclick function that sets state*/}
        <div className="menu-trigger" onClick={() => setOpen(!open)}>
          {avatarComponent}
        </div>

        {/* dropdown block */}
        <DropdownMenu className={open ? "active" : "inactive"}>
          {/* TODO: here we'll use the User's name that we grabbed from the backend*/}
          <StyledH3>{name}</StyledH3>
          <StyledUL>
            <DropdownItem
              text={"My Profile"}
              url={"/profile"}
              onClick={() => navigate("/profile")}
            />
            <DropdownItem text={"Manage Subscription"} url={"/subscriptions"} />
            <DropdownItem text={"Logout"} click={handleLogout} />
          </StyledUL>
        </DropdownMenu>
      </div>
    </div>
  );
};

function DropdownItem(props) {
  return (
    <StyledLI onClick={props.click} className="dropdownItem">
      <DropdownLink to={props.url}>{props.text}</DropdownLink>
    </StyledLI>
  );
}

export default Dropdown;
