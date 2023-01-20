import logo from './logo.svg';
import './App.css';
//import { LoginForm } from './components/loginForm'
import React, { Component, useEffect,useState } from 'react';
import Main from "./components/main.js"
import Start from "./components/start.js"
import { BrowserRouter as Router, Route, Routes , Link} from "react-router-dom"

function App() {

  
  return (
    <>

      <div >
        
        <Router>
          <Routes>
            <Route path = "/" element = {<Start />}/>
            <Route path="/main" element={<Main />} />
          </Routes>
        </Router>
        </div>
        </>
    
  );
}


export default App;
