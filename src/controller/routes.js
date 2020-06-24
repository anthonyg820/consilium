import React from 'react';
import {BrowserRouter, Route, Redirect, Switch} from 'react-router-dom';


import Login from '../view/Login/Login.js';
import Register from '../view/Register/Register.js';
import Dashboard from '../view/Dashboard/Dashboard.js';
import Projects from '../view/Projects/Projects.js';
//import NotFound from './NotFound/NotFound.js';


const Routes = () => (
<BrowserRouter >
<Switch>
<Route exact path="/" component={Login}/>
<Route path="/dashboard" component={Dashboard}/>
<Route path="/login" component={Login}/>
<Route path="/register" component={Register}/>
<Route path="/projects" component={Projects}/>
{/* <Route path="*" component={NotFound}/> */}
</Switch>
</BrowserRouter>
);
export default Routes;