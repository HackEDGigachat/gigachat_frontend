import logo from './logo.svg';
import './App.css';
// import { LoginForm } from './components/loginForm'
import React, { Component, useEffect,useState } from 'react';
import Test from "./pages/test.js"
import Login from "./pages/login.js"
import { BrowserRouter as Router, Route, Routes , Link} from "react-router-dom"

function App() {
  const [data, setData] = useState([]);
  useEffect(()=>{
    fetch("/api/data",{
      mode: 'no-cors',}).then(response => response.json().then(data=>{
      console.log("hi")
      console.log(data)
      
    })
      );
  }
  )
  
  return (
    <>

      <div>
      
        <Router>
          <Routes>
            <Route path = "/" element = {<Login />}/>
            <Route path = "/test" element = {<Test />}/>
          </Routes>
        </Router>
        </div>
        </>
    
  );
}


export default App;
