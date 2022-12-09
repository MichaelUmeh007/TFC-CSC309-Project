import StyledForm from "../../components/Common/Form";
import StyledFormContainer from "../../components/Common/FormContainer";
import StyledFormSection from "../../components/Common/FormSection";
import StyledErrorMessage from "../../components/Common/Messages/ErrorMessage";
import StyledInput from "../../components/Common/Input";
import StyledSubmitButton from "../../components/Common/SubmitButton";
import StyledLabel from "../../components/Common/Label";
import StyledIcon from "../../components/Common/Icon";
import StyledLink from "../../components/Common/Link";
import { StyledInstructionMessage } from "../../components/Common/Messages/InstructionMessage/InstructionMessage.styles";
import StyledImageLabel from "../../components/Common/ImageLabel";
import StyledSuccessMessage from "../../components/Common/Messages/SuccessMessage";
import StyledAvatar from "../../components/Avatar";
import axios from "../../api/axios"
import { useState, useRef, useEffect} from "react";
import {
    faDumbbell,
    faBurger,
    faInfoCircle,
  } from "@fortawesome/free-solid-svg-icons";
import validator from "validator";
import FormData from 'form-data'
import logo from "../../profile.png";
import { useAuthHeader } from "react-auth-kit";


const FN_REGEX = /^[A-z][A-z ]{0,23}$/;
const LN_REGEX = /^[A-z][A-z ]{0,23}$/;
const expREGEX = /^\d{4}-\d{2}-\d{2}$/;
const cvvREGEX = /^[0-9]{3}$/;
const PROFILE_URL = "/accounts/profile/";
const PAYMENT_URL = "/accounts/profile/payment/";

const headerstyle = {
    marginBottom: "0px",
    marginTop: "0px",
    fontSize: "40px"
}  

