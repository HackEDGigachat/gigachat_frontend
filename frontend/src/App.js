import logo from './logo.svg';
import './App.css';
// import { LoginForm } from './components/loginForm'
import React, { Component } from 'react';
import Test from "./pages/test.js"
import Login from "./pages/login.js"
import { BrowserRouter as Router, Route, Routes} from "react-router-dom"
function App() {
  return (
    
      <div>
      
        <Router>
          <Routes>
            <Route path = "/" element = {<Login />}/>
            <Route path = "/test" element = {<Test />}/>
          </Routes>
        </Router>
        </div>
    
  );
}


export default App;
