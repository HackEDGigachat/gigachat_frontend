import { Link, useNavigate } from "react-router-dom";
import React, { Component, useState, useEffect,useRef   } from "react";



function Register(props) {
    const navigate = useNavigate();
    const [username, setusername] = useState('');
    const [pass, setPass] = useState('');
    const [name, setName] = useState('');
    const name_in = useRef(null);
    const username_in = useRef(null);
    const password_in = useRef(null);
    const [login_pass, setLogin] = useState(false);
    const handleSubmit = (e) => {
        const username = username_in.current.value;
        const name = name_in.current.value;
        const password = password_in.current.value;
        e.preventDefault();
        const params = {
            name :name,
            username: username,
            password: password,
          };
        const res = JSON.stringify(params);
        fetch('/api/create_user',{
            method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: res,
        }).then((response) => response.json())
        .then((data_retrived) => {
            if (data_retrived["valid"] === true) {
                
              
                setLogin(false);
                navigate("/main",{state:{
                  username:username_in,
                },});
                
              } else {
              
                setLogin(true);
              }
        });
        
    }

    return (
        <div className="auth-form-container">
            <h2>Register</h2>
        <form className="register-form" onSubmit={handleSubmit}>
            <label htmlFor="name">Full name</label>
            <input ref={name_in}  name="name" onChange={(e) => setName(e.target.value)}  placeholder="full Name" />
            <label htmlFor="username">Username</label>
            <input ref={username_in}  onChange={(e) => setusername(e.target.value)}type="username" placeholder="username"  name="username" />
            <label htmlFor="password">Password</label>
            <input  ref={password_in}   onChange={(e) => setPass(e.target.value)} type="password" placeholder="password" name="password" />
            <br></br><button className = "submit" type="submit">Sign up</button>
            {login_pass}
        {login_pass ? (
          <div id="failed_login">Username has been taken</div>
        ) : <br></br>}
        </form>
        <button className="link-btn" onClick={() => props.onFormSwitch('login')}>Already have an account? Login here.</button>
    </div>
    )
}
export  default Register;
