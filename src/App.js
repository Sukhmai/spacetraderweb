import React, { Component } from 'react';
import './App.css';
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      difficulty : this.props.player === null ? "Beginner" : this.props.player.difficulty,
      skills: this.props.player === null ? [0, 0, 0, 0] : this.props.player.skills,
      name: this.props.player === null ? '' : this.props.player.name,
      open: false
    }
  }

  handleStart() {
    let totalSkills = 0;
    for (var i = 0; i < this.state.skills.length; i++) {
      totalSkills += parseInt(this.state.skills[i], 10);
    }
    if (totalSkills === 16) {
        this.props.createPlayer(this.state.name, this.state.difficulty, this.state.skills);
        this.props.startGame();
    } else {
      this.setState({
        open: true
      })
    }
  }

  handleDifficultyChange = event => {
    this.setState({ difficulty: event.target.value });
  };

  handleNameChange = event => {
    this.setState({ name: event.target.value });
  }

  handleSkillChange(type, event) {
      let newSkills = this.state.skills;
      newSkills[type] = event.target.value;
      this.setState({
        skills: newSkills
      });
  }

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
      // console.log(this.props.player.name);
    return (
      <div>
      <center>
        <div className="App">
          <h1> SpaceTrader </h1>
              <div className="fields">
              <TextField label="Name" variant="outlined" className="textField" onChange={this.handleNameChange}/>
              </div>
              <div className ="fields">
              <TextField label="Pilot Points" variant="outlined" className="textField" onChange={(e) => this.handleSkillChange(0, e)}/>
              </div>
              <div className ="fields">
              <TextField label="Fighter Points" variant="outlined" className="textField" onChange={(e) => this.handleSkillChange(1, e)}/>
              </div>
              <div className ="fields">
              <TextField label="Trader Points" variant="outlined" className="textField" onChange={(e) => this.handleSkillChange(2, e)}/>
              </div>
              <div className ="fields">
              <TextField label="Engineer Points" variant="outlined" className="textField" onChange={(e) => this.handleSkillChange(3, e)}/>
              </div>
          <div>
            <FormControl component="fieldset">
              <RadioGroup
                aria-label="Gender"
                name="gender1"
                value={this.state.difficulty}
                onChange={this.handleDifficultyChange}
              >
                <FormControlLabel value="Beginner" control={<Radio />} label="Beginner" />
                <FormControlLabel value="Easy" control={<Radio />} label="Easy" />
                <FormControlLabel value="Medium" control={<Radio />} label="Medium" />
                <FormControlLabel value="Hard" control={<Radio />} label="Hard" />
                <FormControlLabel value="Impossible" control={<Radio />} label="Impossible" />
              </RadioGroup>
            </FormControl>
          </div>
          <center>
          <Button variant="contained" onClick={() => this.handleStart()} color="secondary"className="Go"> Go </Button>
          </center>
        </div>
      </center>
      <div>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Error"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              You must allocate 16 credits
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary" autoFocus>
              OK
            </Button>
          </DialogActions>
        </Dialog>
        </div>
      </div>
    );
  }
}

export default App;
