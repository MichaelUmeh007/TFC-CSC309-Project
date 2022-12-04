import React, { useEffect, useState } from "react";
import OverlayCard from "../../components/OverlayCard/OverlayCard";
import axios from "axios";
import { StyledStudioList } from "../../components/styles/StudioList.styled";
import StudioItem from "./StudioItem";

// Query all the studios
// Use a map probably to display info for each studio (paginate it - maybe 5 studios at a time)
// If user clicks on studio component, it conditionally renders the OVerlayCard for that studio
// If they click on another one, renders that one
// Fix positioning of "X" close button
const StudioList = (props) => {
    // State to keep track of whether a Studio Details Card is open on the page or not
    const [cardOpen, setCardOpen] = useState(false);
    const [studios, setStudios] = useState([]);
    // const [pageNumber, setPageNumber] = useState(1);

    // Consider making this a global with context
    const url = "http://127.0.0.1:8000";
    const path = "/studios/all/";    // This could be default page1 request? or we make state for path

    // Fetches a page of studios from the backend
    let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjcwMTg5MzcyLCJpYXQiOjE2NzAxODU3NzIsImp0aSI6ImQ2ZjdkNzliOWIwMzRmMmNhMzUyZDUxYWI4Mzg2ODk0IiwidXNlcl9pZCI6M30.uMfBKEhyUVKVIc5P9Mn_082Iktr5GuTm0bJQ2YG5fW8";
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

    const closeCard = () => {
        setCardOpen(false);
    }

    const openCard = () => {
        setCardOpen(true);
    }

    return(
        <StyledStudioList>
            {studios.map(studio => 
                <StudioItem 
                    key={studio.id}
                    name={studio.name}
                    address={studio.address}
                    phoneNumber={studio.phone_number}
                    openStudioDetailsHandler={openCard}/>
            )}

            {/* <button onClick={openCard}>Click me!</button> */}
            {cardOpen && 
            <OverlayCard name="College and Bay Studio"
                         imageUrl="https://upload.wikimedia.org/wikipedia/commons/7/7c/Fit_young_man_doing_deadlift_exercise_in_gym.jpg"
                         phoneNumber="416-123-4567"
                         address="100 Queen St. W"
                         directions="https://www.google.com/maps/dir/?api=1&origin=100%20Queen%20St.%20W&destination=380%20The%20East%20Mall%2C%20Etobicoke%2C%20ON&travelmode=driving"
                         postalCode="M2J 3K9"
                         amenities={[{ id: 1, type: "Massage Room"}, { id: 2, type: "Washrooms"}]}
                         cardCloseHandler={closeCard}
            />}
        </StyledStudioList>
    )
}

export default StudioList;