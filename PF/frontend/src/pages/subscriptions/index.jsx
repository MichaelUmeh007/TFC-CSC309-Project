import {
  StyledBody,
  Row,
  Column,
  StyledH2,
  MembershipPerk,
  StyledH3,
  StyledSpan,
  StyledButton,
} from "./Subscriptions.styles";
import { useState } from "react";
import { Modal } from "../../components/Modal";
import { GlobalStyle } from "../../globalStyles";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./subscriptions.styles.css";

const Subscriptions = () => {
  // toast notifications
  const notifySubscriptionSuccess = () =>
    toast.success("Successfully Subscribed!", {
      position: "bottom-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  const notifyError = (errorMsg) => {
    toast.error(errorMsg, {
      position: "bottom-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };

  const notify = () => {
    toast("hello");
  };

  /* TODO: create a hook that stores the state of the user's subscription, with initial value from an API call*/

  //  state for monthly modal
  const [showMonthlyModal, setshowMonthlyModal] = useState(false);
  // open modal function
  const openMonthlyModal = () => {
    setshowMonthlyModal((prev) => !prev);
  };
  // join monthly button handler
  const handleMonthlySub = () => {
    // TODO: MAKE API CALLS
    // make the API call to change subscription to monthly
    // handle the credit card + credit card expired + already subscribed case by
    // if successful register, call the mysubscription API call, then call setUserSubscription (or whatever) to whatever the API call returns and return a success message
    notifySubscriptionSuccess();
  };

  // state for yearly modal
  const [showYearlyModal, setShowYearlyModal] = useState(false);
  // open modal function
  const openYearlyModal = () => {
    setShowYearlyModal((prev) => !prev);
  };

  // join yearly button handler
  const handleYearlySub = () => {
    // TODO: MAKE API CALLS
    // make the API call to change subscription to yearly
    // handle the credit card + credit card expired + already subscribed case by calling notify
    // if successful register, call the mysubscription API call, then call setUserSubscription (or whatever) to whatever the API call returns and return a success message
    notifyError("youre mom");
  };

  return (
    <StyledBody>
      <h1
        style={{
          textDecoration: "none",
          margin: "40px",
          fontWeight: "bold",
          fontFamily: "Alexandria, sans-serif",
          fontSize: "4em",
        }}
      >
        Subscriptions
      </h1>
      {/* this needs to be here so toast notifications show up */}
      <ToastContainer />
      {/* TODO: check the state of the subscription, change  the message accordingly */}
      <NoMembershipGreeting style={{ textAlign: "center" }} />

      {/* two column layout for subscriptions */}
      <Row>
        {/* monthly column */}
        <Column style={{ backgroundColor: "lightgrey" }}>
          <StyledH3>Monthly</StyledH3>
          <div style={{ textAlign: "center" }}>
            <StyledSpan className="price-currency">$</StyledSpan>
            <StyledSpan className="price-dollar">19</StyledSpan>
            <StyledSpan className="price-cents">.99</StyledSpan>
            <h4
              style={{
                marginTop: "0px",
                fontFamily: "Alexandria, sans-serif",
                fontWeight: "normal",
              }}
            >
              every month
            </h4>
            {/* modal for monthly sub */}

            <div className="modal">
              <StyledButton
                className="monthly-button"
                onClick={openMonthlyModal}
              >
                Join Now
              </StyledButton>
              {/* TODO: add monthly button handler to be passed in */}
              <Modal
                showModal={showMonthlyModal}
                setShowModal={setshowMonthlyModal}
                modalMSG={"You are subscribing to a monthly membership:"}
                joinFunction={handleMonthlySub}
              />
            </div>

            {/* perks */}
            <div className="perks">
              <MembershipPerk className="monthly-perk">
                &#10004; Access to all our locations
              </MembershipPerk>
              <MembershipPerk className="monthly-perk">
                &#10004; Access to all our amenities
              </MembershipPerk>
              <MembershipPerk className="monthly-perk">
                &#10004; Access to all our classes
              </MembershipPerk>
              <MembershipPerk className="monthly-perk">
                &#x2717; <s>4.5 free months on us!</s>
              </MembershipPerk>
            </div>
          </div>
        </Column>

        {/* yearly column */}
        <Column style={{ backgroundColor: "crimson", color: "white" }}>
          <StyledH3>Yearly</StyledH3>
          <div style={{ textAlign: "center" }}>
            <StyledSpan className="price-currency">$</StyledSpan>
            <StyledSpan className="price-dollar">149</StyledSpan>
            <StyledSpan className="price-cents">.99</StyledSpan>
            <h4
              style={{
                marginTop: "0px",
                fontFamily: "Alexandria, sans-serif",
                fontWeight: "normal",
              }}
            >
              every year
            </h4>

            {/* modal */}
            <div className="modal">
              <StyledButton className="yearly-button" onClick={openYearlyModal}>
                Join Now
              </StyledButton>
              {/* TODO: add yearly button handler to be passed in */}
              <Modal
                showModal={showYearlyModal}
                setShowModal={setShowYearlyModal}
                modalMSG={"You are subscribing to a yearly membership:"}
                joinFunction={handleYearlySub}
              />
            </div>

            {/* perks */}
            <MembershipPerk className="yearly-perk">
              &#10004; Access to all our locations
            </MembershipPerk>
            <MembershipPerk className="yearly-perk">
              &#10004; Access to all our amenities
            </MembershipPerk>
            <MembershipPerk className="yearly-perk">
              &#10004; Access to all our classes
            </MembershipPerk>
            <MembershipPerk className="yearly-perk">
              &#10004; 4.5 free months on us!
            </MembershipPerk>
          </div>
        </Column>
      </Row>
      <Row>
        <p>sup baby girl</p>
      </Row>
    </StyledBody>
  );
};
// helper function that will take in the user's subscription data and print it out
function MembershipGreeting(props) {
  return <StyledH2 className="membership-msg">Your Membership: ...</StyledH2>;
  // props.subscription or something will be passed in and then printed
}
function NoMembershipGreeting() {
  return (
    <StyledH2 className="membership-msg">Select Your TFC Membership</StyledH2>
  );
}

export default Subscriptions;
