import React from 'react';
import {BrowserRouter, Route, Redirect, Switch} from 'react-router-dom';


import Login from './Login/Login.js';
import Home from './Dashboard/Dashboard.js';
import Register from './Register/Register.js';
//import NotFound from './NotFound/NotFound.js';


const Routes = () => (
<BrowserRouter >
<Switch>
<Route exact path="/" component={Home}/>
<Route path="/home" component={Home}/>
<Route path="/login" component={Login}/>
<Route path="/Register" component={Register}/>
{/* <Route path="*" component={NotFound}/> */}
</Switch>
</BrowserRouter>
);
export default Routes;