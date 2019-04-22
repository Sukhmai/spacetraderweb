import React, { Component } from 'react';
import { Text, View } from 'react';
import Button from '@material-ui/core/Button';

class Travel extends Component {

  render() {
    return(
    <center>
      <Button variant="contained" onClick={() => this.props.changeScreen("Marketplace")} color="secondary"> Marketplace </Button>
      <h1 />
      <span>Fuel: {this.props.player.fuel} </span>
      <h1 />
      <Button variant="contained" onClick={() => this.props.changeScreen("Universe")} color="secondary"> Travel </Button>
    </center>
    )
  }
}

export default Travel;
