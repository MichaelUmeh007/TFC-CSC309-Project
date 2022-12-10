// Tabs implementation taken from: https://www.youtube.com/watch?v=WkREeDy2WQ4

import React, { useState, useEffect } from "react";
import axios from "axios";
import dateFormat from "dateformat";
import { useAuthHeader } from "react-auth-kit";

import { StyledClassList } from "../../components/ClassList/ClassList.styled";
import ClassItem from "../../components/ClassItem/ClassItem";
import { Modal } from "../../components/Modal";

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
    if (props.classes.length === 0) {
        return (<p>No Classes scheduled for this day.</p>);
    }

    // TODO: Should probably add a button to ClassItem (Enrol for studio's schedule, Drop for user's schedule)
    return (
        <StyledClassList>
            {props.classes && props.classes.map(singleClass => 
                    <ClassItem 
                        key={singleClass.id}
                        id={singleClass.id}
                        name={singleClass.name}
                        coach={singleClass.coach}
                        studio_name={singleClass.studio_name}
                        start_datetime={singleClass.start_datetime}
                        end_datetime={singleClass.end_datetime}
                        num_attending={singleClass.num_attending}
                        parent_class={singleClass.parent_class}
                        action={"enrol"}
                        actionHandler={props.enrolBtnHandler}/>
            )}
        </StyledClassList>
    );
}

// Tab Button Component
const TabButton = (props) => {
    return (
        <button
            key={props.id}
            className={props.toggleState === props.id ? "tabs active-tabs" : "tabs"}
            onClick={() => props.toggleTab(props.id)}>
            <span className="tabTitle-schedule">{dateFormat(props.date.toString(), "ddd mmm d, yyyy")}</span>
        </button>
    );
}

// Content for class schedule component
const ContentDiv = (props) => {
    return (
        <div key={props.id} className={props.toggleState === props.id ? "content  active-content" : "content"}>
            <ClassList classes={props.classes} enrolBtnHandler={props.enroBtnHandler} />
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

    // STATE FOR TABS
    // Get the current date, and then generate tabs corresponding to the next week
    const [tabs, setTabs] = useState(null);
    useEffect(() => {
        const newTabs = [];
        for (let i = 1; i <= 7; i++) {
            // Get the current date and increment the day by i - 1
            let day = incrementLoopingDate(new Date(), i - 1);
            const tab = {
                id: i,
                date: day
            }
            newTabs.push(tab);
        }
        setTabs(newTabs);
    }, []);
    
    // STATE FOR CLASSES
    const [allClasses, setAllClasses] = useState(null);
    const getClassesForStudio = async () => {
        // TODO: Figure out how to get all pages later - make a request for all pages
        const url = `http://localhost:8000/studios/${props.studioId}/classes/schedule/`;
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
    }, [tabs]);

    const isRightDay = (c, tab) => {
        const milliseconds = Date.parse(c.start_datetime);
        const classDate = new Date(milliseconds);
        return (classDate.getDate() === tab.date.getDate()) && (classDate.getMonth() === tab.date.getMonth());
    }

    // Function for filtering dates
    const classFilter = (tab) => {
        if (allClasses) {
            const validClasses = allClasses.filter(c => isRightDay(c, tab));
            return validClasses;
        } 
    }

    // STATE AND OPERATIONS FOR MODAL
    const [showModal, setShowModal] = useState(false);
    const [enrolMessage, setEnrolMessage] = useState("");
    const okHandler = () => {
        setShowModal(false);
    }

    const [enrollments, setEnrollments] = useState(null);
    const [error, setError] = useState(null);
    const enrolInClass = async (class_id, date) => {
        const url = `http://localhost:8000/studios/${props.studioId}/classes/${class_id}/enrollment/`;
        const config = {
            headers: {
                "Content-Type": "application/json", 
                Authorization: `${authheader()}`,
                withCredentials: false
            }
        }
        
        const request_data = {
            action: "enrol",
            all: "false",
            dates: [date.toString()]
        }
        
        // Make a request to the server, store all the list of class occurrences that are returned
        try {
            const {data} = await axios.post(url, JSON.stringify(request_data), config);
            console.log(data.successes);
            if (data.successes !== []) {
                setEnrollments("yessss");
            } else {
                setEnrolMessage(null);
            }
        } catch (err) {
            setError({error: "Something went wrong"});
        }
        
    }

    const openModalHandler = async (classId, date) => {
        setShowModal(true);

        // Make the axios request to enrol
        enrolInClass(classId, date);
    }

    useEffect(() => {
         // If successful
        if (enrollments) {
            setEnrolMessage("You have successfully enrolled in this class!");
        } else {
            setEnrolMessage("We couldn't enrol you, you're either already enrolled or we're at full capacity!");
        }

        if (error) {
            setEnrolMessage("Sorry, you can't enrol without a subscription!");
        } 
    }, [enrollments, error]);


    return (
        <div className="container-schedule">
            <Modal
                showModal={showModal}
                setShowModal={setShowModal}
                modalMSG={enrolMessage}
                joinFunction={okHandler}
                confirmMsg={"OK"}
            />
            <div className="bloc-tabs">
                {allClasses && tabs.map((tab) => 
                    <TabButton 
                            key={tab.id} 
                            id={tab.id} 
                            date={tab.date}
                            toggleState={toggleState} 
                            toggleTab={toggleTab} 
                    />
                )}
            </div>
            <div className="content-tabs">
                {allClasses && tabs.map(tab =>
                <ContentDiv key={tab.id} 
                            id={tab.id}
                            classes={classFilter(tab)}
                            toggleState={toggleState} 
                            enroBtnHandler={openModalHandler} 
                />)}
            </div>
        </div>
    );
}

export default ScheduleTabs;