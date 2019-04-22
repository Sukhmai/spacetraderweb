import React, { Component, Text, View } from 'react';
import Select from 'react-select'
import Button from '@material-ui/core/Button';

class Universe extends Component {

    constructor(props) {
        super(props);
        this.state = {
            encounterTitle: '',
            encounterDescription: '',
            destination: '',
            distance: 0,
            fuel: 0

        }
    }

    handleInput = (event) => {
        this.setState({ destination: event.value });
        this.calculateDistance(event.value);

    };

    handleTravel() {
        let random = parseInt(Math.random() * 6);
        let cargo = [];
        cargo = this.props.player.cargo;
        let fuel = this.props.player.fuel;
        if (random === 0) {
            if (this.props.player.cargo && this.props.player.cargo.length > 0) {
                cargo.splice(0, 1);
                this.props.setCargo(cargo);
            }
            this.setState({encounterTitle: this.props.events[random].event.title});
            this.setState({encounterDescription: this.props.events[random].event.description});
        } else if (random === 1 || random === 3) {
            if (this.props.player.cargo && this.props.player.cargo.length > 0) {
                cargo.splice(0, 1);
                this.props.setCargo(cargo);
            }
            if (this.props.player.fuel > 50) {
                this.props.setFuel(parseInt(this.props.player.fuel) - 50);
            } else {
                this.props.setFuel(0);
            }
            this.setState({encounterTitle: this.props.events[random].event.title});
            this.setState({encounterDescription: this.props.events[random].event.description});
        } else if (random === 2) {
            if (this.props.player.fuel > 100) {
                this.props.setFuel(parseInt(this.props.player.fuel) - 100);
            } else {
                this.props.setFuel(0);
            }
            this.setState({encounterTitle: this.props.events[random].event.title});
            this.setState({encounterDescription: this.props.events[random].event.description});
        } else {
            this.setState({encounterTitle: "No encounters"});
            this.setState({encounterDescription: ''});
        }
        if (this.props.player.fuel > this.state.fuel) {
            this.props.setFuel(parseInt(this.props.player.fuel) - parseInt(this.state.fuel));
            this.setState({distance: 0, fuel: 0});
            this.props.setLocation(this.state.destination);
            this.props.modifyPlayer(this.state.destination);
        } else {
            this.setState({encounterTitle: "Not Enough Fuel!"});
            this.setState({encounterDescription: ''});
        }
    }

    calculateDistance(planet) {
        let currentPlanet = null;
        this.props.planets.forEach((element) => {
            if (element.planet.name === this.props.location) {
                currentPlanet = element.planet;
            }
        });
        this.props.planets.forEach((element) => {
            if (element.planet.name === planet) {
                this.setState({distance: Math.round(Math.sqrt(Math.pow(element.planet.x - currentPlanet.x, 2) + Math.pow(element.planet.y - currentPlanet.y, 2)), 1),
                    fuel: Math.round(Math.sqrt(Math.pow(element.planet.x - currentPlanet.x, 2) + Math.pow(element.planet.y - currentPlanet.y, 2)) * 3.5, 1)});
            }
        });
    }

    render() {

        let options = this.props.planets.map((element) => {
            return { value: element.planet.name, label: element.planet.name }
        });

        return(
            <center>
                <div className="Universe">
                    <h1> Universe </h1>
                    <span>Fuel: {this.props.player.fuel} </span>
                    <h1 />
                    <div className="col-lg-3">
                        <Select options={ options } onChange={ this.handleInput }/>
                    </div>
                    <h1 />
                    <span> Location: { this.props.location } </span>
                    <h1 />
                    <span> Distance: { this.state.distance }</span>
                    <h1 />
                    <span> Fuel Cost: { this.state.fuel }</span>
                    <h1 />
                    <Button variant="contained" onClick={() => this.handleTravel()} color="secondary"> Travel </Button>
                    <h4>{this.state.encounterTitle} </h4>
                    <h5>{this.state.encounterDescription} </h5>
                    <Button variant="contained" onClick={() => this.props.changeScreen("Travel")} color="primary"> Back </Button>
                </div>
            </center>
            )
        }
}

export default Universe;
