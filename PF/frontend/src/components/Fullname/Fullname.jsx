import React, { useEffect, useState } from "react";
import axios from "axios";

const url = "http://127.0.0.1:8000/accounts/profile/";
const path = "/accounts/profile/";

let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjcwNDYyNzgxLCJpYXQiOjE2NzA0NTkxODEsImp0aSI6Ijk0ZWIzMjBhOTk4ZjQ3M2M5MTMzMGE5YTAzMmJlZDhlIiwidXNlcl9pZCI6OH0.PqPRXNdM6OAxXT8n826dXNbtKCuHdodG70HrgeeYZT0";

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

// export default function Parent() {
//     const [users, setUsers] = useState([]);
//     const url = "http://127.0.0.1:8000";
//     const path = "/accounts/profile/";

//     let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjcwNDYyNzgxLCJpYXQiOjE2NzA0NTkxODEsImp0aSI6Ijk0ZWIzMjBhOTk4ZjQ3M2M5MTMzMGE5YTAzMmJlZDhlIiwidXNlcl9pZCI6OH0.PqPRXNdM6OAxXT8n826dXNbtKCuHdodG70HrgeeYZT0";
    
//     useEffect(() => {
//         getUser();
//     }, []);
    
//     const getUser = async () => {
//         const config = {
//             headers: {
//                 Authorization: `Bearer ${token}`,
//                 "Content-Type": "application/json"
//             }
//         }
//         const {data} = await axios.get(`${url}${path}`, config)
//         .then((response) => {
//             first_name = response.data["first_name"];
//             console.log(first_name);
//         })
//         .catch(error => console.log("Error: ${error}"));
//         setUsers(data);
//     }
//     return (
//         <ul>
//             {users.map(user => (
//                 <li> 
//                     {user.phone_number}
//                 </li>
//             ))}
//         </ul>
//     );
// }