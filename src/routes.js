import React from 'react';
import {BrowserRouter, Route, Redirect, Switch} from 'react-router-dom';


import Login from './Login/Login.js';
import Home from './Dashboard/Dashboard.js';
//import Signup from './SignUp/SignUp.js';
//import NotFound from './NotFound/NotFound.js';


const Routes = () => (
<BrowserRouter >
<Switch>
<Route exact path="/" component={Home}/>
<Route path="/home" component={Home}/>
<Route path="/login" component={Login}/>
{/* <Route path="/Signup" component={Signup}/>
<Route path="*" component={NotFound}/> */}
</Switch>
</BrowserRouter>
);
export default Routes;