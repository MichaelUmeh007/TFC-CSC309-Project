// Tabs implementation taken from: https://www.youtube.com/watch?v=WkREeDy2WQ4

import { useState } from "react";
import "./index.css";
import * as Styles from "./Home.styles";
import PlanButton from "../../components/SubscriptionContext/PlanButton";
import CurrentPlanText from "../../components/SubscriptionContext/CurrentPlanText";


function SubscriptionPanel() {
  return (
    <div className="container">
        <Styles.StyledSubscriptionTitle>Current Plan</Styles.StyledSubscriptionTitle>
        <CurrentPlanText/>
        <PlanButton/>
    </div>
  );
}

export default SubscriptionPanel;