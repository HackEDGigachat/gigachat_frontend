import React, { Component } from "react";
import { Form, Link } from "react-router-dom";
import "../App.css";
import Button from "react-bootstrap/Button";
import { AiOutlinePlus } from "react-icons/ai";
import WindowSize from "./windowSize";
import { useState, useEffect, useRef } from "react";
import { ChatFeed, Message } from "react-chat-ui";
// class Test extends Component {

//     constructor(props){
//         super(props)
//     }
//     state = {
//     screenHeight: 0,
//     screenWidth: 0,
//     };

//     chatProperty = {
//         float: 'right',
//         height: '100%',
//         width: `65%`,

//      };

//     handleTabs(buttonName) {

//         let i, tabcontent, tablinks = 0;
//         tabcontent = document.getElementsByClassName("tabcontent");
//         for (i = 0; i < tabcontent.length; i++) {
//             tabcontent[i].style.display = "none";
//           }

//         tablinks = document.getElementsByClassName("tablinks");
//         for (i = 0; i < tablinks.length; i++) {
//         tablinks[i].className = tablinks[i].className.replace(" active", "");
//         }

//         const chatBox = document.getElementById(buttonName);
//         chatBox.style.display = "block";

//       }

//       handleWindowSize = (screenHeight, screenWidth) => {

//         this.setState({ screenHeight, screenWidth });
//       }

//     render() {
//         // const data = props.data;

//         return (
//             // main parent div
//             <div style={{ height: '100%' }}>

//                     <div className="Left_panel">
//                     <React.Fragment>
//                     <Button variant="primary" style={{"borderColor":"white"}} >
//                     <AiOutlinePlus style={{"position":"relative","right":"10px"}}></AiOutlinePlus>
//                         New Chat</Button>
//                     <Button variant="primary" style={{"borderColor":"white"}} onClick={() => this.handleTabs("alpha")}>Chat Session 1</Button>
//                     <Button variant="primary" style={{"borderColor":"white"}} onClick={() => this.handleTabs("beta")}> Chat Session 2</Button>
//                     <Button variant="primary" style={{"borderColor":"white"}} onClick={() => this.handleTabs("gamma")}> Chat Session 3</Button>

//                     </React.Fragment>
//                     </div>

//                 <div id="alpha" className="tabcontent" style={this.chatProperty}>
//                     <h3>Chat session 1</h3>
//                     {this.props.data}

//                 </div>

//                 <div id="beta" className="tabcontent" style={this.chatProperty}>
//                     <h3>Chat Session 2</h3>
//                     <p>Context</p>
//                 </div>

//                 <div id="gamma" className="tabcontent" style={this.chatProperty}>
//                     <h3>Chat Session 3</h3>
//                     <p>Context</p>
//                 </div>

//             </div>
//             //main parent div closing
//         );
//     }
// }

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      message: "",
      reply: "",
      updated: "",
      message_history: [],
    };
    this.inputRef = React.createRef();
  }

  componentDidMount() {
    const params = {
      username: "rpi_user",
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
        console.log("hi");
        console.log(data2);
        this.setState({ data: data2["sorted_msgs"] });
        for (let i = 0; i < this.state.data.length; i++) {
          this.setState(prevState => ({
            message_history: prevState.message_history.concat(
              new Message({
                id: this.state.data[i]["from"],
                message: this.state.data[i]["text"],
              }), 
            )
        }))
        }
      });
  }

  handleClick = (event) => {
    this.setState({ updated: this.inputRef.current.value });
    const params = {
      message: this.inputRef.current.value,
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
      .then((data_retrived) => {
        console.log(data_retrived["reply"]);
        this.setState({ reply: data_retrived["reply"] });
      });
  };

  render() {
    return (
      <div>
        <h1>Chat page</h1>
        <input ref={this.inputRef} type="text" id="message" name="message" />
        <div>Your message: {this.state.updated}</div>
        <button onClick={this.handleClick}>Send</button>
        <div>chat gpt reply: {this.state.reply}</div>
        <ChatFeed
          messages={this.state.message_history} // Array: list of message objects
          isTyping={this.state.is_typing} // Boolean: is the recipient typing
          hasInputField={false} // Boolean: use our input, or use your own
          showSenderName // show the name of the user who sent the message
          bubblesCentered={false} //Boolean should the bubbles be centered in the feed?
          // JSON: Custom bubble styles
          bubbleStyles={{
            text: {
              fontSize: 30,
            },
            chatbubble: {
              borderRadius: 70,
              padding: 40,
            },
          }}
        />
      </div>
    );
  }
}

export default Main;
