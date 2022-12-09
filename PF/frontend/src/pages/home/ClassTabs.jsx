// Tabs implementation taken from: https://www.youtube.com/watch?v=WkREeDy2WQ4

import { useState } from "react";
import "./index.css";
import UpcomingClassList from "../../components/ClassList/UpcomingClassList";
import PastClassList from "../../components/ClassList/PastClassList";

function Tabs() {
  const [toggleState, setToggleState] = useState(1);

  const toggleTab = (index) => {
    setToggleState(index);
  };

  return (
    <div className="container">
      <div className="bloc-tabs">
        <button
          className={toggleState === 1 ? "tabs active-tabs" : "tabs"}
          onClick={() => toggleTab(1)}
        >
          Upcoming Classes
        </button>
        <button
          className={toggleState === 2 ? "tabs active-tabs" : "tabs"}
          onClick={() => toggleTab(2)}
        >
          Past Classes
        </button>
      </div>

      <div className="content-tabs">
        <div
          className={toggleState === 1 ? "content  active-content" : "content"}
        >
          <UpcomingClassList/>
        </div>

        <div
          className={toggleState === 2 ? "content  active-content" : "content"}
        >
          <PastClassList/>
        </div>
      </div>
    </div>
  );
}

export default Tabs;