import React from "react";
import { StyledBody, StyledContentBodyContainer, StyledHeaderText } from "./Classes.styles";

import "./index.css"
import ScheduleTabs from "./ScheduleTabs";

// TODO: Figure out how to set react-router up to handle routes with studio id in them?
// TODO: Read thru and understand components/Modal so you can use it for confirmation/rejection on enrolment/drop
// TODO: See how hard it would be to make the button conditionally appear as enrol or drop based on whether class is in user's schedule
// TODO: Fix ScheduleTabs to map out the right amount of tabs of the right size, for the next 7 days
const Classes = (props) => {
    return (
        <StyledBody>
            <StyledHeaderText>{props.studioName} Class Schedule</StyledHeaderText>
            <StyledContentBodyContainer>
                <div className="div1">
                    <ScheduleTabs/>
                </div>
                <div className="clear"></div>
            </StyledContentBodyContainer>
        </StyledBody>
    )
}

export default Classes;