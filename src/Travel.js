import React, { Component } from 'react';
import Button from '@material-ui/core/Button';

class Travel extends Component {

  render() {
    return(
    <center>
      <Button variant="contained" onClick={() => this.props.changeScreen("Marketplace")} color="secondary"> Marketplace </Button>
    </center>
    )
  }
}

export default Travel;
