import React, { useEffect, useState } from "react";
import axios from "axios";

const url = "http://127.0.0.1:8000/subscriptions/options/";
const path = "/subscriptions/options/";

let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjcwNDcwMjAzLCJpYXQiOjE2NzA0NjY2MDMsImp0aSI6IjIzOTZjZjFiNWQxZTQ3MmFiODdkNTQwYzg5NGZiMDcyIiwidXNlcl9pZCI6OH0.uvJHpThlk5phRm7nM0Ept9jazGi_EqK4JeKnJObxo-o";

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
        <>{post.results[0]["cost"]}</>
    );
}

export default App;