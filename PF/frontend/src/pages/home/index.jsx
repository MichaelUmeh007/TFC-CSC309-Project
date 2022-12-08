import styled from "styled-components";
import * as Styles from "./Home.styles";
import FullNameText from "../../components/Fullname/Fullname";
import "./index.css"

// Current Time -> Greeting Code achieved from: https://stackoverflow.com/questions/13244939/javascript-to-output-text-based-on-users-current-time
var today = new Date();
var curHr = today.getHours();
var greetingTime = "";
if (curHr < 12) {
  greetingTime = "morning";
} else if (curHr < 18) {
  greetingTime = "afternoon";
} else {
  greetingTime = "evening";
}

function Home() {
  return (
    <Styles.StyledBody>
      <Styles.StyledHeaderText>Good { greetingTime } <FullNameText/>!</Styles.StyledHeaderText>
      <Styles.StyledContentBodyContainer>
        <div className="div1">
          DIV1
        </div>
        <div className="div2">
          DIV2
        </div>
        <div className="clear"></div>
      </Styles.StyledContentBodyContainer>
    </Styles.StyledBody>
  );
}

export default Home;