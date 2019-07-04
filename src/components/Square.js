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
          // console.log(props.playerNames);
           let thisSquareAllLines = this.getAllSquareLines(props);
           
           let last = thisSquareAllLines[0];
           
           thisSquareAllLines.forEach(line=>  {
            if ( line.time.getTime() > last.time.getTime()) last = line; 
           });
          
          if (last.player=="red") {

            newStyle.push("background_red");
            
            this.setState({winner:props.playerNames.red})
              }

          if (last.player=="blue") {
            newStyle.push("background_blue");
            this.setState({winner:props.playerNames.blue})
        }


        }
        
       

   

      this.setState({styles:newStyle});
      

    }


    // get all the lines used correspondig to this square
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

            return squareLines;

    }

    // get the lines that will be colored in the grid 
    // this is not the same as getAllSquareLines() this returns only the "top" and "left" borders except
    // for squares in the bottom and right it returns all the borders 
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


    // get position of the mouse in the square
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

      
      // play a line
      playLine = (event)=> {
          let pos = this.getPos(event);
        
        
          this.props.play(this.props.coords,pos,this.props.player);
      }


      // show the line that will be played if clicked
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
