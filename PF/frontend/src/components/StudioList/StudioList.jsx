import React, { useEffect, useState } from "react";
import { StyledStudioList } from "./StudioList.styled";
import StudioItem from "../StudioItem/StudioItem";
import axios from "axios";
import { useAuthHeader } from "react-auth-kit";
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import 'mapbox-gl/dist/mapbox-gl.css';

// Query all the studios
// Use a map probably to display info for each studio (paginate it - maybe 5 studios at a time)
// If user clicks on studio component, it conditionally renders the OVerlayCard for that studio
// If they click on another one, renders that one
// Fix positioning of "X" close button
const StudioList = (props) => {
    // Mapbox GL
    mapboxgl.accessToken = 'sk.eyJ1IjoibWF0dHlwMTIzIiwiYSI6ImNsYmhqZmIxYjBqemgzcG9jbzl3MnVmNjcifQ.row-jZM3f43-kjMHAmIg3Q';

    // State that keeps track of the current list of studios being rendered
    const [studios, setStudios] = useState([]);
    const authheader = useAuthHeader();

    // Consider making this a global with context
    const url = "http://127.0.0.1:8000";
    const allPath = "/studios/all/";    // This could be default page1 request? or we make state for path
    const filterPath = "/studios/filter"

    // Fetches a page of studios from the backend
    const getStudios = async () => {
        // If there is no search query, send a request to get ALL studios
        let response = {};
        if (!props.searchValue) {
            const config = {
                headers: {
                    "Content-Type": "application/json", 
                    Authorization: `${authheader()}`,
                    withCredentials: false
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
                    "Content-Type": "application/json", 
                    Authorization: `${authheader()}`,
                    withCredentials: false
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

    const addFeaturesToDataset = async () => {
        const config = {
            headers: {
                "Content-Type": "application/json",
            }
        };
        const dataset_id = "clbhfyl8k0gy429mbt0n1bdan";
        const username = "mattyp123";
        if (studios) {
            for (let studio of studios) {
                let feature_id = studio.id;
                const featureBody = {
                    id: feature_id,
                    type: "Feature",
                    geometry: {
                      type: "Point",
                      coordinates: [ studio.latitude, studio.longitude ]
                    },
                    properties: {
                        studio: "true"
                    }
                }
                try {
                    await axios.put(
                        `https://api.mapbox.com/datasets/v1/${username}/${dataset_id}/features/${feature_id}?access_token=${mapboxgl.accessToken}`, 
                    JSON.stringify(featureBody), 
                    config);
                } catch (err) {
                    console.log(err);
                }
                
            }
        }        
    }

    // Only once, add all studio coordinates to the map
    // useEffect(() => {
    //     addFeaturesToDataset();
    // });


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