function Profile(){

    const errRef = useRef();

    const [firstname, setFirstname] = useState("");
    const [validFirstname, setValidFirstname] = useState(false);
    const [focusedOnFirstname, setFirstnameFocus] = useState(false);
    const [firstnameerror, setFirstnameErorr] = useState("");
  
    const [lastname, setLastname] = useState("");
    const [validLastname, setValidLastname] = useState(false);
    const [focusedOnLastname, setLastnameFocus] = useState(false);
    const [lastnameerror, setLastnameErorr] = useState("");

    const [phonenumber, setPhonenumber] = useState("");
    const [validPhonenumber, setValidPhonenumber] = useState(false);
    const [focusedOnPhonenumber, setPhonenumberFocus] = useState(false);
    const [phonenumbererror, setPhonenumberErorr] = useState("");

    const [email, setEmail] = useState("");
    const [validEmail, setValidEmail] = useState(false);
    const [focusedOnEmail, setEmailFocus] = useState(false);
    const [emailerror, setEmailErorr] = useState("");

    const [image, setImage] = useState(logo);

    const [avatar, setAvatar] = useState(null)
    const [validAvatar, setValidAvatar] = useState(false);
    const [imageerror, setImageErorr] = useState("");

    const [creditcard, setCc] = useState("");
    const [validCc, setValidCc] = useState(false);
    const [focusedOnCc, setCcFocus] = useState(false);
    const [creditcarderror, setCreditcardErorr] = useState("")

    const [exp, setExp] = useState("");
    const [validExp, setValidExp] = useState(false);
    const [focusedOnExp, setExpFocus] = useState(false);
    const [experror, setExpErorr] = useState("")

    const [cvv, setCvv] = useState("");
    const [validCvv, setValidCvv] = useState(false);
    const [focusedOnCvv, setCvvFocus] = useState(false);
    const [cvverror, setCvvErorr] = useState("")

    // for backend and submission validation
    const [errormessage, setErrorMessage] = useState("");
    const [successmessage, setSuccessMessage] = useState("");
    const [errormessagepayment, setErrorMessageP] = useState("");
    const [successmessagepayment, setSuccessMessageP] = useState("");
    const authheadergetter = useAuthHeader();
    const authheader = authheadergetter();

    // image validation
    function isFileImage(file) {
        return file && file['type'].split('/')[0] === 'image';
    }

    // fucntion for settting initial user data
    function setUserData(data){
        if (data.first_name){
            setFirstname(data.first_name);
        }
        if (data.last_name){
            setLastname(data.last_name);
        }
        if (data.email){
            setEmail(data.email);
        }
        if (data.phone_number){
            setPhonenumber(data.phone_number);
        }
        if (data.avatar){
            setImage(data.avatar);
        }
    }
    function setPaymentData(data){
        if (data.cc_number){
            const x = 'X'
            setCc(data.cc_number.slice(0, 4) + `${x.repeat(data.cc_number.length - 4)}`);
        }
    
    }

    // error clearing
    function clear_err(){
        setErrorMessage("");
        setEmailErorr("");
        setFirstnameErorr("");
        setLastnameErorr("");
        setPhonenumberErorr("");}
           
        // error setting
        function set_err(err_response){
       
            for (const key in err_response){

                if(key === "firstname"){
                    setFirstnameErorr(err_response[key][0]);
                }
                else if(key === "last_name"){
                    setLastnameErorr(err_response[key][0]);
                }
                else if(key === "email"){
                    setEmailErorr(err_response[key][0]);
                }
                else if (key === "phone_number"){
                    setPhonenumberErorr(err_response[key][0]);
                }
                else if (key === "avatar"){
                    setImageErorr(err_response[key][0]);
                }
                else if (key === "cc_number"){
                    setCreditcardErorr(err_response[key][0]);
                }
                else if (key === "cc_expiry"){
                    setExpErorr(err_response[key][0]);
                }
                else if (key === 'cc_code'){
                    setCvv(err_response[key][0]);
                }
                
            }
        }

    const firstRender = () => {
        const populateUserDataAsync = async () => {
            try {
                const response = await axios.get(
                    PROFILE_URL,
                    {
                        headers: { "Content-Type": "application/json",  "Authorization": `${authheader}`},
                        withCredentials: false,
                        
                    }
                )
                // on succesful request, set data
                setUserData(response.data);
            } catch (err) {
                // unsuccessful, update when api becomes available
                if (!err?.response) {
                    setErrorMessage("No Server Response, possible maintanance at work");
                  } 
                else if ((err.response?.status === 404)){
                    setErrorMessage("User not found")
                }
                else if ((err.response?.status === 401)){
                    setErrorMessage("User not authorized")
                }
                else {
                    setErrorMessage("Profile functionality unavailable")
                }
            }
        }
        const populatePaymentDataAsync = async () => {
            try {
                const response = await axios.get(
                    PAYMENT_URL,
                    {
                        headers: { "Content-Type": "application/json", "Authorization": `${authheader}`},
                        withCredentials: false,
                    }
                )
                // on succesful request, set data
                setPaymentData(response.data);
            }
            catch (err){
                if (!err.response) {
                    setErrorMessage("No Server Response, possible maintanance at work")
                }
                else if (err.response?.status === 404){
                    setErrorMessage("User not found")
                }
                else if ((err.response?.status === 401)){
                    setErrorMessage("User not authorized")
                }
                else {
                    setErrorMessage("Payment functionality unavailable")
                }
            }
        }

        populateUserDataAsync();
        populatePaymentDataAsync();
        
    }

    //
    useEffect(firstRender, [authheader])

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

    useEffect(() => {
        const result = isFileImage(avatar);
        setValidAvatar(result);
    }, [avatar])

    useEffect(() => {
        const result = validator.isCreditCard(creditcard);
        setValidCc(result);
      }, [creditcard]);
    
      useEffect(() => {
        const result = expREGEX.test(exp);
        setValidExp(result);
      }, [exp]);
    
      useEffect(() => {
        const result = cvvREGEX.test(cvv);
        setValidCvv(result);
      }, [cvv]);
    

    // clearing error message after user change
    useEffect(() => {
        clear_err();
        setSuccessMessage("");
        }, [firstname, lastname, email, image, phonenumber]);

    useEffect(() => {
        setCvvErorr("")
        setExpErorr("")
        setCreditcardErorr("")
        setSuccessMessageP("")
        setErrorMessageP("")
    }, [creditcard, cvv, exp])

        const handleImage = (e) =>{
            setImage(URL.createObjectURL(e.target.files[0]));
            setAvatar(e.target.files[0]);
            console.log("avatar gets saved");

        }


        const handleSubmit = async (e) => {
            e.preventDefault();

            if (!avatar && !firstname && !lastname && !email && !phonenumber){
                return;
            }

            // TODO: handle submission here
            try {

            const data = new FormData();
            if (avatar){
                data.append(
                    "avatar",
                    avatar
                );
            }

            if (firstname){
                data.append(
                    "first_name",
                    firstname
                );
            }
            if (lastname){
                data.append(
                    "last_name",
                    lastname
                );
            }
            if (email){
                data.append(
                    "email",
                    email
                )
            }
            if (phonenumber){
                data.append(
                    "phone_number",
                    phonenumber
                );
            }

              const response = await axios.patch(PROFILE_URL, data, {
                headers: { "Content-Type": `multipart/form-data; boundary=${data._boundary}`,
                            "Authorization": `${authheader}`},
                withCredentials: false,
              });
        
              
              if ((response.data).length < 5){
                set_err(response.data);
              } else {
                // on sucess reload page
                setSuccessMessage("Profile Updated!");
              }

              
            } catch (err) {
              if (!err?.response) {
                setErrorMessage("No server response, possible maintainance at work");
              } else if (err.response?.status === 400) {
                    set_err((err.response.data));
              } else {
                setErrorMessage("Update Failed");
              }
              errRef.current?.focus();
            }
          };

          const handleSubmit2 = async (e) => {
            e.preventDefault();
            
            if (!creditcard && !exp && !cvv){
                return}
            
            // TODO: handle submission here
            try {

            const data = new FormData();
            if (creditcard){
                data.append(
                    "cc_number",
                    creditcard
                );
            }

            if (cvv){
                data.append(
                    "cc_code",
                    cvv
                );
            }
            if (exp){
                data.append(
                    "cc_expiry",
                    exp
                );
            }


              const response = await axios.patch(PAYMENT_URL, data, {
                headers: { "Content-Type": `multipart/form-data; boundary=${data._boundary}`,
                            "Authorization": `${authheader}`},
                withCredentials: false,
              });
        
             if (Object.keys(response.data).length < 3){
                set_err(response.data)
             }else {
                    setSuccessMessageP("Payment Information Updated")}


              
            } catch (err) {
              if (!err?.response) {
                setErrorMessage("No server response, possible maintainance at work");
              } else if (err.response?.status === 400) {
                    set_err((err.response.data));
              } else {
                setErrorMessageP("Update Failed");
              }
              errRef.current?.focus();
            }
          };
    



    return(
        <StyledFormContainer inputColor="#D3D3D3">

        <StyledFormSection>
        <StyledSuccessMessage offscreen={successmessage.length === 0}>
            {successmessage}
        </StyledSuccessMessage>
        <StyledErrorMessage ref={errRef} offscreen={(errormessage.length === 0)}>
            {errormessage}
        </StyledErrorMessage>
        <h1 style={headerstyle}> User Profile </h1>

            <StyledAvatar id="imgdisplay" src={image}/>

            <StyledForm>

                <StyledImageLabel htmlFor="avatar">
                    Select New Avatar
                </StyledImageLabel>
                <StyledInput style={{display: "none"}}
                    type="file"
                    id="avatar"
                    onChange={handleImage}
                    value={""}
                />
                <StyledInstructionMessage offscreen={(avatar && !validAvatar)? 0 : 1}>
                    <StyledIcon icon={faInfoCircle} />   
                    <br />
                    Please upload an image file.
                </StyledInstructionMessage>
                <StyledErrorMessage offscreen={(imageerror.length === 0)? 1 : 0}>
                    {imageerror}
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
                    onFocus={() => setFirstnameFocus(true)}
                    onBlur={() => setFirstnameFocus(false)}
                />
                <StyledInstructionMessage offscreen={(firstname && focusedOnFirstname && !validFirstname)? 0 : 1}>
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
                    onFocus={() => setLastnameFocus(true)}
                    onBlur={() => setLastnameFocus(false)}
                />
                <StyledInstructionMessage offscreen={(lastname && focusedOnLastname && !validLastname)? 0 : 1}>
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



                <StyledSubmitButton onClick={handleSubmit} disabled={(!validEmail && email) ||
                    (!validFirstname && firstname) || (!validLastname && lastname) ||
                    (!validPhonenumber && phonenumber) || (!validAvatar && avatar)? true : false}>
                {" "}
                Edit Profile{" "}
                </StyledSubmitButton>
            </StyledForm>

        <StyledSuccessMessage offscreen={successmessagepayment.length === 0}>
            {successmessagepayment}
        </StyledSuccessMessage>
        <StyledErrorMessage ref={errRef} offscreen={(errormessagepayment.length === 0)}>
            {errormessagepayment}
        </StyledErrorMessage>
        <h1 style={headerstyle}> Payment Information </h1>

            <StyledForm>


            <StyledLabel htmlFor="creditcard">
                    Credit Card Number:
                    <StyledIcon
                        icon={faDumbbell}
                        hide={(!validCc)? 1 : 0}
                        valid={validCc? 1 : 0}    
                    />
                    <StyledIcon
                        icon={faBurger}
                        hide={(validCc || !creditcard)? 1 : 0}
                        valid={(!(validCc || !creditcard))? 0 : 1}
                    />
                </StyledLabel>
                <StyledInput
                    type="text"
                    id="creditcard"
                    onChange={(e) => setCc(e.target.value)}
                    value={creditcard}
                    onFocus={() => setCcFocus(true)}
                    onBlur={() => setCcFocus(false)}
                />
                <StyledInstructionMessage offscreen={(creditcard && focusedOnCc && !validCc)? 0 : 1}>
                    <StyledIcon icon={faInfoCircle} />   
                    <br />
                    Please input a valid credit card number.
                </StyledInstructionMessage>
                <StyledErrorMessage offscreen={(creditcarderror.length === 0)? 1 : 0}>
                    {creditcarderror}
                </StyledErrorMessage>


            <StyledLabel htmlFor="exp">
                    Expiry Date:
                    <StyledIcon
                        icon={faDumbbell}
                        hide={(!validExp)? 1 : 0}
                        valid={validExp? 1 : 0}    
                    />
                    <StyledIcon
                        icon={faBurger}
                        hide={(validExp || !exp)? 1 : 0}
                        valid={(!(validExp || !exp))? 0 : 1}
                    />
                </StyledLabel>
                <StyledInput
                    type="text"
                    id="exp"
                    onChange={(e) => setExp(e.target.value)}
                    value={exp}
                    onFocus={() => setExpFocus(true)}
                    onBlur={() => setExpFocus(false)}
                />
                <StyledInstructionMessage offscreen={(exp && focusedOnExp && !validExp)? 0 : 1}>
                    <StyledIcon icon={faInfoCircle} />   
                    <br />
                    "Date has wrong format. Use one of this formats instead: YYYY-MM-DD."
                </StyledInstructionMessage>
                <StyledErrorMessage offscreen={(experror.length === 0)? 1 : 0}>
                    {experror}
                </StyledErrorMessage>

                <StyledLabel htmlFor="cvv">
                    Security Code
                    <StyledIcon
                        icon={faDumbbell}
                        hide={(!validCvv)? 1 : 0}
                        valid={validCvv? 1 : 0}    
                    />
                    <StyledIcon
                        icon={faBurger}
                        hide={(validCvv || !cvv)? 1 : 0}
                        valid={(!(validCvv || !cvv))? 0 : 1}
                    />
                </StyledLabel>
                <StyledInput
                    type="text"
                    id="cvv"
                    onChange={(e) => setCvv(e.target.value)}
                    value={cvv}
                    onFocus={() => setCvvFocus(true)}
                    onBlur={() => setCvvFocus(false)}
                />
                <StyledInstructionMessage offscreen={(cvv && focusedOnCvv && !validCvv)? 0 : 1}>
                    <StyledIcon icon={faInfoCircle} />   
                    <br />
                    "Please Enter Valid Security Code"
                </StyledInstructionMessage>
                <StyledErrorMessage offscreen={(cvverror.length === 0)? 1 : 0}>
                    {cvverror}
                </StyledErrorMessage>

                <StyledSubmitButton onClick={handleSubmit2} disabled={(!validCc || !validCvv || !validCc) && (creditcard
                    || cvv || exp)? true : false}>
                {" "}
                Update{" "}
                </StyledSubmitButton>
            </StyledForm>

                <span style={{display: "inline-block"}}>
                    <StyledLink margin={"0%"} decor={1} to="/home">Return Home</StyledLink>
                </span>
        </StyledFormSection>
    </StyledFormContainer>
    )

}

export default Profile;
