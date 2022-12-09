import { useState } from "react";
import styled from "styled-components";
import { BoxDiv, BoxHeader, BoxText } from "./Transactions.styles";

const StyledBody = styled.body`
  margin-top: 80px;
  padding: 30px;
`;
function Transactions() {
  // state for transaction history
  const [transactionHist, setTransactionHist] = useState([]);
  // state for next payment
  const [nextPayment, setNextPayment] = useState("");

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

      <div className="history-container" style={{ width: "65%" }}>
        <BoxHeader>Transaction History:</BoxHeader>
        <BoxDiv>
          <BoxText>
            <span style={{ position: "relative", left: "2%" }}>Date</span>
            <span style={{ position: "relative", left: "86%" }}>Amount($)</span>
          </BoxText>
          <div
            style={{
              backgroundColor: "lightblue",
              height: "90%",
              width: "100%",
              position: "relative",
              margin: "0",
              padding: "0",
              overflowY: "scroll",
            }}
          ></div>
        </BoxDiv>
      </div>
      <div
        className="next-container"
        style={{
          width: "35%",
          position: "relative",
          left: "65%",
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
