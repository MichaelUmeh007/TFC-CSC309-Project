// Tabs implementation taken from: https://www.youtube.com/watch?v=WkREeDy2WQ4

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuthHeader } from "react-auth-kit";

import { StyledClassList } from "../../components/ClassList/ClassList.styled";
import ClassItem from "../../components/ClassItem/ClassItem";

import "./index.css";

/**
 * Increments the date passed in by a specific amount
 * @param {*} date 
 * @param {*} inc 
 * @returns 
 */
function incrementLoopingDate (date, inc) {
  let mo = date.getMonth();

  // If the date's month isn't the same after the increment, return it
  date.setDate(date.getDate() + inc);
  if (date.getMonth() !== mo) {
    date.setMonth(mo);
  }

  return date;
}

// Class List Component
const ClassList = (props) => {
    // If there's no classes, just render a message notifying user of this
    if (props.classes === []) {
        return (<p>No Classes scheduled for this day.</p>);
    }

    // TODO: Should probably add a button to ClassItem (Enrol for studio's schedule, Drop for user's schedule)
    <StyledClassList>
        {props.classes.map(singleClass => 
                <ClassItem 
                    key={singleClass.id}
                    name={singleClass.name}
                    coach={singleClass.coach}
                    studio_name={singleClass.studio_name}
                    start_datetime={singleClass.start_datetime}
                    end_datetime={singleClass.end_datetime}
                    num_attending={singleClass.num_attending}/>
            )}
    </StyledClassList>
}

// Tab Button Component
const TabButton = (props) => {
    return (
        <button
            className={props.toggleState === props.id ? "tabs active-tabs" : "tabs"}
            onClick={() => props.toggleTab(props.id)}>
            <span className="tabTitle">{props.date}</span>
        </button>
    );
}

// Content for class schedule component
const ContentDiv = (props) => {
    return (
        <div className={props.toggleState === props.id ? "content  active-content" : "content"}>
            <ClassList />
        </div>
    );  
}

// Main Component
const ScheduleTabs = (props) => {
    // React auth kit 
    const authheader = useAuthHeader();

    // State to keep track of which tab is currently toggled (open).
    const [toggleState, setToggleState] = useState(1);
    // Function to toggle the currently open tabe
    const toggleTab = (index) => {
        setToggleState(index);
    };

    // State that keeps track of the classes for this studio
    const [allClasses, setAllClasses] = useState([]);

    // Get the current date, and then generate tabs corresponding to the next week
    const tabs = [];
    for (let i = 1; i <= 7; i++) {
        // Get the current date and increment the day by i - 1
        let day = incrementLoopingDate(new Date(), i - 1);
        const tab = {
            id: i,
            date: day
        }
        tabs.push(tab);
    }

    // TODO: Make a request to get a studio's class schedule
    // Console.log the output before working it so we know what we're expecting
    const getClassesForStudio = async () => {
        // TODO: Figure out how to get all pages later - make a request for all pages
        // const url = `http://localhost:8000/studios/${props.studioId}/classes/schedule/`;
        const url = `http://localhost:8000/studios/3/classes/schedule/`;
        const config = {
            headers: {
                "Content-Type": "application/json", 
                Authorization: `${authheader()}`,
                withCredentials: false
            }
        }
        
        // Make a request to the server, store all the list of class occurrences that are returned
        const {data} = await axios.get(url, config);
        setAllClasses(data.results);
    }

    // This could be changed for if we need to paginate (dependency on page number)
    useEffect(() => {
        getClassesForStudio();    
    });
    

    return (
        <div className="container">
            <div className="bloc-tabs">
                {tabs.map((tab) => 
                    <TabButton key={tab.id} 
                            id={tab.id} 
                            toggleState={toggleState} 
                            toggleTab={toggleTab} 
                    />
                )}
            </div>
            <div className="content-tabs">
                {tabs.map(tab =>
                <ContentDiv key={tab.id} 
                            id={tab.id}
                            classes={allClasses.filter((c) => {
                                return c.start_datetime.day === tab.date.day;
                            })}
                            toggleState={toggleState}  
                />)}
            </div>
        </div>
    );
}

export default ScheduleTabs;