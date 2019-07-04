import React from 'react';

import "./styles/Square.css";





export class Square extends React.Component {



    constructor(props) {
        super(props);

        console.log("square win",this.props.win);
       
        //this.getSquareLines(this.props);
       
        this.state = {
           
            styles :["square"],
            winner:"",
            win:this.props.win
           
            
            
        };
    }

    componentWillReceiveProps(props) {
      let squareLines =  this.getSquareLines(props);
      console.log(this.props.win);
     // console.log("my square lines",squareLines);
        let newStyle = ["square"] 
      squareLines.forEach(el=> {
        newStyle.push(el.position + "_" + el.player);
    
        });

     //   console.log(newStyle);

       if (props.win) {
            let last = squareLines.sort( (a,b)=>a.time.getTime()> b.time.getTime()).shift();
            console.log(last);
        if (last.player=="red") {
            newStyle.push("background_red");
            this.setState({winner:props.redPlayerName})
        }
        if (last.player="blue") {
            newStyle.push("background_blue");
            this.setState({winner:props.bluePlayerName})
        }
       }

     /* let allSquareLines = this.getAllSquareLines(props);
    
      if (allSquareLines.length==4) {

        if (  allSquareLines.filter(line=>line.player=="red").length==4 && ! this.state.styles.indexOf("background_red")>-1 ) {
            
            
            newStyle.push("background_red");
           this.state.winner = this.props.redPlayerName;


        }
        if (  allSquareLines.filter(line=>line.player=="blue").length==4 && ! this.state.styles.indexOf("background_blue")>-1) {

        
          newStyle.push("background_blue");
          this.state.winner = this.props.bluePlayerName;
         
        }
       

      } */

    //  console.log("new style here" ,newStyle)

      this.setState({styles:newStyle});
      

    }

    getAllSquareLines = (props)=> {

        let x = this.props.coords.x;
        let y = this.props.coords.y;

        let squareLines =  props.lines.filter(line=> {

          
            return line.first.x==x & line.first.y==y && line.second.x==x+1 && line.second.y==y
            || line.first.x==x && line.first.y==y && line.second.x==x && line.second.y==y+1
            || line.first.x==x+1 && line.first.y==y && line.second.x==x+1 && line.second.y==y+1
            || line.first.x==x && line.first.y==y+1 && line.second.x==x+1 && line.second.y==y+1;
                  
        });

        console.log("All",squareLines);

            return squareLines.length==4;

    }

    getSquareLines = (props)=> {

        
        let x = this.props.coords.x;
        let y = this.props.coords.y;

        let squareLines =  props.lines.filter(line=> {

            return Math.min(line.first.x,line.second.x)==x && Math.min(line.first.y,line.second.y)==y 
                   || (x==2 && Math.min(line.first.x,line.second.x)==3 && Math.min(line.first.y,line.second.y)==y )
                   || (y==2 && Math.min(line.first.y,line.second.y)==3 && Math.min(line.first.x,line.second.x)==x );
        });

       console.log(squareLines,props.coords) ;

       return squareLines;
       
       
    }   

    getPos  = (event)=> {
        var bounds = event.target.getBoundingClientRect();
    
       //    console.log(bounds);
        var x = event.clientX - bounds.left;
        var y =event.clientY - bounds.top;

       // console.log(x,y,bounds.width,bounds.height,this.props.coords.x);
    
        let max = Math.max(Math.abs(x),Math.abs(y));
        
       let pos = "top";
        if(max==x) {
            if(y>bounds.height-x && x<bounds.width && y<bounds.height) pos="right";
           // else pos="top";
        }
        else {
            if(y>bounds.height-x && y<bounds.height && x<bounds.width ) pos="bottom";
            else pos="left";
        }

        
       return pos;  
        
    
      }

      

      playLine = (event)=> {
          let pos = this.getPos(event);
        
        
          this.props.play(this.props.coords,pos,this.props.player);
      }



     hoverLine = (event)=> {
         
      
         
          
      }



   

    render() {

      
        return (
            <span>      
        
            <div 
            onMouseDown={this.playLine}
           onMouseMove = {this.hoverLine}
            className={this.state.styles.join(' ')} 
            
            >
            <span className="player">
            { this.state.winner}
          
                </span>
          </div>
          </span>
        );
    }
}
