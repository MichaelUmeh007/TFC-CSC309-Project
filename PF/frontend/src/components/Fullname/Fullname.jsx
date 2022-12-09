import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuthHeader } from "react-auth-kit";

const url = "http://127.0.0.1:8000/accounts/profile/";
const path = "/accounts/profile/";

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
        axios.get(url, config).then((response) => {
            setPost(response.data);
        });
    }, []);

    if (!post) return (<p>UserNotFound</p>);

    return (
        <>{post.first_name} {post.last_name}</>
    );
}

export default App;