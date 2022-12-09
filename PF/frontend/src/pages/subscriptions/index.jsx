import {
  StyledBody,
  Row,
  Column,
  StyledH2,
  MembershipPerk,
  StyledH3,
  StyledSpan,
  StyledButton,
  FineText,
  FineTextContainer,
  CancellationDiv,
} from "./Subscriptions.styles";
import { useState, useEffect } from "react";
import { Modal } from "../../components/Modal";
import { GlobalStyle } from "../../globalStyles";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";
import axios from "axios";
import { useAuthHeader } from "react-auth-kit";

const Subscriptions = () => {
  /* TODO: create a hook that stores the state of the user's subscription, with initial value from an API call*/

  //  state for monthly modal
  const [showMonthlyModal, setshowMonthlyModal] = useState(false);
  // open modal function
  const openMonthlyModal = () => {
    setshowMonthlyModal((prev) => !prev);
  };

  // state for yearly modal
  const [showYearlyModal, setShowYearlyModal] = useState(false);
  // open modal function
  const openYearlyModal = () => {
    setShowYearlyModal((prev) => !prev);
  };

  //state for cancel modal
  const [showCancelModal, setShowCancelModal] = useState(false);
  // open modal function
  const openCancelModal = () => {
    setShowCancelModal((prev) => !prev);
  };

  // state for user subscription
  const [userSub, setUserSub] = useState("none");

  // auth stuff
  const authheader = useAuthHeader();

  // function to get user subscription
  const getSub = async () => {
    const response = await axios.get(
      "http://127.0.0.1:8000/subscriptions/my-subscription",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${authheader()}`,
        },
        withCredentials: false,
      }
    );
    console.log(response.data);
  };
  //useEffect to set the initial state of the user subscription
  useEffect(() => {
    getSub();
  }, []);

  // join monthly button handler
  const handleMonthlySub = () => {
    // TODO: MAKE API CALLS
    // make the API call to change subscription to monthly
    // handle the credit card + credit card expired + already subscribed case by
    // if successful register, call the mysubscription API call, then call setUserSubscription (or whatever) to whatever the API call returns and return a success message
    notifySubscriptionSuccess("Sucessfully Subscribed!");
    setUserSub("monthly");
  };

  // join yearly button handler
  const handleYearlySub = () => {
    // TODO: MAKE API CALLS
    // make the API call to change subscription to yearly
    // handle the credit card + credit card expired + already subscribed case by calling notify
    // if successful register, call the mysubscription API call, then call setUserSubscription (or whatever) to whatever the API call returns and return a success message
    notifyError("youre mom");
  };

  // cancel button handler
  const handleCancelSub = () => {
    // TODO: make cancel api call
    // error handling: user doesn't have a subscription
    // if successful, call the mysubscription API call and setState to what it returns (none), return success message
    notifySubscriptionSuccess("Sucessfully Cancelled Membership!");
    setUserSub("none");
  };

  // render for message at the top
  let userSubMessage;

  if (userSub === "none") {
    userSubMessage = (
      <StyledH2 className="membership-msg">Select Your TFC Membership</StyledH2>
    );
  } else if (userSub === "monthly") {
    userSubMessage = (
      <StyledH2 className="membership-msg">Your Membership: Monthly</StyledH2>
    );
  } else if (userSub === "yearly") {
    userSubMessage = (
      <StyledH2 className="membership-msg">Your Membership: Yearly</StyledH2>
    );
  }

  // toast notifications
  const notifySubscriptionSuccess = (successMsg) =>
    toast.success(successMsg, {
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
      {userSubMessage}
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
              {/* actual modal pop up is at bottom */}
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
      <FineTextContainer>
        <p>
          When subscribing to your first membership, you will be charged
          recurringly for the period you selected, starting today, and for every
          month/year following the current date & time. When updating your
          membership, the price changes will take place after the current
          pay-period.
        </p>
      </FineTextContainer>
      <StyledH2 className="cancel-msg">Cancel Your Subscription</StyledH2>
      <CancellationDiv style={{ display: "flex" }}>
        <div
          className="cancellation-text"
          style={{ width: "75%", height: "100%" }}
        >
          <p style={{ position: "absolute", left: "5%" }}>
            We're sad to see you go but we understand.
            <br></br> <br></br> <br></br>
            All your classes past your last payment date will be cancelled.
            <br></br> <br></br> <br></br>
            You can continue using our amenties and attending your classes until
            the end <br></br>of your pay-period.
            <br></br> <br></br> <br></br>
            Thank you for being a part of TFC!
          </p>
        </div>
        <div
          className="cancellation-button"
          style={{
            width: "25%",
            height: "25%",
            position: "absolute",
            top: "37.5%",
            left: "75%",
            textAlign: "left",
          }}
        >
          {/* modal */}
          <div className="modal">
            <StyledButton className="cancel-button" onClick={openCancelModal}>
              Cancel Membership
            </StyledButton>
          </div>
        </div>
      </CancellationDiv>

      {/* monthly modal */}
      <Modal
        showModal={showMonthlyModal}
        setShowModal={setshowMonthlyModal}
        modalMSG={
          "You are subscribing to a monthly membership for $14.99/month."
        }
        joinFunction={handleMonthlySub}
        confirmMsg={"Sign up"}
      />

      {/* yearly modal */}
      <Modal
        showModal={showYearlyModal}
        setShowModal={setShowYearlyModal}
        modalMSG={
          "You are subscribing to a monthly membership for $14.99/month."
        }
        joinFunction={handleYearlySub}
        confirmMsg={"Sign up"}
      />
      {/* cancellation modal */}
      <Modal
        showModal={showCancelModal}
        setShowModal={setShowCancelModal}
        modalMSG={"Are you sure you want to cancel your TFC membership?"}
        joinFunction={handleCancelSub}
        confirmMsg={"Yes, Cancel"}
      />
    </StyledBody>
  );
};
