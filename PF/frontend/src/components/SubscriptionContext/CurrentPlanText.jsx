// This is a placeholder for the dynamic button!
import React, { useEffect, useState } from "react";
import { StyledPlanTitle, StyledNoPlanTitle } from "./PlanButton.styled";
import axios from "axios";
import { useAuthHeader } from "react-auth-kit";

const url = "http://127.0.0.1:8000";
const path = "/subscriptions/my-subscription/";

function App() {
    const [post, setPost] = useState([]);
    const authheader = useAuthHeader();
    const config = {
        headers: {
            "Content-Type": "application/json", 
            Authorization: `${authheader()}`,
            withCredentials: false
        }
    }
    useEffect(() => {
        axios.get(`${url}${path}`, config).then((response) => {
            setPost(response.data);
        });
    }, []);

    if (post["subscription_cost"] == undefined) {
        return (<StyledNoPlanTitle> Not Currently Subscribed </StyledNoPlanTitle>);
    }
    else {
        return (
            <StyledPlanTitle> { "$" + post["subscription_cost"] + "/" + post["subscription"] } </StyledPlanTitle>
        );
    }
}

export default App;