// This is a placeholder for the dynamic button!
import React, { useEffect, useState } from "react";
import { StyledChangePlanButton } from "./PlanButton.styled";
import axios from "axios";
import { useAuthHeader } from "react-auth-kit";

const url = "http://127.0.0.1:8000";
const path = "/subscriptions/my-subscription/";

function App() {
    const [post, setPost] = useState(null);
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
            setPost(response.data["subscription"]);
        });
    }, []);

    if (!post) return (<StyledChangePlanButton> Join Today! </StyledChangePlanButton>);

    return (
        <StyledChangePlanButton> Change Plan </StyledChangePlanButton>
    );
}

export default App;