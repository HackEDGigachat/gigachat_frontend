import { Link,useNavigate  } from "react-router-dom";
import React, { Component,useState,useEffect } from 'react';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import NavBar from './navbar_login.js';
import './login.css';


function Login(){
    const navigate= useNavigate();
    const [userName, setUsername] = useState("");
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
          setUsername(userName);
          
          navigate("main",{state:{username:userName,}});
        }else{
          setLogin(true)
        }
  
      })
      ;
      
    }


    
    
    return (
     
            
        <div>
            

            <div>
            <NavBar/>
            </div>
              <video width='100%' height='100%' controls={false} loop={true}>
            <source src="http://localhost:5000/video" type="video/mp4"/>
            </video>



        <div className = "loginForm">
        <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicuserName">
          <Form.Label style={{color:'white'}}>Username</Form.Label>
          <Form.Control type="username" placeholder="Enter userName" value={userName} onChange={(e) => setUsername(e.target.value)}/>
          <Form.Text className="text-muted">
            We'll never share your userName with anyone else.
          </Form.Text>
        </Form.Group>
  
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label style={{color:'white'}}>Password</Form.Label>
          <Form.Control type="password" placeholder="Password"  value={password} onChange={(e) => setPassword(e.target.value)}/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="To be designed" color='white' className='label-color'/>
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
      </div>
 
)
    }

export default Login