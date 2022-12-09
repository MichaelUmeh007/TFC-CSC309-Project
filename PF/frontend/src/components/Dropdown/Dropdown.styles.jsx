import styled from "styled-components";
import { Link } from "react-router-dom";

export const StyledUL = styled.ul`
  list-style: none;
  padding: 0;
  text-align: center;
`;
export const DropdownLink = styled(Link)`
  color: white;
  text-decoration: none;
  text-align: left;
  @font-face {
    font-family: "Alexandria";
    src: url("https://fonts.googleapis.com/css2?family=Alexandria:wght@700&display=swap");
  }
  display: block;
  padding: 10px;
  width: 100%;
`;
export const ProfilePic = styled.img`
  &:hover {
    cursor: pointer;
  }
  position: absolute;
  top: 10px;
  right: 40px;
  height: 60px;
  width: 60px;
  border-radius: 50%;
`;
export const DropdownMenu = styled.div`
  &:before {
    content: "";
    position: absolute;
    top: -5px;
    right: 20px;
    height: 20px;
    width: 20px;
    background: black;
    transform: rotate(45deg);
  }
  &.active {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
    transition: 400ms ease;
  }
  &.inactive {
    opacity: 0;
    visibility: hidden;
    transform: translateY(-20px);
    transition: 400ms ease;
  }
  position: absolute;
  top: 100px;
  right: 40px;
  background-color: black;
  border-radius: 8px;
  padding: 10px 20px;
  width: 200px;
  color: white;
`;

export const StyledH3 = styled.h3`
  width: 100%;
  top: 50px;
  text-align: center;
  font-size: 18px;
  padding: 10px 0;
  font-weight: bold;
  color: white;
  line-height: 1.2rem;
  @font-face {
    font-family: "Alexandria";
    src: url("https://fonts.googleapis.com/css2?family=Alexandria:wght@700&display=swap");
  }
`;

export const StyledLI = styled.li`
  &:hover ${DropdownLink} {
    color: red;
  }
  &:hover {
    cursor: pointer;
  }
  border-top: 1px solid rgba(128, 128, 128, 0.2);
  display: flex;
  margin: 10px;
`;
