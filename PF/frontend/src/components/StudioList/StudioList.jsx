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
    // State that keeps track of the current list of studios being rendered
    const [studios, setStudios] = useState([]);
    const [searchQuery, setSearchQuery] = useState(null);

    // Consider making this a global with context
    const url = "http://127.0.0.1:8000";
    const allPath = "/studios/all/";    // This could be default page1 request? or we make state for path
    const filterPath = "/studios/filter/"

    // Fetches a page of studios from the backend
    let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjcwNTE5MzYwLCJpYXQiOjE2NzA1MTU3NjAsImp0aSI6ImY4YTQ1NmZiYmRlYjQwY2U5ZGQwZTdiZGQ2ODU3YWE3IiwidXNlcl9pZCI6M30.MULAqgKmu9Q15oybo4a7J4iUV3FWQ0nlOQ0bFwvj0vA";
    const getStudios = async () => {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        }

        // If there is no search query, send a request to get ALL studios
        let response = {};
        if (!searchQuery) {
            response = await axios.get(`${url}${allPath}`, config);
        } else {
            // If there is a search query, make a request to the filter endpoint
            response = await axios.get(`${url}${filterPath}`, {params: searchQuery}, config);
        }
        
        setStudios(response.data);
    }

    // Fetches and re-renders the next page of stores when user changes page number
    useEffect(() => {
        // Make another axios request to get the next page of data
        getStudios();
    }, [searchQuery]);

    return(
        <StyledStudioList>
            {studios.map(studio => 
                <StudioItem 
                    key={studio.id}
                    id={studio.id}
                    name={studio.name}
                    address={studio.address}
                    phoneNumber={studio.phone_number}
                    openStudioDetailsHandler={props.openCard}/>
            )}
        </StyledStudioList>
    )
}

export default StudioList;