import React, { Component } from "react";
import { Form, Link } from "react-router-dom";
import './main.css';
import Button from 'react-bootstrap/Button';
import { AiOutlinePlus } from 'react-icons/ai';
import WindowSize from "./windowSize";
import { useState, useEffect,useRef } from 'react';
import ChatBox from "./chatbox"
function Main(props){
    const [screenHeight, setScreenHeight] = useState(0);
    const [screenWidth, setScreenWidth] = useState(0);


    // Initializes # of chat sessions to 1, , see function handleNewChat
    // will be changed later with stored user info
    const [chats, setChats] = useState([
        {id: 1, name: '1'},
      ]);
      // allows user to match button with conversation content
    
    const [chatPages, setChatPages] = useState([
        <ChatBox id={chats[0].name}/>,
        
      ]);


    const handleNewChat = () => {
        const newChat = {id: chats.length+1, 
            name: `${chats.length+1}`};
        setChats([...chats, newChat]);
        setChatPages([...chatPages,<ChatBox id={newChat.id} key={newChat.id} />]);
    }



    const chatProperty = { 
        float: 'right', 
        height: '100%', 
        width: `65%`,
    };

    const handleTabs = (tabId) => {
        setChatPages(
            chatPages.map((page, index) => {
                if (chats[index].id === tabId) {
                    console.log('id matches chatbox')
                    return React.cloneElement(page, { active: true });
                } else {
                    return React.cloneElement(page, { active: false });
                }
            })
        );
    };
    

    const handleWindowSize = (screenHeight, screenWidth) => {
        setScreenHeight(screenHeight);
        setScreenWidth(screenWidth);
    }

    return (
        <div>
        <div style={{ height: '100%' }}>
            <div className="Left_panel">
                <React.Fragment>
                    <Button variant="primary" style={{"borderColor":"white"}} onClick={handleNewChat}>
                        <AiOutlinePlus style={{"position":"relative","right":"10px"}}></AiOutlinePlus>
                        New Chat</Button>
                        {chats.map((chat) => (
                        <Button variant="primary" style={{"borderColor":"white"}} onClick={() => handleTabs(chat.id)}>Chat Session {chat.name}</Button>
                    ))}

                </React.Fragment>



            </div>
            
            

        </div>
        
        <div id="chat" >
        
                {chatPages.map((page) => {
                    if(page.props.active) {
                        return page;
                    }
                })}
            </div>

        </div>
    );
}

export default Main;
