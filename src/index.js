import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Marketplace from './Marketplace';
import Travel from './Travel';
import Universe from './Universe';


class Index extends Component {

  constructor(props) {
    super(props);
    this.state = {
      player: {
        cargoSize: 5,
        cargo: [{item: {
          "name": "Gas",
          "price": 43
        }}],
        fuel: 500,
        credits: 200
      },
      location: "Axion",
      screen: "App",
      planets: this.generatePlanets(),
      events: this.generateEvents(),
      techLevel: 0
    }
  }

  generatePlanet(name, x, y) {
    return {
      planet: {
        "name" : name,
        "x" : x,
        "y" : y,
        "tech" : parseInt(Math.random() * 7, 10),
        "resource" : parseInt(Math.random() * 7, 10)
      }
    }
  }

  generatePlanets() {
    return [
      this.generatePlanet("Axion", 100, 100),
      this.generatePlanet("Poxi", 85, 87),
      this.generatePlanet("Carnos", 56, 44),
      this.generatePlanet("Fallos", -78, 44),
      this.generatePlanet("Xona", -23, -11),
      this.generatePlanet("Crasa", -67, 100),
      this.generatePlanet("Joli", -89, -20),
      this.generatePlanet("Moke", 49, 37),
      this.generatePlanet("Lekas", 23, 21),
      this.generatePlanet("Mystos", 99, -90),
      this.generatePlanet("Shyla", 34, 63)
    ]
  }

    generateEvent(title, description) {
        return {
            event: {
              "title": title,
              "description": description
            }
        }
    }

    generateEvents() {
        return [
            this.generateEvent("Pirate boards your ship", "A pirate boarded your ship and managed to steal an item from your cargo."),
            this.generateEvent("Incoming Asteroid", "An asteroid is heading towards you, so you maneuver and lose some extra fuel"),
            this.generateEvent("Pirate Chase", "A pirate ship is attempting to board your ship. You spend more fuel to evade them"),
            this.generateEvent("Asteroid Belt","You encounter an asteroid belt. Your ship gets severely damaged causing you to lose cargo and fuel")
        ]
    }

    setCargo = (cargo) => {
        let p = this.state.player;
        p.cargo = cargo;
        this.setState({player: p});
    }

    setFuel = (fuel) => {
        let p = this.state.player;
        p.fuel = fuel;
        this.setState({player: p});
    }

    setLocation = (location) => {
        this.setState({location: location});
        this.state.planets.forEach((element) => {
            if (element.planet.name === location) {
                this.setState({techLevel: element.planet.tech});
            }
        })
    }

  setTechLevel() {
    for (var i = 0; i < this.state.planets.length; i++) {
      if (this.state.planets[i].planet.name === this.state.location) {
        this.setState({
          techLevel : this.state.planets[i].planet.tech
        })
      }
    }
  }

  addItem(item, credits) {
    let player = this.state.player;
    player.cargo.push(item);
    player.credits = player.credits - credits;
    this.setState({
      player: player
    });
  }

  removeItem(item, credits) {
    let player = this.state.player;
    player.cargo.pop(item);
    player.credits = player.credits + credits;
    this.setState({
      player: player
    });
  }

  startGame() {
    this.setState({
      screen: "Travel"
    })
    this.setTechLevel();
  }

  changeScreen(newScreen) {
    this.setState({
      screen: newScreen
    });
  }

  render() {
    if (this.state.screen === "App") {
      return(
        <App startGame={() => this.startGame()}/>
      )
    } else if (this.state.screen === "Marketplace") {
      return (
        <Marketplace
          player={this.state.player}
          techLevel={this.state.techLevel}
          addItem={(item, credits) => this.addItem(item, credits)}
          sellItem={(item, credits) => this.removeItem(item, credits)}
          changeScreen={(newScreen) => this.changeScreen(newScreen)}
        />
      )
    } else if (this.state.screen === "Travel") {
      return (
        <Travel
          changeScreen={(newScreen) => this.changeScreen(newScreen)}
          player={this.state.player}
        />
      )
    } else if (this.state.screen === "Universe") {
      return (
        <Universe
          changeScreen={(newScreen) => this.changeScreen(newScreen)}
          player={this.state.player}
          planets={this.state.planets}
          events={this.state.events}
          setCargo={this.setCargo}
          setFuel={this.setFuel}
          setLocation={this.setLocation}
          location={this.state.location}
        />
      )
    }
  }
}

ReactDOM.render(<Index />, document.getElementById('root'));
