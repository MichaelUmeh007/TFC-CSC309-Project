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
    const filterPath = "/studios/filter"

    // Fetches a page of studios from the backend
    let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjcwNTUxNjcxLCJpYXQiOjE2NzA1NDgwNzEsImp0aSI6IjU2NjUzNDIwZjNhYjQ4YzBiZDZmYmZiNGRkNjQ1ODYyIiwidXNlcl9pZCI6M30.d_-oE_kxbTm0BwFjs5MxCI5dKXQc8TnlKFDlhhqj_do";
    const getStudios = async () => {
        // If there is no search query, send a request to get ALL studios
        let response = {};
        if (!props.searchValue) {
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            }

            response = await axios.get(`${url}${allPath}`, config);
            setStudios(response.data);
        } else {
            // If there is a search query, make a request to the filter endpoint
            const queryParams = {};
            queryParams[props.searchQuery] = props.searchValue;

            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                params: queryParams
            }
            
            // Only render a response of studios if there's a non-empty list
            response = await axios.get(`${url}${filterPath}`, config);
            console.log(response);
            if (response.data.results) {
                setStudios(response.data.results);
            }
            
        }
    
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