import React, { useEffect, useState } from "react";
import { StyledStudioList } from "./StudioList.styled";
import StudioItem from "../StudioItem/StudioItem";
import axios from "axios";

// Query all the studios
// Use a map probably to display info for each studio (paginate it - maybe 5 studios at a time)
// If user clicks on studio component, it conditionally renders the OVerlayCard for that studio
// If they click on another one, renders that one
// Fix positioning of "X" close button
const StudioList = (props) => {
    const [studios, setStudios] = useState([]);
    // const [pageNumber, setPageNumber] = useState(1);

    // Consider making this a global with context
    const url = "http://127.0.0.1:8000";
    const path = "/studios/all/";    // This could be default page1 request? or we make state for path

    // Fetches a page of studios from the backend
    let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjcwMjcwNTM3LCJpYXQiOjE2NzAyNjY5MzcsImp0aSI6ImRjY2IyZWM0ZTgwMzQ0OWJiNTNhM2Y0ZWI3YmNhMTc3IiwidXNlcl9pZCI6M30.RusV2Nwl3Vk0pcNkMLut8oPwwcsoP4OfYvo2JA_AvRo";
    const getStudios = async () => {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        }
        const {data} = await axios.get(`${url}${path}`, config);
        setStudios(data);
    }

    // Fetches and re-renders the next page of stores when user changes page number
    useEffect(() => {
        // Make another axios request to get the next page of data
        getStudios();
    }, []);

    return(
        <StyledStudioList>
            {studios.map(studio => 
                <StudioItem 
                    key={studio.id}
                    name={studio.name}
                    address={studio.address}
                    phoneNumber={studio.phone_number}
                    openStudioDetailsHandler={props.openCard}/>
            )}
        </StyledStudioList>
    )
}

export default StudioList;