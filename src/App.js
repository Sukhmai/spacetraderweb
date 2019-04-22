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
import firebase from './firebase';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
        player: null,
        difficulty : '',
        skills: [],
        name: '',
        loadName: '',
        open: false,
        loadGame: false,
        playerNotFound: false
    }
  }
    newGame = () => {
        this.setState({
            player: null,
            difficulty : 'Beginner',
            skills: ['','','',''],
            name: '',
        });
    }
    loadGame = () => {
        const itemsRef = firebase.database().ref('players');
        itemsRef.on('value', (snapshot) => {
            let players = snapshot.val();
            let player;
            let name = '';
            let difficulty = 'Beginner';
            let skills = [];
            for (let p in players) {
                if (players[p].name === this.state.loadName) {
                    player = {
                        id: p,
                        name: players[p].name,
                        difficulty: players[p].difficulty,
                        skills: players[p].skills,
                        cargoSize: players[p].cargoSize,
                        cargo: players[p].cargo,
                        fuel: players[p].fuel,
                        credits: players[p].credits,
                        location: players[p].location
                    };
                    name = players[p].name;
                    difficulty = players[p].difficulty;
                    skills = players[p].skills;
                }

            }
            if (player !== undefined) {
                this.setState({
                    player: player,
                    name: name,
                    difficulty: difficulty,
                    skills: skills,
                    loadGame: true
                });
                this.toggleLoadGame();
            } else {
                this.setState({playerNotFound: true});
            }

        });
    }

    toggleLoadGame = () => {
        this.setState({loadGame: !this.state.loadGame});
    }

  handleStart() {
    let totalSkills = 0;
    for (var i = 0; i < this.state.skills.length; i++) {
      totalSkills += parseInt(this.state.skills[i], 10);
    }
    if (totalSkills === 16) {
        if (this.state.player !== undefined && this.state.player !== null) {
            let p = this.state.player;
            p.name = this.state.name;
            p.difficulty = this.state.difficulty;
            p.skills = this.state.skills;
            this.props.updatePlayer(p);
        } else {
            this.props.createPlayer(this.state.name, this.state.difficulty, this.state.skills);
        }
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

  handleLoadNameChange = event => {
    this.setState({ loadName: event.target.value });
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
    return (
      <div>
      <center>
        <div className="App">
          <h1> SpaceTrader </h1>
            { this.state.player === null ?
                <center>
                    <Button variant="contained" onClick={() => this.toggleLoadGame()} color="secondary">{ this.state.loadGame ? "Back" : "Load Game"} </Button>
                </center>
                :
                <center>
                    <Button variant="contained" onClick={() => this.newGame()} color="primary"> New Game </Button>
                </center>
            }

            { this.state.loadGame ?
                <div>
                    <div className="fields">
                        <TextField label="Name" variant="outlined" className="textField" onChange={this.handleLoadNameChange}/>
                    </div>
                    <span> {this.state.playerNotFound ? "Player not found!" : null} </span>
                    <center>
                        <Button variant="contained" onClick={this.loadGame} color="primary"> Find Player </Button>
                    </center>
                </div>
                :
                <div>
                    <div className="fields">
                        <TextField label={this.state.player === null ? "Name" : ''} value={this.state.name} variant="outlined" className="textField" onChange={this.handleNameChange}/>
                    </div>
                    <div className ="fields">
                        <TextField label={this.state.player === null ? "Pilot Points" : ''} value={this.state.skills[0]} variant="outlined" className="textField" onChange={(e) => this.handleSkillChange(0, e)}/>
                    </div>
                    <div className ="fields">
                        <TextField label={this.state.player === null ? "Fighter Points" : ''} value={this.state.skills[1]} variant="outlined" className="textField" onChange={(e) => this.handleSkillChange(1, e)}/>
                    </div>
                    <div className ="fields">
                        <TextField label={this.state.player === null ? "Trader Points" : ''} value={this.state.skills[2]} variant="outlined" className="textField" onChange={(e) => this.handleSkillChange(2, e)}/>
                    </div>
                    <div className ="fields">
                        <TextField label={this.state.player === null ? "Engineer Points" : ''} value={this.state.skills[3]} variant="outlined" className="textField" onChange={(e) => this.handleSkillChange(3, e)}/>
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
            }

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
