import { Link,useNavigate } from "react-router-dom";
import React, { Component,useState,useEffect } from 'react';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import '../App.css';
function Login(){
    const navigate= useNavigate();
    const [userName, setuserName] = useState("");
    const [password, setPassword] = useState("");
    const [data, setData] = useState([]);
    const [login_pass,setLogin] = useState(false)
    function handleSubmit(event) {
      console.log(userName);
      console.log(password);
      event.preventDefault();
      const params = {
        userName : userName,
        password : password,
      }
      const res = JSON.stringify(params);
      console.log(res)
      fetch("/api/check_user",{
        method: 'POST',
        
        headers: { 'Content-Type': 'application/json','Accept':'application/json', 'Access-Control-Allow-Origin':'*' },
        body: res}).then(response => response.json()).then(data_retrived=>{
        console.log(data_retrived["valid"] )
        if(data_retrived["valid"] === true){
          console.log("valid user")
          setLogin(false)
          navigate("/main",{'test':"test"});
        }else{
          setLogin(true)
        }
  
      })
      ;
      
    }
    
    return (
            
        <div>

        <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicuserName">
          <Form.Label>Username</Form.Label>
          <Form.Control type="username" placeholder="Enter userName" value={userName} onChange={(e) => setuserName(e.target.value)}/>
          <Form.Text className="text-muted">
            We'll never share your userName with anyone else.
          </Form.Text>
        </Form.Group>
  
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password"  value={password} onChange={(e) => setPassword(e.target.value)}/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group>
        <Button variant="primary" type="submit" onClick={()=>{
            // navigate("/test");
        }}>
          Submit
        </Button>
      </Form>
      {login_pass}
      {login_pass ? <div id = "failed_login">Wrong Username or password</div>:null}

      </div>
)
    }

export default Login