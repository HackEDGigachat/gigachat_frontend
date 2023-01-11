import { Link,useNavigate } from "react-router-dom";
import React, { Component,useState,useEffect } from 'react';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
function Login(){
    const navigate= useNavigate();
    const [userName, setuserName] = useState("");
    const [password, setPassword] = useState("");
    const [data, setData] = useState([]);
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
        body: res}).then(response => response.json()).then(data2=>{
        setData(data2);
        console.log(data2)
  
      })
      ;
      
    }
    // useEffect(()=>{
    //   fetch("/api/check_user",{
    //     method: "GET",
    //     mode: 'no-cors',}).then(response => response.json().then(data2=>{
    //     console.log("hi")
    //     console.log(data2)
    //     setData(data2);
  
    //     console.log(data)
    //   })
    //     );
    // },[]
    // )
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

      </div>
)
    }

export default Login