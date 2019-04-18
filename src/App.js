import React, { Component } from 'react';
import './App.css';
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      difficulty : "Easy",
      skills: [0, 0, 0, 0]
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

  render() {
    return (
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
          <FormControl component="fieldset">
            <RadioGroup
              aria-label="Gender"
              name="gender1"
              value={this.state.value}
              onChange={this.handleChange}
            >
              <FormControlLabel value="Beginner" control={<Radio />} label="Beginner" />
              <FormControlLabel value="Easy" control={<Radio />} label="Easy" />
              <FormControlLabel value="Medium" control={<Radio />} label="Medium" />
              <FormControlLabel value="Hard" control={<Radio />} label="Hard" />
            </RadioGroup>
          </FormControl>
          <center>
          <Button variant="contained" color="secondary"className="Go"> Go </Button>
          </center>
        </div>
      </center>
    );
  }
}

export default App;
