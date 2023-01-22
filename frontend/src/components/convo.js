import React, { Component } from "react";
import { Form, Link } from "react-router-dom";
import './main.css';
import Button from 'react-bootstrap/Button';
import { AiOutlinePlus } from 'react-icons/ai';
import WindowSize from "./windowSize";
import { useState, useEffect,useRef } from 'react';

function Convo(props){
    const [screenHeight, setScreenHeight] = useState(0);
    const [screenWidth, setScreenWidth] = useState(0);
    const [chats, setChats] = useState([
        {id: 1, name: 'Chat Session 1'},
        {id: 2, name: 'Chat Session 2'},
        {id: 3, name: 'Chat Session 3'},
    ]);

    const handleNewChat = () => {
        const newChat = {id: chats.length+1, name: `Chat Session ${chats.length+1}`};
        setChats([...chats, newChat]);
    }




    const chatProperty = { 
        float: 'right', 
        height: '100%', 
        width: `65%`,
    };

    const handleTabs = (buttonName) => {
        let i, tabcontent, tablinks = 0;
        tabcontent = document.getElementsByClassName("tabcontent");
        for (i = 0; i < tabcontent.length; i++) {
            tabcontent[i].style.display = "none";
        }

        tablinks = document.getElementsByClassName("tablinks");
        for (i = 0; i < tablinks.length; i++) {
            tablinks[i].className = tablinks[i].className.replace(" active", "");
        }

        const chatBox = document.getElementById(buttonName);
        chatBox.style.display = "block";
    }

    const handleWindowSize = (screenHeight, screenWidth) => {
        setScreenHeight(screenHeight);
        setScreenWidth(screenWidth);
    }

    return (
        <div style={{ height: '100%' }}>
            <div className="Left_panel">
                <React.Fragment>
                    <Button variant="primary" style={{"borderColor":"white"}} onClick={handleNewChat}>
                        <AiOutlinePlus style={{"position":"relative","right":"10px"}}></AiOutlinePlus>
                        New Chat</Button>
                        {chats.map((chat) => (
                        <Button variant="primary" style={{"borderColor":"white"}} onClick={() => handleTabs(chat.name)}>{chat.name}</Button>
                    ))}
                    {/* <Button variant="primary" style={{"borderColor":"white"}} onClick={() => props.handleTabs("alpha")}>Chat Session 1</Button>
                    <Button variant="primary" style={{"borderColor":"white"}} onClick={() => props.handleTabs("beta")}> Chat Session 2</Button>
                    <Button variant="primary" style={{"borderColor":"white"}} onClick={() => props.handleTabs("gamma")}> Chat Session 3</Button> */}
                </React.Fragment>
            </div>

            {/* <div id="alpha" className="tabcontent" style={chatProperty}>
                <h3>Chat session 1</h3>
                {props.data}
            </div>

            <div id="beta" className="tabcontent" style={chatProperty}>
                <h3>Chat Session 2</h3>
                <p>Context</p>
            </div>

            <div id="gamma" className="tabcontent" style={chatProperty}>
                <h3>Chat Session 3</h3>
                <p>Context</p>
            </div> */}
        </div>
    );
}

export default Convo;
