import styled from "styled-components";
import StyledLogo from "../../components/logo";
import StyledLink from "../../components/link";
import logo from "../../../src/TFC_logo.png"
// import Section from "../../components/section";
// import { Link } from 'react-router-dom';
// import background from "../../../src/landing_page_bg2.png"
import sanitizationIcon from "../../../src/health_icon.png"
import coachesIcon from "../../../src/coaches_icon.png"
import accessibilityIcon from "../../../src/shoes_icon.png"
import './landing.styles.css';

const StyledBody = styled.body`
    padding-top: 20px;
    padding: 0px 20%;
`

const StyledLogoContainer = styled.div`
    margin: auto;
    width: 100%;
`

const StyledHeaderContainer = styled.div`
    margin: 0;
    padding: 0;
    width: auto;
    height: auto;
`

const StyledHeaderText = styled.h1`
    color: black;
    text-decoration: none; 
    margin: 20px;
    font-weight: bold;
    font-family: 'Alexandria', sans-serif;
    text-align: center;
    font-size: 4em;
`

const StyledHorizontalLine = styled.hr`
    position: relative;
    border: none;
    background: black;
    height: 3px;
    margin: 0px 10%;
    margin-bottom: 20px;
`
const StyledParagraph = styled.p`
    color: black;
    text-decoration: none;
    margin: 0px 20%;
    // margin-right: 40%;
    font-family: 'Alexandria', sans-serif;
    font-weight: 200;
    font-size: 2em;
    text-align: center;
`

const StyledIcon = styled.img`
    width: 100px;
    height: auto;
    margin: auto;
`

const StyledContentBodyContainer = styled.div`
    margin: 10px 0px;
    padding: 0;
    width: auto;
    height: auto;
`

const StyledDescriptorTitle = styled.p`
    color: black;
    text-decoration: none;
    margin: 20px 0px;
    font-family: 'Alexandria', sans-serif;
    font-weight: 400;
    font-size: 1.25em;
    text-align: center;
`

const StyledDescriptorText = styled.p`
    color: black;
    text-decoration: none;
    margin: 0px;
    font-family: 'Alexandria', sans-serif;
    font-weight: 300;
    font-size: 1.25em;
    text-align: center;
`
const StyledSignupButton = styled.button`
  background-color: black;
  color: white;
  font-size: 20px;
  padding: 10px 60px;
  border-radius: 5px;
  margin: 10px 0px;
  cursor: pointer;
`

function Landing() {
    return (
        // <StyledBody style={{ backgroundImage: `url(${background})`, backgroundSize: "100%, auto, contain", backgroundRepeat: "no-repeat"}}>
        <StyledBody>
            <StyledLogoContainer>
                <StyledLogo src={logo} alt="Logo" display="block" mleft="auto" mright="auto" width="auto" height="100px"/>
            </StyledLogoContainer>
            <StyledHeaderContainer>
                <StyledHeaderText>
                    Toronto's #1 Rated Fitness Club
                </StyledHeaderText>
                <StyledHorizontalLine></StyledHorizontalLine>
                <StyledParagraph>Not currently a member?
                </StyledParagraph>
                <StyledParagraph>Subscription plans start at
                    $(price)/month.
                </StyledParagraph>
                <StyledParagraph> Sign-up now and get <span style={{ fontWeight: '400' }}>1 month free</span> on us!</StyledParagraph>
                
            </StyledHeaderContainer>
            <StyledContentBodyContainer>
            <div style={{ display: "grid", gridTemplateColumns: "auto auto auto", padding: "10px" }}>
                <div style={{ textAlign: "center" }}><StyledIcon alt="Gym Icon" src={accessibilityIcon}/></div>
                <div style={{ textAlign: "center" }}><StyledIcon alt="Gym Icon" src={sanitizationIcon}/></div>
                <div style={{ textAlign: "center" }}><StyledIcon alt="Gym Icon" src={coachesIcon}/></div>  
                <div style={{ textAlign: "center" }}><StyledDescriptorTitle>Access to Everything</StyledDescriptorTitle></div>
                <div style={{ textAlign: "center" }}><StyledDescriptorTitle>Sanitation is Key</StyledDescriptorTitle></div>
                <div style={{ textAlign: "center" }}><StyledDescriptorTitle>Personalized Coaches</StyledDescriptorTitle></div>
                <div style={{ textAlign: "center", margin: "0px 20px"}}>
                    <StyledDescriptorText style={{ textAlign: "center", margin: "0px 20px"}}>
                        We understand that finding time in your day can be hard. With access to all of our
                        studios within the Greater Toronto Area and a wide-range of personalized classes, we
                        allow you to be as flexible as you wish!
                    </StyledDescriptorText>
                </div>
                <div style={{ textAlign: "center", margin: "0px 20px" }}>
                    <StyledDescriptorText>
                        Cleaning up after a workout takes time and effort out of your day. We've
                        got you covered! Our studio rooms and equipment are sanitized and disinfected
                        by staff members by the hour to ensure you can workout with that peace of mind.
                    </StyledDescriptorText>
                </div>
                <div style={{ textAlign: "center", margin: "0px 20px" }}>
                    <StyledDescriptorText>
                        Our coaches are trained to not only motivate you on your fitness journey, but to also
                        help guide you with nutritional requirements and future planning.
                    </StyledDescriptorText>
                </div>
            </div>
            </StyledContentBodyContainer>
            <StyledContentBodyContainer>
                <div>
                    <div style={{ textAlign: "center", margin: "0px 20px" }}>
                        <StyledLink to={'/signup'}>
                            <StyledSignupButton className="signup"> JOIN NOW </StyledSignupButton>
                        </StyledLink>
                    </div>
                    <div style={{ textAlign: "center", margin: "0px 20px" }}>
                        <StyledDescriptorText>Already a member?</StyledDescriptorText>
                        <StyledLink className="login" to={'/login'} style={{ color: "blue", fontFamily: "'Alexandria', sans-serif", fontWeight: "300", fontSize: "1.25em" }}>
                            Login Here!
                        </StyledLink>
                    </div>
                </div>
            </StyledContentBodyContainer>
        </StyledBody>
    );
}

export default Landing;