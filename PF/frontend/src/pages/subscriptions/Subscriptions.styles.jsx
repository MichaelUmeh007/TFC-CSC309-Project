import styled from "styled-components";

export const StyledBody = styled.body`
  margin-top: 7%;
`;
export const StyledH2 = styled.h2`
  &.cancel-msg {
    position: relative;
    top: 500px;
  }
  text-align: center;
  text-decoration: none;
  margin: 20px;
  font-weight: 500;
  font-family: "Alexandria", sans-serif;
  font-size: 3em;
`;

export const Row = styled.div`
  display: flex;
  position: absolute;
  left: 17.5%;
  width: 65%;

`;

export const Column = styled.div`
  flex: 50%;
  padding: 20px;
  border-radius: 10px;
`;

export const StyledH3 = styled.h3`
  font-family: "Alexandria", sans-serif;
  font-weight: 500;
  text-align: center;
  margin: 10px;
  font-size: 2.2em;
`;
export const StyledSpan = styled.span`
  &.price-currency {
    font-size: 1.25em;
  }
  &.price-dollar {
    font-size: 3em;
  }
  &.price-cents {
    font-size: 1.5em;
  }
  font-family: "Alexandria", sans-serif;
  font-weight: normal;
`;

export const FineTextContainer = styled.div`
  font-family: "Alexandria", sans-serif;
  position: relative;
  top: 450px;
  left: 17.5%;
  font-size: 0.75rem;
  color: grey;
  width: 65%;
`;

export const CancellationDiv = styled.div`
  font-family: "Alexandria", sans-serif;
  position: relative;
  border-style: solid;
  border-radius: 10px;
  border-width: 2px;
  border-color: black;
  top: 500px;
  width: 70%;
  height: 300px;
  left: 15%;
  padding: 15px;
  margin: 15px;
`;
export const MembershipPerk = styled.p`
  &.monthly-perk {
    border-top: 1px solid rgba(100, 100, 100, 0.5);
  }
  &.yearly-perk {
    border-top: 1px solid rgba(255, 255, 255, 0.5);
  }
  font-family: "Alexandria", sans-serif;
  font-weight: normal;
  padding: 10px;
  margin-bottom: 0px;
  margin-top: 0;
`;

export const StyledButton = styled.button`
  &.monthly-button {
    background: rgb(60, 60, 60);
    color: white;
  }
  &.cancel-button {
    background: rgb(40, 40, 40);
    color: white;
    margin-top: 15px;
  }
  &.yearly-button {
    background: white;
    color: crimson;
  }
  padding: 10px 20px;
  border-radius: 4px;
  border: none;
  font-family: "Alexandria", sans-serif;
  font-weight: normal;
  font-size: 24px;
  cursor: pointer;
  margin-top: 0;
  margin-bottom: 15px;
`;

export const ModalContainer = styled.div`
  display: flex;
  justy-content: center;
  align-items: center;
`;
