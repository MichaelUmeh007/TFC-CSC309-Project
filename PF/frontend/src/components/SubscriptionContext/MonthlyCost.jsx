import React, { useEffect, useState } from "react";
import { useAuthHeader } from "react-auth-kit";
import axios from "axios";

const url = "http://127.0.0.1:8000/subscriptions/options/";
const path = "/subscriptions/options/";

function App() {
    const [post, setPost] = useState(null);
    const authheader = useAuthHeader();
    const config = {
        headers: {
            Authorization: `${authheader()}`,
            "Content-Type": "application/json",
            withCredentials: false
        }
    }
    useEffect(() => {
        axios.get(url, config).then((response) => {
            var appData = response.data["results"];
            var typeToSeek = "monthly";
            var filteredAppData = appData.filter(({
                type
            }) => (type == "monthly") );
            setPost(filteredAppData[0]);
            console.log(filteredAppData);
        });
    }, []);

    if (!post) {
        return (<>PriceNotFound</>);
    }
    else {
        return ( <>{post["cost"]}</> );
    }
}

export default App;