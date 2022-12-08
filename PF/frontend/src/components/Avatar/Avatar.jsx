import React, { useEffect, useState } from "react";
import axios from "axios";

const url = "http://127.0.0.1:8000/accounts/profile/";
const path = "/accounts/profile/";

let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjcwNDY2NDY0LCJpYXQiOjE2NzA0NjI4NjQsImp0aSI6ImFjOTAyMDk3MzQ4ZjQ4MGY5MGE1NmU1NDJlNDgyZGE2IiwidXNlcl9pZCI6OH0.R9gjAvAgymLHnnUAo2XFwT2QNFlx2nT1pgrXUy3cuk0";

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
        <>{post.avatar}</>
    );
}

export default App;