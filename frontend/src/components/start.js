import React, { useState } from "react";

import Login  from "./login.js";
import  Register  from "./register.js";
import NavBar from "./navbar_login.js";
import './start.css'
function Start(){
    const [currentForm, setCurrentForm] = useState('login');

    const toggleForm = (formName) => {
      setCurrentForm(formName);
    }
  
    return (
      <div className="App">


        <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        zIndex: 999}}>
        <NavBar />
      </div>
    
        {
          currentForm === "login" ? <Login onFormSwitch={toggleForm} /> : <Register onFormSwitch={toggleForm} />
        }
      </div>
    );
  }


  export default Start;