import React from 'react';
import MainSidebar from '../Sidebar/MainSidebar.js';
import '../Core.css';
import './Register.css';
import logo from '../res/Icons/logo.svg';


class RegisterHeader extends React.Component {
    
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div id = "registerHeader">

                <img src = { logo } />
                <h1> consilium </h1>

            </div>
        )
    }
}

class RegisterContent extends React.Component {
    
    constructor(props) {
        super(props);
    }

    async registerNewUser() {

        let registerEmail = document.getElementById("registerEmail").value;
        let registerPassword = document.getElementById("registerPassword").value;
        let registerConfirmPassword = document.getElementById("registerConfirmPassword").value;
        let registerFirstName = document.getElementById("registerFirstName").value;
        let registerLastName = document.getElementById("registerLastName").value;
        let registerBirthdate = document.getElementById("registerBirthdate").value;


        await fetch("http://localhost:9000/users", {
            method: "post",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
            body: JSON.stringify({
                email: registerEmail,
                password: registerPassword,
                firstName: registerFirstName,
                lastName: registerLastName,
                birthdate: registerBirthdate
            })
        })
            .then((response) => {
                console.log("Request sent");
                if(response.status == "200")
                    window.location.replace("http://localhost:3000");
            });
    }

    render() {
        return(
            <div id = "registerContent">

                <form id = "registerForm">

                    <label> Email </label>
                    <input type = "email" id = "registerEmail" />

                    <label> Password </label>
                    <input type = "password" id = "registerPassword" />

                    <label> Confirm password </label>
                    <input type = "password" id = "registerConfirmPassword" />

                    <label> First name </label>
                    <input type = "text" id = "registerFirstName" />

                    <label> Last name </label>
                    <input type = "text" id = "registerLastName" />

                    <label> Birthdate </label>
                    <input type = "text" id = "registerBirthdate" />

                    <input type = "button" value = "Register" id = "registerButton" onClick = { () => this.registerNewUser() }/>

                </form>

            </div>
        )
    }
}

class Register extends React.Component {

    constructor(props) {
        super(props);
    }


    render() {
		return (
            <div id = "registerPageContainer">

                <div id = "registerContentContainer">

                    <div id = "leftOfRegister">

                        <RegisterHeader />

                    </div>

                    <div id = "rightOfRegister">

                        <div id = "registerPageRightContent">

                            <RegisterContent />

                            <a id = "goToLogin" href = "http://localhost:3000/login"> Already have an account? Login </a>

                        </div>

                    </div>

                </div>

            </div>
        )
	}
}

export default Register;