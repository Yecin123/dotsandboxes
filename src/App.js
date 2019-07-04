import React from 'react';

import './App.css';

import {Row, Container} from "react-bootstrap";



import {Square} from "./components/Square";


import { Main } from './components/Main';
import { GameBoard } from './components/GameBoard';




class App extends React.Component {



  constructor(props) {
    super(props);
   
    this.state = {
      
      main:true,
      redPlayerName:"",
      bluePlayerName:""
      
    };

    

   
  }

  // start a game
  startGame  = (redPlayerName,bluePlayerName) =>{

    this.setState({
      main:false,
      redPlayerName,
      bluePlayerName
      
    });
  }

  


  
 

  render() {

    if (this.state.main) return <Main startGame={this.startGame}/>;
    else 
    return <GameBoard redPlayerName={this.state.redPlayerName} bluePlayerName={this.state.bluePlayerName} />;
  }
}


export default App;
