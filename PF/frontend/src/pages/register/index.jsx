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
import { useNavigate } from "react-router-dom";
import axios from "../../api/axios"
import { useState, useRef, useEffect} from "react";
import {
    faDumbbell,
    faBurger,
    faInfoCircle,
  } from "@fortawesome/free-solid-svg-icons";
import validator from "validator";
import { useIsAuthenticated } from "react-auth-kit";

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const FN_REGEX = /^[A-z][A-z ]{0,23}$/;
const LN_REGEX = /^[A-z][A-z ]{0,23}$/;
const REGISTER_URL = "/accounts/register/";

const headerstyle = {
    marginBottom: "0px",
    marginTop: "0px",
    fontSize: "40px"
}  

function Register(){

    const userRef = useRef();
    const errRef = useRef();

    const [username, setUsername] = useState("");
    const [validUsername, setValidUsername] = useState(false);
    const [focusedOnUsername, setUsernameFocus] = useState(false);
    const [usernameerror, setUsernameErorr] = useState("");

   
    const [password, setPassword] = useState("");
    const [validPassword, setValidPassword] = useState(false);
    const [focusedOnPassword, setPasswordFocus] = useState(false);
    const [passworderror, setPasswordErorr] = useState("");

    const [mpassword, setMPassword] = useState("");
    const [validMPassword, setValidMPassword] = useState(false);
    const [focusedOnMPassword, setMPasswordFocus] = useState(false);

    const [email, setEmail] = useState("");
    const [validEmail, setValidEmail] = useState(false);
    const [focusedOnEmail, setEmailFocus] = useState(false);
    const [emailerror, setEmailErorr] = useState("");

    const [firstname, setFirstname] = useState("");
    const [validFirstname, setValidFirstname] = useState(false);
    const [focusedOnFirstname, setFirstnameFocus] = useState(false);
    const [firstnameerror, setFirstnameErorr] = useState("");
  
    const [lastname, setLastname] = useState("");
    const [validLastname, setValidLastname] = useState(false);
    const [focusedOnLastname, setLastnameFocus] = useState(false);
    const [lastnameerror, setLastnameErorr] = useState("");

    const [address, setAddress] = useState("");
    const [validAddress, setValidAddress] = useState(false);
    const [focusedOnAddress, setAddressFocus] = useState(false);
    const [addresserror, setAddressErorr] = useState("");

    const [phonenumber, setPhonenumber] = useState("");
    const [validPhonenumber, setValidPhonenumber] = useState(false);
    const [focusedOnPhonenumber, setPhonenumberFocus] = useState(false);
    const [phonenumbererror, setPhonenumberErorr] = useState("");

    // after succesful login
    // For redirection after a successful login
    const navigate = useNavigate();
    // add auth to this after its set up to redirect authenticated users to home page when they navigate here
    const isAuthenticated = useIsAuthenticated();

    // error clearing
    function clear_err(){
        setErrorMessage("");
        setUsernameErorr("");
        setPasswordErorr("");
        setEmailErorr("");
        setFirstnameErorr("");
        setLastnameErorr("");
        setPhonenumberErorr("");
        setAddressErorr("");
    }

    // error setting
    function set_err(err_response){
       
        for (const key in err_response){
            
            if (key === "username"){
                setUsernameErorr(err_response[key][0]);
            }
            else if(key === "firstname"){
                setFirstnameErorr(err_response[key][0]);
            }
            else if(key === "last_name"){
                setLastnameErorr(err_response[key][0]);
            }
            else if(key === "email"){
                setEmailErorr(err_response[key][0]);
            }
            else if (key === "password"){
                setPasswordErorr(err_response[key][0]);
            }
            else if (key === "phone_number"){
                setPhonenumberErorr(err_response[key][0]);
            }
            else if (key === "address"){
                setAddressErorr(err_response[key][0]);
            }
            
        }
    }

    // for backend and submission validation
    const [errormessage, setErrorMessage] = useState("");

    // redirect authencicated users
    useEffect(() => {
        if (isAuthenticated()){
            navigate("/");
        }
    })

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

    useEffect(() => {
        const result = PWD_REGEX.test(password);
        setValidPassword(result);
        const matching = password === mpassword;
        setValidMPassword(matching);
      }, [password, mpassword]);

    useEffect(() => {
        const result = FN_REGEX.test(firstname);
        setValidFirstname(result);
    }, [firstname]);

    useEffect(() => {
        const result = LN_REGEX.test(lastname);
        setValidLastname(result);
    }, [lastname]);

    useEffect(() => {
        const result = validator.isEmail(email);
        setValidEmail(result);
    }, [email]);

    useEffect(() => {
        const result = validator.isMobilePhone(phonenumber, ['en-CA'], {strictMode:false});
        setValidPhonenumber(result);
    }, [phonenumber])

    useEffect(()=> {
        const result = address.length > 0;
        setValidAddress(result);
    }, [address])

    // clearing error message after user change
    useEffect(() => {
    clear_err();
    }, [username, password, firstname, lastname, email, address, phonenumber]);



    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // button hacking check
        const v1 = USER_REGEX.test(username);
        const v2 = PWD_REGEX.test(password);
        const v3 = validator.isEmail(email);
        const v4 = FN_REGEX.test(firstname);
        const v5 = LN_REGEX.test(lastname);
        const v6 = address.length > 0;
        const v7 = validator.isMobilePhone(phonenumber, ['en-CA'], {strictMode:false});
    
        if (!v1 || !v2 || !v3 || !v4 || !v5 || !v6 || !v7) {
          setErrorMessage("Invalid Entry. Review Input Fields");
          return;
        }
        // TODO: handle submission here
        try {
          const request_data = {
            username: username,
            first_name: firstname,
            last_name: lastname,
            email: email,
            password: password,
            phone_number: phonenumber,
            address: address,
            
          };
          await axios.post(REGISTER_URL, JSON.stringify(request_data), {
            headers: { "Content-Type": "application/json" },
            withCredentials: false,
          });
    
          // on sucess navigate to login
          // For redirection after a successful login
          navigate("/login")
          
        } catch (err) {
          if (!err?.response) {
            setErrorMessage("No server response, possible maintainance at work");
          } else if (err.response?.status === 400) {
                set_err((err.response.data));
          } else {
            setErrorMessage("Registration Failed");
          }
          errRef.current?.focus();
        }
      };




    return(
        <StyledFormContainer inputColor="#D3D3D3">

        <StyledFormSection>

        <StyledErrorMessage ref={errRef} offscreen={(errormessage.length === 0)}>
            {errormessage}
        </StyledErrorMessage>
        <h1 style={headerstyle}> Sign Up</h1>

            <StyledForm onSubmit={handleSubmit}>

                <StyledLabel htmlFor="username">
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
                <StyledErrorMessage offscreen={(usernameerror.length === 0)? 1 : 0}>
                    {usernameerror}
                </StyledErrorMessage>


                <StyledLabel htmlFor="password">
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
                <StyledErrorMessage offscreen={(passworderror.length === 0)? 1 : 0}>
                    {passworderror}
                </StyledErrorMessage>


                <StyledLabel htmlFor="mpassword">
                    Confirm Password:
                    <StyledIcon
                        icon={faDumbbell}
                        hide={(!validMPassword || !mpassword)? 1 : 0}
                        valid={validMPassword? 1 : 0}    
                    />
                    <StyledIcon
                        icon={faBurger}
                        hide={(validMPassword || !mpassword)? 1 : 0}
                        valid={(!(validMPassword || !mpassword))? 0 : 1}
                    />
                </StyledLabel>
                <StyledInput
                    type="password"
                    id="mpassword"
                    onChange={(e) => setMPassword(e.target.value)}
                    required
                    onFocus={() => setMPasswordFocus(true)}
                    onBlur={() => setMPasswordFocus(false)}
                />
                <StyledInstructionMessage offscreen={(focusedOnMPassword && !validMPassword)? 0 : 1}>
                    <StyledIcon icon={faInfoCircle} />   
                    Passwords do not match.
                </StyledInstructionMessage>


                <StyledLabel htmlFor="eml">
                    Email: 
                    <StyledIcon
                        icon={faDumbbell}
                        hide={(!validEmail)? 1 : 0}
                        valid={validEmail? 1 : 0}    
                    />
                    <StyledIcon
                        icon={faBurger}
                        hide={(validEmail || !email)? 1 : 0}
                        valid={(!(validEmail || !email))? 0 : 1}
                    />
                </StyledLabel>
                <StyledInput
                    type="email"
                    id="eml"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    required
                    onFocus={() => setEmailFocus(true)}
                    onBlur={() => setEmailFocus(false)}
                />
                <StyledInstructionMessage offscreen={(focusedOnEmail && !validEmail && email)? 0 : 1}>
                    <StyledIcon icon={faInfoCircle} />   
                    "someone@example.com"
                </StyledInstructionMessage>
                <StyledErrorMessage offscreen={(emailerror.length === 0)? 1 : 0}>
                    {emailerror}
                </StyledErrorMessage>


                <StyledLabel htmlFor="firstname">
                    First name:
                    <StyledIcon
                        icon={faDumbbell}
                        hide={(!validFirstname)? 1 : 0}
                        valid={validFirstname? 1 : 0}    
                    />
                    <StyledIcon
                        icon={faBurger}
                        hide={(validFirstname || !firstname)? 1 : 0}
                        valid={(!(validFirstname || !firstname))? 0 : 1}
                    />
                </StyledLabel>
                <StyledInput
                    type="text"
                    id="firstname"
                    onChange={(e) => setFirstname(e.target.value)}
                    value={firstname}
                    required
                    onFocus={() => setFirstnameFocus(true)}
                    onBlur={() => setFirstnameFocus(false)}
                />
                <StyledInstructionMessage offscreen={(focusedOnFirstname && !validFirstname)? 0 : 1}>
                    <StyledIcon icon={faInfoCircle} />   
                    <br />
                    1 - 24 characters
                    <br />
                    Must begin with a letter
                    <br />
                    Letters and spaces only
                </StyledInstructionMessage>
                <StyledErrorMessage offscreen={(firstnameerror.length === 0)? 1 : 0}>
                    {firstnameerror}
                </StyledErrorMessage>


                <StyledLabel htmlFor="lastname">
                    Last name:
                    <StyledIcon
                        icon={faDumbbell}
                        hide={(!validLastname)? 1 : 0}
                        valid={validLastname? 1 : 0}    
                    />
                    <StyledIcon
                        icon={faBurger}
                        hide={(validLastname || !lastname)? 1 : 0}
                        valid={(!(validLastname || !lastname))? 0 : 1}
                    />
                </StyledLabel>
                <StyledInput
                    type="text"
                    id="lastname"
                    onChange={(e) => setLastname(e.target.value)}
                    value={lastname}
                    required
                    onFocus={() => setLastnameFocus(true)}
                    onBlur={() => setLastnameFocus(false)}
                />
                <StyledInstructionMessage offscreen={(focusedOnLastname && !validLastname)? 0 : 1}>
                    <StyledIcon icon={faInfoCircle} />   
                    <br />
                    1 - 24 characters
                    <br />
                    Must begin with a letter
                    <br />
                    Letters and spaces only
                </StyledInstructionMessage>
                <StyledErrorMessage offscreen={(lastnameerror.length === 0)? 1 : 0}>
                    {lastnameerror}
                </StyledErrorMessage>


                <StyledLabel htmlFor="phonenumber">
                    Phone number: 
                    <StyledIcon
                        icon={faDumbbell}
                        hide={(!validPhonenumber)? 1 : 0}
                        valid={validPhonenumber? 1 : 0}    
                    />
                    <StyledIcon
                        icon={faBurger}
                        hide={(validPhonenumber || !phonenumber)? 1 : 0}
                        valid={(!(validPhonenumber || !phonenumber))? 0 : 1}
                    />
                </StyledLabel>
                <StyledInput
                    type="text"
                    id="phonenumber"
                    onChange={(e) => setPhonenumber(e.target.value)}
                    value={phonenumber}
                    required
                    onFocus={() => setPhonenumberFocus(true)}
                    onBlur={() => setPhonenumberFocus(false)}
                />
                <StyledInstructionMessage offscreen={(focusedOnPhonenumber && !validPhonenumber && phonenumber)? 0 : 1}>
                    <StyledIcon icon={faInfoCircle} /> 
                    <br/> 
                    Enter a valid phone number (e.g. (506) 234-5678) or a number with an international call prefix.
                </StyledInstructionMessage>
                <StyledErrorMessage offscreen={(phonenumbererror.length === 0)? 1 : 0}>
                    {phonenumbererror}
                </StyledErrorMessage>


                <StyledLabel htmlFor="address">
                    Address: 
                    <StyledIcon
                        icon={faDumbbell}
                        hide={(!validAddress)? 1 : 0}
                        valid={validAddress? 1 : 0}    
                    />
                    <StyledIcon
                        icon={faBurger}
                        hide={(validAddress || !address)? 1 : 0}
                        valid={(!(validAddress || !address))? 0 : 1}
                    />
                </StyledLabel>
                <StyledInput
                    type="text"
                    id="address"
                    onChange={(e) => setAddress(e.target.value)}
                    value={address}
                    required
                    onFocus={() => setAddressFocus(true)}
                    onBlur={() => setAddressFocus(false)}
                />
                <StyledInstructionMessage offscreen={(focusedOnAddress && !validAddress)? 0 : 1}>
                    <StyledIcon icon={faInfoCircle} /> 
                    <br/> 
                    Please enter a well formatted address e.g. 
                    <br/>
                    XXX Street Name St., City, Province Code
                </StyledInstructionMessage>
                <StyledErrorMessage offscreen={(addresserror.length === 0)? 1 : 0}>
                    {addresserror}
                </StyledErrorMessage>


                <StyledSubmitButton disabled={!validUsername || !validPassword || !validEmail ||
                    !validFirstname || !validLastname || !validPhonenumber || !validAddress ? true : false}>
                {" "}
                JOIN THE MOVEMENT{" "}
                </StyledSubmitButton>
                <br/> 
                Already a member? Get Active!
                <br/>
                <span style={{display: "inline-block"}}>
                    <StyledLink margin={"0%"} decor={1} to="/login">Login here</StyledLink>
                </span>
            </StyledForm>
        </StyledFormSection>
    </StyledFormContainer>
    )
}
export default Register