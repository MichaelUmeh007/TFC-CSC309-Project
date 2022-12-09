import styled from "styled-components";

export const BoxDiv = styled.div`
  border-style: solid;
  border-color: black;
  position: relative;
  left: 4%;
  width: 90%;
  top: 30px;
  padding: 15px;
  height: 300px;
  font-family: "Alexandria", sans-serif;
  font-weight: normal;
`;

export const StyledLi = styled.li`
  margin: 10px;
  padding: 5px;
  position: relative;
  left: 0.5%;
  width: 98%;
  border-top: 1px solid rgba(128, 128, 128, 0.2);
`;
export const BoxHeader = styled.p`
  font-family: "Alexandria", sans-serif;
  font-weight: normal;
  position: relative;
  padding: 15px;
  padding-bottom: 0;
  margin: 0;
  font-size: 2em;
  left: 3%;
`;

export const BoxText = styled.p`
  &.nextmsg {
    position: relative;
    top: 35%;
    font-size: 20px;
  }
  &.nonext {
    position: relative;
    top: 45%;
    font-size: 20px;
  }
  margin-bottom: 5px;
  font-family: "Alexandria", sans-serif;
  font-weight: normal;
`;
