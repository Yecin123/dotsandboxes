
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
            wins:wins
        
        };

        
            
    }

    renderSquare = (x,y)=> {
        return <Square coords={{x,y}}  lines={this.state.lines} win={this.checkWonSquare({x,y},this.state.lines)} player={this.state.player} redPlayerName={this.props.redPlayerName} bluePlayerName={this.props.bluePlayerName}
        play={this.play} />;
    }

    renderRow = (n)=> {
        let row = [];
        for(var i=0;i<3;i++)
            row.push(this.renderSquare(i,n));
        return <Row> {row} </Row>
    }
    renderGrid = ()=> {
       let   grid = [];
        for(var i=0;i<3;i++)
            grid.push(this.renderRow(i));
        return grid;
    }

    checkWonSquare = (coords,lines) => {


      
        let x = coords.x;
        let y = coords.y;
    
        
          let squareLines =  lines.filter(line=> {
    
               
          return line.first.x==x & line.first.y==y && line.second.x==x+1 && line.second.y==y
          || line.first.x==x && line.first.y==y && line.second.x==x && line.second.y==y+1
          || line.first.x==x+1 && line.first.y==y && line.second.x==x+1 && line.second.y==y+1
          || line.first.x==x && line.first.y==y+1 && line.second.x==x+1 && line.second.y==y+1;
                
      });
    
      return squareLines.length==4;
    
      }
      getTotalWonSquares = (lines)=> {

        
       let sum = 0;
      
       for(var i=0;i<3;i++)
       for(var j=0;j<3;j++)
      if (this.checkWonSquare({x:i,y:j},lines)) 
        sum++;
        
       return sum;
      
      

      }

      play = (coords,pos,player)=> {

        console.log(coords,pos,this.state.wins);
       
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
          
    
        if (pos=="bottom" && coords.y<2) position="top";
        if (pos=="right" && coords.x<2) position="left";
        
    
        
       
       
        let win = false;
       let  score = player=="red" ?this.state.scoreRed:this.state.scoreBlue;

        let prevSum = this.getTotalWonSquares(lines);
      lines.push({first,second,player,position,time:new Date()});
      let  newSum= this.getTotalWonSquares(lines);
    

     if (newSum-prevSum> 0)  {
        win = true;
        score = score + newSum-prevSum;
     }
    


      
     
        

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
        <h2> player turn : {this.state.player=="red"?this.props.redPlayerName:this.props.bluePlayerName}</h2>
        <h2> {this.props.redPlayerName} :  {this.state.scoreRed}  -     {this.state.scoreBlue} : {this.props.bluePlayerName} </h2>
        { this.state.matchIsOver? this.getGameOverMessage():null }
       { this.renderGrid()}
    
     
    </Container>
        );
    }
}