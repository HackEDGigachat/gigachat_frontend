import React, { Component } from "react";

import "./main.css";
import Button from "react-bootstrap/Button";
import { AiOutlinePlus } from "react-icons/ai";
import WindowSize from "./windowSize";
import { useState, useEffect, useRef } from "react";
import { ChatFeed, Message } from "react-chat-ui";

import { withRouter } from "react-router-dom";



function ChatBox(props) {
  const {active = false} = props;
  const [loading, setLoading] = useState(false);
  const [dummy,setDummy]= useState()
  const [message_history,setMessageHistory] = useState(props.contents)










    
  const inputRef = useRef(null);


  function handleClick(event) {
    const message_in = inputRef.current.value
    setLoading(true);

    // props.add_msg_func(new Message({
    //   id: 0,
    //   message: message_in,
    // }),props.id)

    setMessageHistory(prevMessageHistory => {
          
      let newHistory = [...prevMessageHistory];
      
      newHistory[0][1].push(new Message({ id: 0, message:message_in }));
      return newHistory;
    });
    console.log("my input " + message_in)
    inputRef.current.value=""
        
    const params = {
      username: props.username,
      message: message_in,
      conversation_id: props.conversation_id,
    };
    const res = JSON.stringify(params);
    
    fetch("/api/reply", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: res,
    })
      .then((response) => response.json())
      .then((dataRetrived) => {
        
        console.log(dataRetrived)
        setLoading(false);

        console.log(props.contents)
        console.log("---")
        // setDummy(dataRetrived["reply"])
        setMessageHistory(prevMessageHistory => {
          
          let newHistory = [...prevMessageHistory];
          
          newHistory[0][1].push(new Message({ id: 1, message: dataRetrived["reply"] }));
          return newHistory;
        });
      

        
      });
  }


  function handleTabs(id){
    let i, tabcontent;
    tabcontent = document.getElementsByName('chat')
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
  
    const chatBox = document.getElementById(id);
    chatBox.style.display = "block";
  }

  function handleTest(){
    console.log("use")
    console.log(message_history);
    console.log("props");
    console.log(props.contents[0][1])
  }



  return props.active ? (


    <div style={{ display: active ? "block" : "none" }}>
      

      
            <div id="main">
    
    <div id="chat" >
    <h1 className="chatHeader">{props.id === 1 ? "Chat page" : `Chat page ${props.id}`}</h1>
      <ChatFeed

        messages={props.contents[0][1]}
        isTyping={false} // Boolean: is the recipient typing
        hasInputField={false} // Boolean: use our input, or use your own
        showSenderName // show the name of the user who sent the message
        bubblesCentered={false} //Boolean should the bubbles be centered in the feed?
        maxHeight={window.innerHeight * 0.75}
        bubbleStyles={{
          text: {
            fontSize: 16,
          },
          chatbubble: {
            borderRadius: 70,
            padding: 20,
            
          },
        }}
      />
    </div>

    
    <div className="input">
      <input ref={inputRef} type="text" id="message" name="message" />

      <button id="send_msg" onClick={handleClick} disabled={loading}>
        Send
      </button>
      
      <button id="test" onClick={handleTest} >
        Test
      </button>
    </div>
  </div>

    </div>
  ) : null;
}

export default ChatBox;
