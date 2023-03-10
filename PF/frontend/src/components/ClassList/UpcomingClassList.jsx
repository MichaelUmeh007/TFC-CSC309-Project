import React, { useEffect, useState } from "react";
import { StyledClassList } from "./ClassList.styled";
import ClassItem from "../ClassItem/ClassItem";
import axios from "axios";
import { useAuthHeader } from "react-auth-kit";

var today = new Date();

const url = "http://127.0.0.1:8000";
const path = "/accounts/profile/classes/";

function App(props) {
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
            var appData = response.data["results"];
            var today = new Date();
            var filteredAppData = appData.filter(({
                start_datetime
            }) => (new Date(start_datetime) >= today) );
            
            setPost(filteredAppData);
        });
    }, []);

    if (post == null) {
        console.log(post);
        return (<p>You aren't enrolled in any classes! Start enrolling and you will see your classes appear here.</p>);
    }

    return (
        <StyledClassList>
            {post.map(singleClass => 
                <ClassItem 
                    key={singleClass.id}
                    name={singleClass.name}
                    coach={singleClass.coach}
                    studio_name={singleClass.studio_name}
                    start_datetime={singleClass.start_datetime}
                    end_datetime={singleClass.end_datetime}
                    num_attending={singleClass.num_attending}
                    parent_class={singleClass.parent_class}
                    action={"Drop"}
                    actionHandler={props.dropBtnHandler}/>
            )}
        </StyledClassList>
    );
}

export default App;