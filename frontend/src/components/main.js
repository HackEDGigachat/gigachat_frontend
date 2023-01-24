import React, { Component } from "react";
import { Form, Link, useParams, useLocation } from "react-router-dom";
import "./main.css";
import Button from "react-bootstrap/Button";
import { AiOutlinePlus } from "react-icons/ai";
import WindowSize from "./windowSize";
import { useState, useEffect, useRef } from "react";
import { ChatFeed, Message } from "react-chat-ui";
import { Loading, Progress, SetDefault } from "react-loading-ui";
import { withRouter } from "react-router-dom";



function Main() {
  const [chatFeedArray,setChatFeedArray] = useState([]); // store [chatHistorymesssages, convo_id]
  const location = useLocation();
  const [messageHistory, setMessageHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState(location.state.username);
  const [currentChat, setCurrentChat] = useState(0);
  // const [curChatText, setCurChatText] = useState([]);
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
        
        
        setChatFeedArray(data2["sorted_msgs"])
     console.log(data2["sorted_msgs"])
    //  console.log(data2["sorted_msgs"][0][0],[] + "  fwqfqwfqwfqwf")
     
      for (let x = 0; x < data2["sorted_msgs"].length; x++){
        const newChat=[data2["sorted_msgs"][x][0],[]]

        for (let i = 0; i < data2["sorted_msgs"][x][1].length; i++) {
          if(data2["sorted_msgs"][x][1][i]["text"] !=""){
          newChat[1].push(new Message({
            id: data2["sorted_msgs"][x][1][i]["from"],
            message:data2["sorted_msgs"][x][1][i]["text"],
          }));

          if(i === data2["sorted_msgs"][x][1].length-1) {

            console.log(newChat+" ion loop")
              setMessageHistory(prevArray => [...prevArray,newChat])
              console.log(messageHistory+" hist1")
          }
        }}
      }
    
      console.log(messageHistory+" hist")
      
        
        setLoading(false);

        Loading()
        console.log(chatFeedArray )
      });
  }, []);

  function handleClick(event) {
    
    const message_in = inputRef.current.value
    setLoading(true);
    
    

    setMessageHistory(prevMessageHistory => {
      let newHistory = [...prevMessageHistory];
      newHistory[currentChat][1].push(new Message({ id: 0, message: message_in }));
      return newHistory;
    });
    

    
    inputRef.current.value=""
    console.log("current chat id "+chatFeedArray[currentChat][0])
    const params = {
      username: username,
      message: message_in,
      conversation_id: chatFeedArray[currentChat][0],
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
        console.log(dataRetrived["reply"]+" dfwqfqwfqwfqwf")
        

         
        setLoading(false);
        setMessageHistory(prevMessageHistory => {
          let newHistory = [...prevMessageHistory];
          newHistory[currentChat][1].push(new Message({ id: 1, message: dataRetrived["reply"] }));
          return newHistory;
        });

        console.log(messageHistory)

        
      });
      
  }
  function handleTest(event){
    // setCurrentChat(1);
    console.log(messageHistory);
  }

  return (
    <div id="main">
      <h1>Chat page </h1>

      <div id="chat">
       
      <ChatFeed
          messages={messageHistory.length >0 ?  messageHistory[currentChat][1] :[]}
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
        <button id="test" onClick={handleTest} disabled={loading}>test</button>
      </div>
    </div>
  );
}

export default Main;
