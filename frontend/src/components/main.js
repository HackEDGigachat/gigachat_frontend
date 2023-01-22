import React, { Component } from "react";
import { Form, Link, useParams, useLocation, redirect } from "react-router-dom";
import "./main.css";
import Button from "react-bootstrap/Button";
import { AiOutlinePlus } from "react-icons/ai";
import WindowSize from "./windowSize";
import { useState, useEffect, useRef } from "react";
import { ChatFeed, Message } from "react-chat-ui";
import { Loading, Progress, SetDefault } from "react-loading-ui";
import { withRouter } from "react-router-dom";
import Convo from "./convo.js"


function Main() {
  const location = useLocation();
  const [data, setData] = useState([]);
  const [message_input, setMessage] = useState("");
  const [reply, setReply] = useState("");
  const [updated, setUpdated] = useState("");
  const [messageHistory, setMessageHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState(location.state.username);
  
  const [tab,setTab] = useState('alpha')

  const inputRef = useRef(null);

  useEffect(() => {
    Loading({
      title: "Loading Previous Messages",
    });
    setLoading(true);
    const params = {
      username: username,
    };
    const res = JSON.stringify(params);
    fetch("/api/get_history", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: res,
    })
      .then((response) => response.json())
      .then((data2) => {
        
        

        // console.log(data2["sorted_msgs"]);

        for (let i = 0; i < data2["sorted_msgs"].length; i++) {
        
          setMessageHistory(prevArray => [...prevArray,new Message({
            id: data2["sorted_msgs"][i]["from"],
            message:data2["sorted_msgs"][i]["text"],
          })
        ]
          )
          
          
        }
        setLoading(false);

        Loading()
      });
  }, []);

  function handleClick(event) {
    const message_in = inputRef.current.value
    setLoading(true);
    setMessageHistory(prevArray => [...prevArray,new Message({
      id: 0,
      message: message_in,
    })
  ]
    )
    inputRef.current.value=""
        
    const params = {
      username: username,
      message: message_in,
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
        
        setReply(dataRetrived["reply"]);
        setLoading(false);
        setMessageHistory(prevArray => [...prevArray,new Message({
          id: 1,
          message: dataRetrived["reply"],
        })
      ]
        )
        
      });
  }



  
  return (


    <div>
      <h1>{tab}</h1>
      <Convo handleTabs = {tab => setTab(tab)} />
      
    <div id="main">
      <h1 class="chatHeader">Chat page </h1>


      
      <div id="chat" >
        <ChatFeed
          // messages={state.message_history.slice(
          //   Math.max(
          //     state.message_history.length - state.message_load,
          //     1
          //   )
          // )} // Array: list of message objects
          messages={messageHistory}
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
      </div>
    </div>

    </div>
  );
}

export default Main;
