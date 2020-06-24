import React from 'react';
import MainSidebar from '../Sidebar/MainSidebar.js';
import '../Core.css';
import './Login.css';
import logo from '../../res/Icons/logo.svg';


class LoginHeader extends React.Component {
    
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div id = "loginHeader">

                <img src = { logo } />
                <h1> consilium </h1>

            </div>
        )
    }
}

class LoginContent extends React.Component {
    
    constructor(props) {
        super(props);
    }

    async loginUser() {

        let userEmail = document.getElementById("userEmail").value;
        let userPassword = document.getElementById("userPassword").value;


        await fetch("http://localhost:9000/login", {
            method: "post",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
            body: JSON.stringify({
                email: userEmail,
                password: userPassword
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
            <div id = "loginContent">

                <form id = "loginForm">

                    <label> Email </label>
                    <input id = "userEmail" type = "email" />

                    <label> Password </label>
                    <input id = "userPassword" type = "password" />

                    <input type = "submit" value = "Log In" />

                </form>

            </div>
        )
    }
}

class Login extends React.Component {

    constructor(props) {
        super(props);
    }


    render() {
		return (
            <div id = "loginPageContainer">

                <div id = "loginPageContent">

                    <LoginHeader />
                    <LoginContent />

                    <div id = "loginAlternatives">  
                    
                        <a id = "forgotPassword" href = "/"> Forgot password? </a> | <a id = "createAccount" href = "/register"> Create an account </a>
                    
                    </div>

                    <a id = "loginToDemo" href = "/dashboard"> Login as a demo user </a>

                </div>

            </div>
        )
	}
}

export default Login;