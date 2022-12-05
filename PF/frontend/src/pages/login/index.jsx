import StyledForm from "../../components/Common/Form";
import StyledFormContainer from "../../components/Common/FormContainer";
import StyledFormSection from "../../components/Common/FormSection";
import StyledErrorMessage from "../../components/Common/Messages/ErrorMessage";
import StyledInput from "../../components/Common/Input";
import StyledSubmitButton from "../../components/Common/SubmitButton";
import StyledLabel from "../../components/Common/Label";
import StyledLink from "../../components/Common/Link";
import StyledIcon from "../../components/Common/Icon";
import { StyledInstructionMessage } from "../../components/Common/Messages/InstructionMessage/InstructionMessage.styles";
import { useState, useRef, useEffect } from "react";
import {
    faDumbbell,
    faBurger,
    faInfoCircle,
  } from "@fortawesome/free-solid-svg-icons";
  import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const LOGIN_URL = "/api/token";

const headerstyle = {
    marginBottom: "0px",
    marginTop: "0px",
    fontSize: "40px"
}
function Login(){

    const userRef = useRef();
    const errRef = useRef();

    const [username, setUsername] = useState("");
    const [validUsername, setValidUsername] = useState(false);
    const [focusedOnUsername, setUsernameFocus] = useState(false);
  
    const [password, setPassword] = useState("");
    const [validPassword, setValidPassword] = useState(false);
    const [focusedOnPassword, setPasswordFocus] = useState(false);

    // for backend and submission validation
    const [errormessage, setErrorMessage] = useState("");

    useEffect(() => {
    userRef.current?.focus();
    }, []);

    useEffect(() => {
    const result = USER_REGEX.test(username);
    setValidUsername(result);
    }, [username]);

    useEffect(() => {
    const result = PWD_REGEX.test(password);
    setValidPassword(result);
    }, [password]);

    // clearing error message after user change
    useEffect(() => {
    setErrorMessage("");
    }, [username, password]);


  return (
    <StyledFormContainer inputColor="white">

        <StyledFormSection>

        <StyledErrorMessage offscreen={true}>
        </StyledErrorMessage>
        <h1 style={headerstyle}> Login</h1>

            <StyledForm>
                <StyledLabel>
                    Username:
                    <StyledIcon
                        icon={faDumbbell}
                        hide={!validUsername? 1 : 0}
                        valid={validUsername? 1 : 0}    
                    />
                    <StyledIcon
                        icon={faBurger}
                        hide={(validUsername || !username)? 1 : 0}
                        valid={(!(validUsername || !username))? 0 : 1}
                    />
                </StyledLabel>
                <StyledInput
                    type="text"
                    id="username"
                    ref={userRef}
                    autoComplete="off"
                    onChange={(e) => setUsername(e.target.value)}
                    value={username}
                    required
                    onFocus={() => setUsernameFocus(true)}
                    onBlur={() => setUsernameFocus(false)}
                />
                <StyledInstructionMessage offscreen={(focusedOnUsername && username && !validUsername)? 0 : 1}>
                    <StyledIcon icon={faInfoCircle} />
                    <br />
                    4 - 24 characters
                    <br />
                    Begins with a letter <br />
                    Letters, numbers, underscores and hyphens only
                </StyledInstructionMessage>
                <StyledLabel>
                    Password:
                    <StyledIcon
                        icon={faDumbbell}
                        hide={!validPassword? 1 : 0}
                        valid={validPassword? 1 : 0}    
                    />
                    <StyledIcon
                        icon={faBurger}
                        hide={(validPassword || !password)? 1 : 0}
                        valid={(!(validPassword || !password))? 0 : 1}
                    />
                </StyledLabel>
                <StyledInput
                    type="password"
                    id="password"
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    onFocus={() => setPasswordFocus(true)}
                    onBlur={() => setPasswordFocus(false)}
                />
                <StyledInstructionMessage offscreen={(focusedOnPassword && !validPassword && password)? 0 : 1}>
                    <StyledIcon icon={faInfoCircle} />
                    <br />
                    8 - 24 characters
                    <br />
                    Includes an uppercase and lowercase letter,
                    <br />a symbol and a number.
                </StyledInstructionMessage>
                <StyledSubmitButton disabled={!validUsername || !validPassword ? true : false}>
                {" "}
                GET ACTIVE{" "}
                </StyledSubmitButton>
                <br/> 
                Not a member? Join the Movement!
                <br/>
                <span style={{display: "inline-block"}}>
                    <StyledLink margin={"0%"} decor={1} to="/register">Sign up here</StyledLink>
                </span>
            </StyledForm>
        </StyledFormSection>
    </StyledFormContainer>
  );
}

export default Login;
