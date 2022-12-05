import styled from "styled-components";

const StyledBody = styled.body`
  margin-top: 7%;
`
const StyledH2 = styled.h2`
`
// helper function that will take in the user's subscription data and print it out
function MembershipGreeting(props){
  return <h2>Your Membership: ...</h2> 
  // props.subscription or something will be passed in and then printed
}
function NoMembershipGreeting(){
  return <h2>Select Your TFC Membership</h2>
}
function Subscriptions() {
  return (
    <StyledBody>
      <h1 style={{ textDecoration: 'none', margin: '40px', fontWeight: 'bold', fontFamily: 'Alexandria, sans-serif', fontSize: '3em'}}>Subscriptions</h1>

      {/* get the user's subscription from the backend */}
      {/* TODO: check if the user currently has a subscription, if so print */}
      <NoMembershipGreeting style={{ textAlign: 'center' }}/>
      
    </StyledBody>
    );
}


export default Subscriptions;