import React, {Component} from "react";
import { Link } from "react-router-dom";
import '../App.css';
import Button from 'react-bootstrap/Button';
import { AiOutlinePlus } from 'react-icons/ai';
import WindowSize from "./windowSize";
import { useState, useEffect } from 'react';

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

function Test(){
    const [data, setData] = useState([]);
    useEffect(()=>{
        fetch("/api/data",{
          mode: 'no-cors',}).then(response => response.json().then(data2=>{
          console.log("hi")
          console.log(data2)
          setData(data2);
    
          console.log(data)
        })
          );
      },[]
      )

      return (
        "Hello world"
      )
}
 
export default Test;


