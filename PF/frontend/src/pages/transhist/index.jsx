import { useState } from "react";
import styled from "styled-components";
import { BoxDiv, BoxHeader, BoxText, StyledLi } from "./Transactions.styles";
import axios from "axios";
import { useAuthHeader } from "react-auth-kit";
import { useEffect } from "react";

const StyledBody = styled.body`
  margin-top: 80px;
  padding: 30px;
`;
function Transactions() {
  // state for transaction history
  const [transactionHist, setTransactionHist] = useState([]);
  // state for next payment
  const [nextPayment, setNextPayment] = useState({
    amount: null,
    timestamp: null,
  });

  const authheader = useAuthHeader();
  // function for transaction history call
  const getHist = async () => {
    const response = await axios.get(
      "http://127.0.0.1:8000/accounts/profile/payment-history/",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${authheader()}`,
        },
        withCredentials: false,
      }
    );
    setTransactionHist(response.data.payment_history);
    setNextPayment(response.data.next_payment);
  };

  useEffect(() => {
    getHist();
    console.log("useeffect call");
  });

  let nextMsg;
  if (nextPayment.amount === null && nextPayment.timestamp === null) {
    console.log("check1");
    nextMsg = (
      <BoxText className="nonext">You do not have an upcoming payment.</BoxText>
    );
  } else {
    console.log("check2");
    const timestamp = nextPayment.timestamp.split("T");
    nextMsg = (
      <BoxText className="nextmsg">
        Your next payment is on {timestamp[0]}, at {timestamp[1]}. <br></br>{" "}
        <br></br>
        You will be charged ${nextPayment.amount}.
      </BoxText>
    );
  }

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
            <span style={{ position: "relative", left: "2%" }}>
              Date: (oldest->newest)
            </span>
            <span style={{ position: "absolute", right: "4%" }}>Amount($)</span>
          </BoxText>
          <div
            style={{
              height: "90%",
              width: "100%",
              position: "relative",
              margin: "0",
              padding: "0",
              overflowY: "scroll",
            }}
          >
            {transactionHist.map((payment) => {
              return (
                <div key={payment.timestamp}>
                  <ul style={{ listStyleType: "none" }}>
                    <StyledLi>
                      {payment.timestamp}{" "}
                      <span style={{ position: "absolute", right: "2%" }}>
                        ${payment.amount}
                      </span>
                    </StyledLi>
                  </ul>
                </div>
              );
            })}
          </div>
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
        <BoxDiv>{nextMsg}</BoxDiv>
      </div>
    </StyledBody>
  );
}

export default Transactions;
