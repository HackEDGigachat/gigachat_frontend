import { Link, useNavigate } from "react-router-dom";
import React, { Component, useState, useEffect,useRef   } from "react";




function Login(props) {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [password, setPassword] = useState("");
  const [data, setData] = useState([]);
  const [login_pass, setLogin] = useState(false);
  const inputUsername = useRef(null);
  function handleSubmit(event) {
 
    const username_in = inputUsername.current.value;
    event.preventDefault();
    const params = {
      username: username_in,
      password: password,
    };
    const res = JSON.stringify(params);
   
    fetch("/api/check_user", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: res,
    })
      .then((response) => response.json())
      .then((data_retrived) => {
        console.log(data_retrived["valid"]);
        if (data_retrived["valid"] === true) {
         
          setLogin(false);
          setUsername(username);
          console.log("Test"+username_in)
          
          navigate("/main",{state:{
            username:username_in,
          },});
          
        } else {
          console.log("EWFwefwefewf")
          setLogin(true);
        }
      });
  }

  return (
  
    <div>
      



    
      <div className="auth-form-container">
            <h2>Login</h2>
            <form className="login-form" onSubmit={handleSubmit}>
                <label htmlFor="email">Username</label>
                <input  ref={inputUsername} type="username" placeholder="Username"  />
                <label htmlFor="password">Password</label>
                <input onChange={(e) => setPassword(e.target.value)} type="password" placeholder="********" id="password" name="password" />
               <br></br> <button className = "submit" type="submit">Log In</button>
            </form>
            <button className="link-btn" onClick={() => props.onFormSwitch('register')}>Don't have an account? Register here.</button>
            {login_pass}
        {login_pass ? (
          <div id="failed_login">Wrong Username or password</div>
        ) : <br></br>}
        </div>

        
      </div>

  );
        }

export  default Login;