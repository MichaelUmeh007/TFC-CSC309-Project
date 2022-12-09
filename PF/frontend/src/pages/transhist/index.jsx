import { useState } from "react";
import styled from "styled-components";
import { BoxDiv, BoxHeader, BoxText } from "./Transactions.styles";

const StyledBody = styled.body`
  margin-top: 80px;
  padding: 30px;
`;
function Transactions() {
  const [transactionHist, set]
  return (
    <StyledBody>
      <h1
        style={{
          textDecoration: "none",
          margin: "40px",
          marginTop: "0",
          fontWeight: "bold",
          fontFamily: "Alexandria, sans-serif",
          fontSize: "4em",
        }}
      >
        Transactions
      </h1>

      <div className="history-container" style={{ width: "50%" }}>
        <BoxHeader>Transaction History:</BoxHeader>
        <BoxDiv>
          <BoxText>View your transaction history here</BoxText>
        </BoxDiv>
      </div>
      <div
        className="next-container"
        style={{
          width: "50%",
          position: "relative",
          left: "50%",
          top: "-355px",
        }}
      >
        <BoxHeader className="next">Next Payment:</BoxHeader>
        <BoxDiv></BoxDiv>
      </div>
      <div style={{ padding: "50px" }}></div>
    </StyledBody>
  );
}

export default Transactions;
