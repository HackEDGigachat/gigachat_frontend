import { Link, useNavigate } from "react-router-dom";
import React, { Component, useState, useEffect,useRef   } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import NavBar from "./navbar_login.js";
import "./login.css";
import { Button as ButtonSem, Icon } from 'semantic-ui-react'

export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("rpi_user");
  const [user, setUser] = useState(null);
  const [password, setPassword] = useState("");
  const [data, setData] = useState([]);
  const [login_pass, setLogin] = useState(false);
  const inputUsername = useRef(null);
  function handleSubmit(event) {
    console.log("Fwqfwfqwfqwfwqf")
    const username_in = inputUsername.current.value;
  
    event.preventDefault();
    const params = {
      username: username,
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
          
          // navigate("/main",{state:{
          //   username:username_in,
          // },});
          
        } else {
          setLogin(true);
        }
      });
  }

  return (
  
    <div>
      <div>
        <NavBar />
      </div>
      <video width="100%" height="100%" controls={false} loop={true}>
        <source src="http://localhost:5000/video" type="video/mp4" />
      </video>

      <div className="loginForm">

 
        <Form >
          <Form.Group className="mb-3" controlId="formBasicuserName">
            <Form.Label style={{ color: "white" }}>Username</Form.Label>
            <Form.Control
            ref={inputUsername}
              type="username"
              placeholder="Enter username"
              // value={username}
              // onChange={(e) => setUsername(e.target.value)}
            />
            <Form.Text className="text-muted">
              We'll never share your username with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label style={{ color: "white" }}>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check
              type="checkbox"
              label="To be designed"
              color="white"
              className="label-color"
            />
          </Form.Group>
          <Button
            variant="primary"
            type="submit"
            onClick={() => {
              handleSubmit()
              // navigate("/test");
            }}
          >
            Submit
          </Button>
          <ButtonSem animated>
      <ButtonSem.Content visible>Next</ButtonSem.Content>
      <ButtonSem.Content hidden>
        <Icon name='arrow right' />
      </ButtonSem.Content>
    </ButtonSem>
        </Form>

        {login_pass}
        {login_pass ? (
          <div id="failed_login">Wrong Username or password</div>
        ) : null}
      </div>
    </div>
  );
        }

// export  default Login;