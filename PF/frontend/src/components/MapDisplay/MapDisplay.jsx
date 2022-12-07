import React, { useRef, useEffect, useState } from "react";
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax

import { StyledMapDisplay } from "./MapDisplay.styled";
import OverlayCard from "../../components/OverlayCard/OverlayCard";

const MapDisplay = (props) => {
    // Mapbox access token for 309
    mapboxgl.accessToken = 'pk.eyJ1IjoibWF0dHlwMTIzIiwiYSI6ImNsYWo2Y3prOTAxZXMzdnFneHA3Zjh1ajUifQ.WP7ebFyD56wq50cyYoQZBQ';

    const mapContainer = useRef(null);
    const map = useRef(null);

    // We should get the address of the logged in user or provide a way for them to let the browser get their current location
    // so that we can set it in the state here
    const [lng, setLng] = useState(-79.5);
    const [lat, setLat] = useState(43.6);
    const [zoom, setZoom] = useState(9);

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

    return (
        <StyledMapDisplay>
            <div ref={mapContainer} className="map-container" />
            {/* Need to make the code below use a portal, make it a modal */}
            {props.cardOpen && 
            <OverlayCard name="College and Bay Studio"
                         imageUrl="https://upload.wikimedia.org/wikipedia/commons/7/7c/Fit_young_man_doing_deadlift_exercise_in_gym.jpg"
                         phoneNumber="416-123-4567"
                         address="100 Queen St. W"
                         directions="https://www.google.com/maps/dir/?api=1&origin=100%20Queen%20St.%20W&destination=380%20The%20East%20Mall%2C%20Etobicoke%2C%20ON&travelmode=driving"
                         postalCode="M2J 3K9"
                         amenities={[{ id: 1, type: "Massage Room"}, { id: 2, type: "Washrooms"}]}
                         cardCloseHandler={props.closeCard}
            />}
        </StyledMapDisplay>

    );
}

export default MapDisplay;