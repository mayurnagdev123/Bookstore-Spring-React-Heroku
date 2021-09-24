import React, { useState } from 'react'
import { register } from '../../../functions/util';
import './Modal.css';

const ModalSignup = (props) => {
    const [signupUsername, setSignupUsername] = useState(null);
    const [signupName, setSignupName] = useState(null);
    const [signupEmail, setSignupEmail] = useState(null);
    const [signupPassword, setSignupPassword] = useState(null);
    const [signupConfirmPassword, setSignupConfirmPassword] = useState(null);

    const signupUsernameChangedHandler = (event) => {
        setSignupUsername(event.target.value);
    }
    const signupNameChangedHandler = (event) => {
        setSignupName(event.target.value);
    }
    const signupEmailChangedHandler = (event) => {
        setSignupEmail(event.target.value);
    }
    const signupPasswordChangedHandler = (event) => {
        setSignupPassword(event.target.value);
    }
    const signupConfirmPasswordChangedHandler = (event) => {
        setSignupConfirmPassword(event.target.value);
    }

    const submitSignupForm = (event) => {
        var labelElement = document.getElementById("responseLabel");
        var emailField = document.getElementById("email");
        var usernameField = document.getElementById("username");
        var confirmPasswordField = document.getElementById("confirm_password");
        var passwordField = document.getElementById("password");

        event.preventDefault();
        var n = signupPassword.localeCompare(signupConfirmPassword);
        //reset everything on a new request
        confirmPasswordField.classList.remove("invalidField");
        passwordField.classList.remove("invalidField");
        emailField.classList.remove("invalidField");
        usernameField.classList.remove("invalidField");
        labelElement.classList.remove("responseLabelError");
        labelElement.classList.remove("responseLabelSuccess");

        if (n !== 0) {
            labelElement.innerHTML = "Passwords do not match!";
            labelElement.classList.add("responseLabelError");
            confirmPasswordField.classList.add("invalidField");
            passwordField.classList.add("invalidField");
        }
        else {
            register(signupUsername, signupName, signupEmail, signupPassword, function (returnValue) {

                labelElement.innerHTML = returnValue;
                if (returnValue.includes("Success")) {
                    labelElement.classList.add("responseLabelSuccess");
                    setTimeout(function () {
                        props.toggleLoginSignup();
                    }, 2000)
                }
                else {
                    labelElement.classList.add("responseLabelError");
                    if (returnValue.includes("This email is already taken"))
                        emailField.classList.add("invalidField");
                    else if (returnValue.includes("This username is already taken"))
                        usernameField.classList.add("invalidField");
                }
            });

        }

    }
    const signupForm = (
        <div className="signupModal">
            <i className="text-center book_icon_login"></i>
            <div className="text-center loginHeading">Sign Up to proceed</div>
            <h5 className="text-center loginSubHeading">Access our library with a free account</h5>
            <form className="modalSignupMargin" onSubmit={submitSignupForm}>
                <div className="form-group">
                    <label htmlFor="responseLabel" id="responseLabel" style={{ textAlign: 'center', fontSize: '1.3rem', display: 'none' }}></label>
                </div>
                <div className="form-group">
                    <input type="text" className="form-control" id="username" placeholder="Choose a username" required onChange={signupUsernameChangedHandler} />
                </div>
                <div className="form-group">
                    <input type="text" className="form-control" id="name" placeholder="Name" required onChange={signupNameChangedHandler} />
                </div>
                <div className="form-group">
                    <input type="email" autoComplete="username" className="form-control" id="email" placeholder="Email" required onChange={signupEmailChangedHandler} />
                </div>
                <div className="form-group">
                    <input type="password" className="form-control" autoComplete="on" id="password" placeholder="Password" required onChange={signupPasswordChangedHandler} minLength="6" />
                </div>
                <div className="form-group">
                    <input type="password" className="form-control" autoComplete="on" id="confirm_password" placeholder="Confirm Password" required onChange={signupConfirmPasswordChangedHandler} minLength="6" />
                </div>
                <div className="form-group">
                    <button className="btn btn-block" style={{ color: 'white', fontWeight: 'bold', backgroundColor: '#17a288', letterSpacing: '1px' }} >Continue</button>
                </div>

                <div className="form-group text-center" style={{ color: '#aaa' }}>
                    <h5 style={{ fontWeight: '600', lineHeight: '1.7rem' }}>By continuing, you agree to our <span style={{ color: '#17a288' }}>Terms of Service</span> and <span style={{ color: '#17a288' }}>Privacy Policy</span></h5>
                </div>
                <div className="form-group">
                    <h5 style={{ textAlign: 'center', lineHeight: '1.7rem', color: 'black' }}>Already a member? <span style={{ fontWeight: 'bold', cursor: 'pointer' }} onClick={() => props.toggleLoginSignup()}>Log In</span></h5>
                </div>

            </form>

        </div>
    );
    return (
        signupForm
    )
}

export default ModalSignup