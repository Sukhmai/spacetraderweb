import React, {Component} from 'react';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import './index.css';


class Marketplace extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: this.generateItems(),
      buyItem: [],
      sellItem: []
    }
  }

  componentWillMount() {
    console.log(this.props.player);
    this.setState({
      buyItem: this.state.items[0],
      sellItem: this.props.player.cargo !== undefined && this.props.player.cargo.length > 0 ? this.props.player.cargo[0] : null
    });
  }

  generateItems() {
    return [
      this.generateItem("Water"),
      this.generateItem("Food"),
      this.generateItem("Furs"),
      this.generateItem("Games"),
      this.generateItem("Books"),
      this.generateItem("Firearms", 2),
      this.generateItem("Medicine", 3),
      this.generateItem("Narcotics", 4),
      this.generateItem("Robots", 5),
      this.generateItem("Machines", 6)
    ]
  }

  handleBuyItem() {
    if (this.props.player.credits >= this.state.buyItem.item.price && (this.props.player.cargo === undefined || (this.props.player.cargo !== undefined && this.props.player.cargo.length < 5))) {
      this.props.addItem(this.state.buyItem, this.state.buyItem.item.price);
      let items = this.state.items;
      let indexItem = 0;
      for (var i = 0; i < items.length; i++) {
        if (items[i] === this.state.buyItem) {
          items.splice(i, 1);
          indexItem = items[i];
        }
      }
      this.setState({
        items: items,
        buyItem: items[0],
        sellItem: indexItem
      })
    }
  }

  handleSellItem() {
    if (this.props.player.cargo.length > 0) {
      let items = this.state.items;
      items.push(this.state.sellItem);
      this.props.sellItem(this.state.sellItem, this.state.sellItem.item.price);
      this.setState({
        items: items,
        sellItem: items[0]
      })
    }
  }

  handleBuyItemChange = event => {
    for (var i = 0; i < this.state.items.length; i++) {
      if (this.state.items[i].item.name === event.target.value) {
        this.setState({ buyItem: this.state.items[i]});
      }
    }

  };

  handleSellItemChange = event => {
    for (var i = 0; i < this.props.player.cargo.length; i++) {
      if (this.props.player.cargo[i].item.name === event.target.value) {
        this.setState({ sellItem: this.props.player.cargo[i]});
      }
    }
  };

  generateItem(name, mod) {
    if (!mod) {
      mod = 1;
    }

    return {
      item: {
        "name": name,
        "price": parseInt(Math.random() * mod * 10 * this.props.techLevel + 10, 10)
      }
    }
  }

  render() {
    return (
      <center>
        <div className="Marketplace">
        <center>
          <h1>
            Marketplace
          </h1>
          <div className="items">
          <span className="spans"> Buy Items: </span> <Select
            value = {this.state.buyItem.item.name}
            onChange = {(e) => this.handleBuyItemChange(e)}
            >
            {this.state.items.map(name => (
                <MenuItem key={name.item.name} value={name.item.name}>
                  {name.item.name}
                </MenuItem>
              ))}

          </Select>
          <span className="spans"> Price : {this.state.buyItem.item.price} </span>
          </div>
          <div className="items">

            { this.state.sellItem !== null ?
                <div>
                    <span className="spans"> Sell Items: </span> <Select
                      value = {this.state.sellItem.item.name}
                      onChange = {(e) => this.handleSellItemChange(e)}
                      >
                      {this.props.player.cargo.map(name => (
                          <MenuItem key={name.item.name} value={name.item.name}>
                            {name.item.name}
                          </MenuItem>
                        ))}
                    </Select>
                    <span className="spans"> Price : {this.state.sellItem.item.price} </span>
                </div>
                :
                <span> No items to sell! </span>
            }
          </div>
          <Button className="marketButtons" variant="contained" onClick={() => this.handleBuyItem()} color="primary"className="Go"> Buy Item </Button>
          <Button className="marketButtons" variant="contained" onClick={() => this.handleSellItem()} color="primary"className="Go"> Sell Item </Button>
          <div>
            <span className="spans"> Credits: {this.props.player.credits} </span>
            Cargo: {this.props.player.cargo !== undefined && this.props.player.cargo !== [] ? this.props.player.cargo.length +"/"+5 : 0}
          </div>
          <Button variant="contained" onClick={() => this.props.changeScreen("Travel")} color="secondary"className="Back"> Back </Button>
        </center>
        </div>
      </center>
    )
  }
}

export default Marketplace;
