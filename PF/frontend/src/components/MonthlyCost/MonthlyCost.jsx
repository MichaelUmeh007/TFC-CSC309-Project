import React, { useEffect, useState } from "react";
import axios from "axios";

const url = "http://127.0.0.1:8000/subscriptions/options/";
const path = "/subscriptions/options/";

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