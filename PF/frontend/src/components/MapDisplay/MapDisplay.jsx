import React, { useRef, useEffect, useState } from "react";
import axios from "axios";
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax

import { StyledMapDisplay } from "./MapDisplay.styled";
import OverlayCard from "../../components/OverlayCard/OverlayCard";

const MapDisplay = (props) => {
    // State for component
    const [studio, setStudio] = useState(null);

    // Mapbox access token for 309
    mapboxgl.accessToken = 'pk.eyJ1IjoibWF0dHlwMTIzIiwiYSI6ImNsYWo2Y3prOTAxZXMzdnFneHA3Zjh1ajUifQ.WP7ebFyD56wq50cyYoQZBQ';

    const mapContainer = useRef(null);
    const map = useRef(null);

    // We should get the address of the logged in user or provide a way for them to let the browser get their current location
    // so that we can set it in the state here
    const [lng, setLng] = useState(-79.383);
    const [lat, setLat] = useState(43.653);
    const [zoom, setZoom] = useState(12);

    // Initialize the map
    useEffect(() => {
        // Make sure we don't re-initialize the map (if the ref is already coupled with a map object)
        if (map.current != null) {
            return; // initialize map only once
        }
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v12',
            center: [lng, lat],
            zoom: zoom
        });


    });

    // Update coordinates as user interacts with the map
    useEffect(() => {
        // Don't do anything if the map hasn't been initialized yet
        if (!map.current) {
            return
        };
        map.current.on('move', () => {
            setLng(map.current.getCenter().lng.toFixed(4));
            setLat(map.current.getCenter().lat.toFixed(4));
            setZoom(map.current.getZoom().toFixed(2));
        });
    });

    let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjcwNTU4MDk2LCJpYXQiOjE2NzA1NTQ0OTYsImp0aSI6ImI1NzhhNjc4M2FlYjQwN2Q4YTI4YzU4ZmNjYTEyMWQ1IiwidXNlcl9pZCI6M30.kKiwCQjdXZpjALFHCvMc7cV0RXjEqh7gvupbuwYEG-g";
    const getStudioById = async () => {
        const url = `http://localhost:8000/studios/${props.studioId}/details/`;
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        }
        
        const {data} = await axios.get(url, config);
        setStudio(data);
    }

    // Make a request for a studio's details if the user clicks on that studio
    // TODO: this doesn't re-render properly when studio is changed
    useEffect(() => {
        getStudioById();    
    }, [props.cardOpen]);

    // TODO: Make studios return amenities or make view for queries to amenities
    // TODO: Figure out how to display images

    return (
        <StyledMapDisplay>
            {props.cardOpen && 
            <OverlayCard name={studio.name}
                         imageUrl="https://upload.wikimedia.org/wikipedia/commons/7/7c/Fit_young_man_doing_deadlift_exercise_in_gym.jpg"
                         phoneNumber={studio.phone_number}
                         address={studio.address}
                         directions={studio.directions}
                         postalCode={studio.postal_code}
                         amenities={studio.amenities}
                         cardCloseHandler={props.closeCard}
            />}
            <div ref={mapContainer} className="map-container" />
            
        </StyledMapDisplay>

    );
}

export default MapDisplay;