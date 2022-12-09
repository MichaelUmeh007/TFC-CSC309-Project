// This is a placeholder for the dynamic button!
import React, { useEffect, useState } from "react";
import { StyledPlanTitle, StyledNoPlanTitle } from "./PlanButton.styled";
import axios from "axios";

const url = "http://127.0.0.1:8000";
const path = "/subscriptions/my-subscription/";

let token = process.env.REACT_APP_ACCESS_TOKEN;

function App() {
    const [post, setPost] = useState([]);
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    }
    useEffect(() => {
        axios.get(`${url}${path}`, config).then((response) => {
            setPost(response.data["subscription"]);
        });
    }, []);

    if (!post) {
        return (<StyledNoPlanTitle> Not Currently Subscribed </StyledNoPlanTitle>);
    }
    else {
        return (
            <StyledPlanTitle> { post } </StyledPlanTitle>
        );
    }
    
}

export default App;