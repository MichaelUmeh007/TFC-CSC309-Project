// Tabs implementation taken from: https://www.youtube.com/watch?v=WkREeDy2WQ4

import { useState } from "react";
import "./index.css";
import * as Styles from "./Home.styles";
import PlanButton from "../../components/SubscriptionContext/PlanButton";
import CurrentPlanText from "../../components/SubscriptionContext/CurrentPlanText";
import styled from "styled-components";
import { Link } from "react-router-dom"

const StyledLink = styled(Link)`
  text-decoration: ${props => props.decor? "default" : "none"}; 
  color: white;
  font-weight: bold;
  @font-face {
    font-family: 'Alexandria', 'san-serif';
    src: url('https://fonts.googleapis.com/css2?family=Alexandria:wght@500&display=swap');
  }
  margin: 0 auto;
`

function SubscriptionPanel() {
  return (
    <div className="subContainer">
        <Styles.StyledSubscriptionTitle>Current Plan</Styles.StyledSubscriptionTitle>
        <CurrentPlanText/>
        <StyledLink to={'/subscriptions'}>
          <PlanButton/>
        </StyledLink>
    </div>
  );
}

export default SubscriptionPanel;