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

    // Consider making this a global with context
    const url = "http://127.0.0.1:8000";
    const allPath = "/studios/all/";    // This could be default page1 request? or we make state for path
    const filterPath = "/studios/filter/"

    // Fetches a page of studios from the backend
    let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjcwNTMxMzA1LCJpYXQiOjE2NzA1Mjc3MDUsImp0aSI6IjU5ZDRhY2M1YzAzYTQyZGFiYmViZGFjYmRiYmYxNTQzIiwidXNlcl9pZCI6M30.HsHxebhHVCE6y8lKgQAWvEZG2amqUhaSVwyA17e6bdA";
    const getStudios = async () => {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        }

        // If there is no search query, send a request to get ALL studios
        let response = {};
        if (!props.searchValue) {
            response = await axios.get(`${url}${allPath}`, config);
        } else {
            // If there is a search query, make a request to the filter endpoint
            const queryParams = {};
            queryParams[props.searchQuery] = props.searchValue;

            response = await axios.get(`${url}${filterPath}`, {params: queryParams}, config);
        }
        
        setStudios(response.data);
    }

    // Fetches and re-renders the list of studios as the user makes a search
    useEffect(() => {
        getStudios();
    }, [props.searchValue]);

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