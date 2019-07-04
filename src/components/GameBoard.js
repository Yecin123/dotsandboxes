
import React from 'react';

import {Button,Container,Row} from "react-bootstrap";

import {Square} from "./Square";

import "./styles/gameBoard.css";



export class GameBoard extends React.Component {



    constructor(props) {

        super(props);
        let wins  = [];
        this.state = {
            player:"red",
             scoreRed:0,
            scoreBlue:0,
            lines :[],
            matchIsOver:false,
            playerNames: {
                red: this.props.redPlayerName,
                blue: this.props.bluePlayerName
            }
        
        };

        
            
    }


    // render a square in the game
    renderSquare = (x,y)=> {
        return <Square coords={{x,y}}  lines={this.state.lines} win={this.checkWonSquare({x,y},this.state.lines)} player = {this.state.player}  playerNames = {this.state.playerNames}
        play={this.play} />;
    }


    // render a row of squares in the game
    renderRow = (n)=> {
        let row = [];
        for(var i=0;i<3;i++)
            row.push(this.renderSquare(i,n));
        return <Row> {row} </Row>
    }

    // render game board
    renderGrid = ()=> {
       let   grid = [];
        for(var i=0;i<3;i++)
            grid.push(this.renderRow(i));
        return grid;
    }


    // check if square closed by lines
    checkWonSquare = (coords,lines) => {


      
        let x = coords.x;
        let y = coords.y;
    
        
          let squareLines =  lines.filter(line=> {
    
               
          return line.first.x==x & line.first.y==y && line.second.x==x+1 && line.second.y==y
          || line.first.x==x && line.first.y==y && line.second.x==x && line.second.y==y+1
          || line.first.x==x+1 && line.first.y==y && line.second.x==x+1 && line.second.y==y+1
          || line.first.x==x && line.first.y==y+1 && line.second.x==x+1 && line.second.y==y+1;
                
      });
    
     
      let isClosed =  squareLines.length==4;
      
      //if (isClosed) closedByPlayer =  squareLines.sort((a,b)=> a.time.getTime() > b.time.getTime()).shift().player;

      return isClosed;
    
      }

      // get the total sum of all closed squares on the board
      getTotalWonSquares = (lines)=> {

        
       let sum = 0;
      
       for(var i=0;i<3;i++)
       for(var j=0;j<3;j++)
      if (this.checkWonSquare({x:i,y:j},lines)) 
        sum++;
        
       return sum;
      
      

      }

      // when a player play a line in the board
      play = (coords,pos,player)=> {

        console.log(coords,pos);
       
        let first = {};
        let second = {};
        
        switch (pos) {
          case "top" : first = {x:coords.x,y:coords.y}; second = {x:coords.x+1,y:coords.y};break;
          case "bottom" : first = {x:coords.x,y:coords.y+1}; second = {x:coords.x+1,y:coords.y+1};break;
          case "left" : first = {x:coords.x,y:coords.y}; second = {x:coords.x,y:coords.y+1};break;
          case "right" : first = {x:coords.x+1,y:coords.y}; second = {x:coords.x+1,y:coords.y+1};break;
        };
    
        
       
    
        let exist = this.state.lines.filter(line=> {
          return line.first.x==first.x && line.first.y==first.y && line.second.x==second.x && line.second.y==second.y;
        }).length > 0;
    
       
        if(exist) {
         
          return;
        }
    
        
    
        
    
        let lines = this.state.lines;
        let position = pos;
          
        // only top and left are used to identify the borders that needs to be colored in a square
        // this is used to evade the "double coloring of borders in the game" for better UX
        if (pos=="bottom" && coords.y<2) position="top";
        if (pos=="right" && coords.x<2) position="left";
        
    
        
       
    // we check here the changes on the game before and after adding a line on the board
        let win = false;
       let  score = player=="red" ?this.state.scoreRed:this.state.scoreBlue;

        let prevSum = this.getTotalWonSquares(lines);
      lines.push({first,second,player,position,time:new Date()});
      let  newSum= this.getTotalWonSquares(lines);
    

     if (newSum-prevSum> 0)  {
        win = true;
        score = score + newSum-prevSum;
     }
    


      
     
        
     // update state changes here 

        if (this.state.player=="red") 
        this.setState({scoreRed:score});
        else this.setState({
        scoreBlue:score
 
        });
    
      
        this.setState({
          lines,
        
          player: win ? this.state.player: (this.state.player=="red" ? "blue": "red"),
            matchIsOver : lines.length==24 ?true:false
        });

      
    
        
      }
     
      // message when the game is over
      getGameOverMessage() {

        let message = "Game Over ";
        if (this.state.scoreRed>this.state.scoreBlue) message = message + "player " + this.props.redPlayerName + " won !";
        else if (this.state.scoreBlue>this.state.scoreRed) message = message + "player " + this.props.bluePlayerName + " won !";
        else message = message  + " it's a tie";

        return <h1> {message}</h1>;
      }
    

    render() {

        return (
            
        <Container className="rootcontainer">
        {
            !this.state.matchIsOver ?
            <h2> player turn : {this.state.player=="red"?this.props.redPlayerName:this.props.bluePlayerName}</h2>
            :null
        }
        <h2> {this.props.redPlayerName} :  {this.state.scoreRed}  -     {this.state.scoreBlue} : {this.props.bluePlayerName} </h2>
        { this.state.matchIsOver? this.getGameOverMessage():null }
       { this.renderGrid()}
    
     
    </Container>
        );
    }
}