import logo from './logo.svg';
import './App.css';
// import { LoginForm } from './components/loginForm'
import React, { Component, useEffect,useState } from 'react';
import Main from "./components/main.js"
import Login from "./components/login.js"
import { BrowserRouter as Router, Route, Routes , Link} from "react-router-dom"

function App() {
  const [data, setData] = useState([]);
  const [username, setUsername] = useState("")
  
  useEffect(()=>{
    fetch("/api/data",{
      method: "GET",
      mode: 'no-cors',}).then(response => response.json().then(data2=>{
      console.log("hi")
      console.log(data2)
      setData(data2);

      console.log(data)
    })
      );
  },[]
  )
  
  return (
    <>

      <div>
        
        <Router>
          <Routes>
            <Route path = "/" element = {<Login />}/>
            <Route path = "/main" element = {<Main data={data} />}/>
          </Routes>
        </Router>
        </div>
        </>
    
  );
}


export default App;
