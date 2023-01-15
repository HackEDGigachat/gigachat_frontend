import logo from './logo.svg';
import './App.css';
// import { LoginForm } from './components/loginForm'
import React, { Component, useEffect,useState } from 'react';
import Main from "./components/main.js"
import Login from "./components/login.js"
import { BrowserRouter as Router, Route, Routes , Link} from "react-router-dom"

function App() {

  
  return (
    <>

      <div id="route_js">
        
        <Router>
          <Routes>
            <Route path = "/" element = {<Login />}/>
            <Route path = "/main" element = {<Main />}/>
          </Routes>
        </Router>
        </div>
        </>
    
  );
}


export default App;
