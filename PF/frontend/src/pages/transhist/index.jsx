import { useState } from "react";
import styled from "styled-components";
import { BoxDiv, BoxHeader, BoxText } from "./Transactions.styles";

const StyledBody = styled.body`
  margin-top: 80px;
  padding: 30px;
`;
function Transactions() {
    const [buttonPressed, setButtonPressed] = useState(false);

    const buttonPress = () =>{
        setButtonPressed(!buttonPressed);
        console.log("button pressed");
    }

    let button;
    if (buttonPressed) {
        button = <p>true</p> 
    } else {
        button = <p>false</p>
    }
    
  return <StyledBody>    
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
    <button onClick={buttonPress}>Button</button>
    {button}
    
    <div className="history-container">
        <BoxHeader>Transaction History</BoxHeader>
        <BoxDiv>
            <BoxText>View your transaction history here</BoxText>
        </BoxDiv>

        {/* testing */}
    </div>
    <div style={{padding: "50px"}}></div>
    </StyledBody>;
      
}

export default Transactions;
