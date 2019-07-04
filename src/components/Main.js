import React from 'react';

import {Container,Row, Button} from "react-bootstrap";





export class Main extends React.Component {




    constructor(props) {
        super(props);

        this.state = {
            redPlayerName:"",
            bluePlayerName:""
        };
    }

    handleRedChange = (event)=> {
      this.setState({redPlayerName:event.target.value});
    }
    handleBlueChange = (event)=> {
        this.setState({bluePlayerName:event.target.value});
      }

    render() {

        return (
            <Container>
               <Row>
               <label>
                 Red Player Name:
                <input type="text" value={this.state.redPlayerName} name="red" onChange={this.handleRedChange} />
                </label>

                <label>
                Blue Player  Name:
                <input type="text" value={this.state.bluePlayerName} name="blue" onChange={this.handleBlueChange} />
                </label>
                </Row>
                <Row>
                <Button disabled={this.state.redPlayerName.length==0 && this.state.bluePlayerName.length==0} 
                 onClick={()=>this.props.startGame(this.state.redPlayerName,this.state.bluePlayerName)}
                variant="primary" size="lg" block>
                    Start Game 
                </Button>
            </Row>
            </Container>
        );

    }
}