import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Marketplace from './Marketplace';

class Index extends Component {

  constructor(props) {
    super(props);
    this.state = {
      player: {},
      location: "Castor",
      screen: "App"
    }
  }

  startGame() {
    this.setState({
      screen: "Marketplace"
    })
  }

  render() {
    if (this.state.screen === "App") {
      return(
        <App startGame={() => this.startGame()}/>
      )
    } else if (this.state.screen === "Marketplace") {
      return (
        <Marketplace />
      )
    }
  }
}

ReactDOM.render(<Index />, document.getElementById('root'));
