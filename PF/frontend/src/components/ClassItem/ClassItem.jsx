import React from "react";
import { useEffect, useState } from "react";
import { StyledClassItem } from "./ClassItem.styled";
import { useAuthHeader } from "react-auth-kit";
import axios from "axios";

const ClassItem = (props) => {
    const authheader = useAuthHeader();
    
    const [studioId, setStudioId] = useState(0);
    useEffect(() => {
        findStudioId();
    });

    const findStudioId = async () => {
        // Get the studio that has this class
        const queryParams = {studio_name: props.studio_name};
        
        const config = {
          headers: {
              "Content-Type": "application/json", 
              Authorization: `${authheader()}`,
              withCredentials: false
          },
          params: queryParams
        }
        // Find the studio this class corresponds to
        const { data } = await axios.get("http://localhost:8000/studios/filter", config);
        const id = data.results[0].id;
        setStudioId(id);
      }

    const handleAction = () => {
        props.actionHandler(props.parent_class, props.start_datetime, studioId);
    }
    return (
        <StyledClassItem key={props.id}>
            <h3>{props.name}</h3>
            <p>Coach: {props.coach}</p>
            <p>Studio: {props.studio_name}</p>
            <p>Date: {String(new Date(props.start_datetime).toDateString())}</p>
            <p>Time: {String(new Date(props.start_datetime).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })) + 
            " - " + 
            String(new Date(props.end_datetime).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }))}</p>
            <p># Ppl. Attending: {props.num_attending}</p>
            {props.action && <button onClick={handleAction}>{props.action}</button>}
        </StyledClassItem>
    );
}

export default ClassItem;