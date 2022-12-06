import {
  StyledBody,
  Row,
  Column,
  StyledH2,
  MembershipPerk,
  StyledH3,
  StyledSpan,
} from "./Subscriptions.styles";

// styled components

const Subscriptions = () => {
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

      {/* TODO: create a hook that stores the state of the user's subscription, with initial value from an API call*/}
      {/* TODO: check the state of the subscription, change  the message accordingly */}
      <NoMembershipGreeting style={{ textAlign: "center" }} />

      {/* two column layout for subscriptions */}
      <Row>
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

            {/* perks */}
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
        </Column>
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
