// Tabs implementation taken from: https://www.youtube.com/watch?v=WkREeDy2WQ4

import { useState } from "react";
import "./index.css";
import * as Styles from "./Home.styles";


function SubscriptionPanel() {
  return (
    <div className="container">
        <Styles.StyledSubscriptionTitle>Current Plan</Styles.StyledSubscriptionTitle>
        <Styles.StyledChangePlanButton> Change Plan </Styles.StyledChangePlanButton>
    </div>
  );
}

export default SubscriptionPanel;