import StyledForm from "../../components/Common/Form";
import StyledFormContainer from "../../components/Common/FormContainer";
import StyledFormSection from "../../components/Common/FormSection";
import StyledErrorMessage from "../../components/Common/Messages/ErrorMessage";
import StyledInput from "../../components/Common/Input";
import StyledSubmitButton from "../../components/Common/SubmitButton";
import StyledLabel from "../../components/Common/Label";
import StyledLink from "../../components/Common/Link";
const headerstyle = {
    marginBottom: "0px",
    marginTop: "0px",
    fontSize: "40px"
}
function Login(){

  return (
    <StyledFormContainer inputColor="white">

        <StyledFormSection>

        <StyledErrorMessage offscreen={true}>
        </StyledErrorMessage>
        <h1 style={headerstyle}> Login</h1>

            <StyledForm>
                <StyledLabel>
                    Username:
                </StyledLabel>
                <StyledInput
                    type="text"
                />
                <StyledLabel>
                    Password:
                </StyledLabel>
                <StyledInput
                    type="password"
                />
                <StyledSubmitButton>
                    GET ACTIVE
                </StyledSubmitButton>
                <br/> 
                Not a member? Join the Movement!
                <br/>
                <span style={{display: "inline-block"}}>
                    <StyledLink margin={"0%"} decor={true} to="/register">Sign up here</StyledLink>
                </span>
            </StyledForm>
        </StyledFormSection>
    </StyledFormContainer>
  );
}

export default Login;
