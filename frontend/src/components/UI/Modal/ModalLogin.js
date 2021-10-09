import React, { useState } from 'react'
import { addToLocalStorage, login } from '../../../functions/util';

import './Modal.css'
const ModalLogin = (props) => {

    const [loginUsername, setLoginUsername] = useState(null);
    const [loginPassword, setLoginPassword] = useState(null);

    const loginUsernameChangedHandler = (event) => {
        setLoginUsername(event.target.value);
    }
    const loginPasswordChangedHandler = (event) => {
        setLoginPassword(event.target.value);
    }
    const submitLoginFormHandler = (event) => {
        event.preventDefault();
        var usernameField = document.getElementById("loginUsername");
        var passwordField = document.getElementById("loginPassword");
        var labelElement = document.getElementById("responseLabelLogin");

        usernameField.classList.remove("invalidField");
        passwordField.classList.remove("invalidField");
        labelElement.classList.remove("responseLabelError");
        login(loginUsername, loginPassword, function (returnValue, responseHeaders) {

            if (typeof (returnValue) === "string" && returnValue.localeCompare("Failed") === 0) {
                console.log("authentication failed!");
                labelElement.innerHTML = "Invalid Details";
                labelElement.classList.add("responseLabelError");
            }
            else { //login was successful

                var name = responseHeaders.name;
                var email = responseHeaders.email;
                var expiry = Date.now() + 60 * 60 * 1000 * 10; //set expiry to 10 hours 
                addToLocalStorage("expiry", expiry);
                addToLocalStorage("name", name);
                addToLocalStorage("email", email);
                addToLocalStorage("username", loginUsername);
                try {
                    props.updateLoggedInUserName();
                }
                catch (err) {
                    console.log("testing workaround");
                    document.getElementById("hiddenBtn").click();
                } props.clicked();
            }


        })
    }
    const loginForm = (
        <div className="loginModal">
            <i className="text-center book_icon_login"></i>
            <div className="text-center loginHeading">Log in to continue</div>
            <h5 className="text-center loginSubHeading">Access our library with a free account</h5>
            <form style={{ marginTop: '4rem' }} autoComplete="off" onSubmit={submitLoginFormHandler}>
                <div className="form-group">
                    <label htmlFor="responseLabelLogin" id="responseLabelLogin" style={{ textAlign: 'center', fontSize: '1.3rem', display: 'none' }}></label>
                </div>
                <div className="form-group">
                    <input autoComplete="off" type="text" className="form-control" id="loginUsername" placeholder="Username" onChange={loginUsernameChangedHandler} required />
                </div>
                <div className="form-group">
                    <input autoComplete="off" type="password" className="form-control" id="loginPassword" placeholder="Password" onChange={loginPasswordChangedHandler} required />
                </div>
                <div className="form-group">
                    <button className="btn btn-block" type="submit" style={{ color: 'white', fontWeight: 'bold', backgroundColor: '#17a288', letterSpacing: '1px' }}>Continue</button>
                </div>
                <div className="form-group text-center">
                    <h5 style={{ color: '#888' }}>OR</h5>
                </div>
                <div className="form-group">
                    <button className="btn btn-block signupBtn" type="submit" onClick={() => props.toggleLoginSignup()}>Sign Up with Email</button>
                </div>

                <div className="form-group text-center" style={{ color: '#aaa', marginTop: '25px' }}>
                    <h5 style={{ fontWeight: '600', lineHeight: '1.7rem' }}>By continuing, you agree to our <span style={{ color: '#17a288' }}>Terms of Service</span> and <span style={{ color: '#17a288' }}>Privacy Policy</span></h5>
                </div>

            </form>

        </div>
    )
    return (
        loginForm
    )
}
export default ModalLogin
