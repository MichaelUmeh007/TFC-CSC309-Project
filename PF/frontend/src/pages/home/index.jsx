import React, {useEffect, useState} from "react";
import axios from "axios";

import * as Styles from "./Home.styles";
import FullNameText from "../../components/Fullname/Fullname";
import ClassTabs from "./ClassTabs";
import SubscriptionPanel from "./SubscriptionPanel";
import "./index.css"
import { Modal } from "../../components/Modal";
import { useAuthHeader } from "react-auth-kit";

// Current Time -> Greeting Code achieved from: https://stackoverflow.com/questions/13244939/javascript-to-output-text-based-on-users-current-time
var today = new Date();
var curHr = today.getHours();
var greetingTime = "";
if (curHr < 12) {
  greetingTime = "morning";
} else if (curHr < 18) {
  greetingTime = "afternoon";
} else {
  greetingTime = "evening";
}

function Home() {
  // React auth kit 
    const authheader = useAuthHeader();

    // STATE AND OPERATIONS FOR MODAL
    const [showModal, setShowModal] = useState(false);
    const [dropMessage, setDropMessage] = useState("");
    const okHandler = () => {
        setShowModal(false);
    }

    const [drops, setDrops] = useState(null);
    const [error, setError] = useState(null);
    const dropClass = async (class_id, date, studio_id) => {
      // Now make the final request to drop the class
      const url = `http://localhost:8000/studios/${studio_id}/classes/${class_id}/enrollment/`;
      const config = {
          headers: {
              "Content-Type": "application/json", 
              Authorization: `${authheader()}`,
              withCredentials: false
          }
      }
        
        const request_data = {
            action: "drop",
            all: "false",
            dates: [date.toString()]
        }
        
        // Make a request to the server, store all the list of class occurrences that are returned
        try {
            const {data} = await axios.post(url, JSON.stringify(request_data), config);
            console.log(data.successes);
            if (data.successes !== []) {
                setDrops("yessss");
            } else {
                setDrops(null);
            }
        } catch (err) {
            setError({error: "Something went wrong"});
        }
        
    }

    const openModalHandler = async (classId, date, studio_id) => {
        setShowModal(true);

        // Make the axios request to enrol
        dropClass(classId, date, studio_id);
    }

    useEffect(() => {
        // If successful
        if (drops) {
            setDropMessage("You have successfully dropped this class!");
        } else {
            setDropMessage("Sorry, we can't let you drop this one!");
        }

        if (error) {
            setDropMessage("Sorry, you can't drop without a subscription!");
        } 
    }, [drops, error]);

  return (
    <Styles.StyledBody>
      <Styles.StyledHeaderText>Good { greetingTime } <FullNameText/>!</Styles.StyledHeaderText>
      <Styles.StyledContentBodyContainer>
        <div className="div1">
          <ClassTabs dropBtnHandler={openModalHandler} />
          
        </div>
        <div className="div2">
          <SubscriptionPanel/>
        </div>
        <Modal
            styles={"z-index: 10000"}
            showModal={showModal}
            setShowModal={setShowModal}
            modalMSG={dropMessage}
            joinFunction={okHandler}
            confirmMsg={"OK"}
        />
        <div className="clear"></div>
      </Styles.StyledContentBodyContainer>
    </Styles.StyledBody>
  );
}

export default Home;