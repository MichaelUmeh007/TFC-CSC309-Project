import React, { useEffect, useState } from "react";
import axios from "axios";

const url = "http://127.0.0.1:8000/accounts/profile/";
const path = "/accounts/profile/";

let token = process.env.REACT_APP_ACCESS_TOKEN;

function App() {
    const [post, setPost] = useState(null);
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
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