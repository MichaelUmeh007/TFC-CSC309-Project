import React, {useState, useEffect} from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { StyledBody, StyledContentBodyContainer, StyledHeaderText } from "./Classes.styles";
import { useAuthHeader } from "react-auth-kit";

import "./index.css"
import ScheduleTabs from "./ScheduleTabs";

// TODO: Read thru and understand components/Modal so you can use it for confirmation/rejection on enrolment/drop
// TODO: See how hard it would be to make the button conditionally appear as enrol or drop based on whether class is in user's schedule
const Classes = (props) => {
    // React auth kit 
    const authheader = useAuthHeader();

    // Grab the studio id parameter provided in this url
    const {studioId} = useParams();
    
    // TODO: Get the studio name by axios request to studio details using studioId
    const [studioName, setStudioName] = useState("");
    const getStudioName = async () => {
        const url = `http://localhost:8000/studios/${studioId}/details/`;
        const config = {
            headers: {
                "Content-Type": "application/json", 
                Authorization: `${authheader()}`,
                withCredentials: false
            }
        }
        
        // Make a request to the server, store all the list of class occurrences that are returned
        const {data} = await axios.get(url, config);
        setStudioName(data.name);
    }

    // This could be changed for if we need to paginate (dependency on page number)
    useEffect(() => {   
        getStudioName();
    });

    return (
        <StyledBody>
            <StyledHeaderText>{studioName} Class Schedule</StyledHeaderText>
            <StyledContentBodyContainer>
                <div className="div1-schedule">
                    <ScheduleTabs studioId={studioId} />
                </div>
                <div className="clear"></div>
            </StyledContentBodyContainer>
        </StyledBody>
    )
}

export default Classes;