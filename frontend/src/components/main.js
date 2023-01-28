import React, { Component } from "react";
import { Form, Link } from "react-router-dom";
import "./main.css";
import Button from "react-bootstrap/Button";
import { AiOutlinePlus } from "react-icons/ai";
import WindowSize from "./windowSize";
import { useState, useEffect, useRef } from "react";
import ChatBox from "./chatbox";
import { Loading, Progress, SetDefault } from "react-loading-ui";
import { useParams, useLocation, redirect } from "react-router-dom";
import { Message } from "react-chat-ui";
function Main(props) {
  const [screenHeight, setScreenHeight] = useState(0);
  const [screenWidth, setScreenWidth] = useState(0);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const [username, setUsername] = useState(location.state.username);
  const [messageHistory, setMessageHistory] = useState([]);
  // Initializes # of chat sessions to 1, , see function handleNewChat
  // will be changed later with stored user info
  // const [chats, setChats] = useState([{ id: 0, name: "0" }]);
  const [chats, setChats] = useState([]);
  // allows user to match button with conversation content
  const add_message = (newMessage, id) => {
    setMessageHistory((prevMessageHistory) => {
      let newHistory = [...prevMessageHistory];
      newHistory[0][1].push(newMessage); // 0 should be id
      return newHistory;
    });
  };
  const [chatPages, setChatPages] = useState([]);

  // const [chats, setChats] = useState([

  // ]);
  // const [chatPages, setChatPages] = useState([

  // ]);
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
        console.log(data2["sorted_msgs"])
        for (let x = 0; x < data2["sorted_msgs"].length; x++) {
          
          const newChat = [data2["sorted_msgs"][x][0], []];

          for (let i = 0; i < data2["sorted_msgs"][x][1].length; i++) {
            if (data2["sorted_msgs"][x][1][i]["text"] !== "") {
              newChat[1].push(
                new Message({
                  id: data2["sorted_msgs"][x][1][i]["from"],
                  message: data2["sorted_msgs"][x][1][i]["text"],
                })
              );

              
            }
          }
          
          chats.push( { id: x.toString(), name: x.toString()})
          messageHistory.push(newChat)
          chatPages.push(<ChatBox
            id={x.toString()}
            key={x.toString()}
            conversation_id={newChat[0]}
            contents={[newChat]}
            add_msg_func={add_message}
            username={username}
            setMessageHistory={setMessageHistory}
          />,)
          
        }

        setLoading(false);

        Loading();
      });
  }, []);

  async function handleNewChat() {
    const newChat = { id: chats.length.toString(), name: `${chats.length}` };
    // setMessageHistory((prevArray) => [...prevArray, [[],[]]]);
    try {
      const response = await fetch("/api/new_conversation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });
      const data = await response.json();

      // setMessageHistory((prevArray) => {
      //   const newArray = [...prevArray];
      //   newArray.push([[data], []]);

      //   return newArray;
      // });
      messageHistory.push([[data["conversation_id"]], []])
    } catch (error) {
      console.error(error);
    }

    setChats([...chats, newChat]);
    console.log(messageHistory[chats.length])
    setChatPages([
      ...chatPages,
      <ChatBox
        id={newChat.id}
        key={newChat.id}
        conversation_id={messageHistory[messageHistory.length - 1][0]}
        contents={[messageHistory[chats.length]]}
        add_msg_func={add_message}
        username={username}
        setMessageHistory={setMessageHistory}
      />,
    ]);
  }

  const chatProperty = {
    float: "right",
    height: "100%",
    width: `65%`,
  };

  const handleTabs = (tabId) => {
    setChatPages(
      chatPages.map((page, index) => {
        if (chats[index].id === tabId) {
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
  };
  function handleTest() {
    console.log([messageHistory[0][2][1]])
    console.log(Array.isArray([messageHistory[0][2]][1]))
    
  }

  return (
    <div>
      <button id="test" onClick={handleTest}>
        fwafwafwafawfwfasfasf
      </button>

      <div style={{ height: "100%" }}>
        <div className="Left_panel">
          <React.Fragment>
            <Button
              variant="primary"
              style={{ borderColor: "white" }}
              onClick={handleNewChat}
            >
              <AiOutlinePlus
                style={{ position: "relative", right: "10px" }}
              ></AiOutlinePlus>
              New Chat
            </Button>
            {chats.map((chat) => (
              <Button
                variant="primary"
                style={{ borderColor: "white" }}
                onClick={() => handleTabs(chat.id)}
              >
                Chat Session {chat.name}
              </Button>
            ))}
          </React.Fragment>
        </div>
      </div>

      <div id="chat">
        {chatPages.map((page) => {
          if (page.props.active) {
            return page;
          }
        })}
      </div>
    </div>
  );
}

export default Main;
