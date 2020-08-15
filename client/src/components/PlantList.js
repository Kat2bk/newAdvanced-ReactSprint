import React, { Component } from "react";
import axios from "axios";

export default class PlantList extends Component {
  constructor() {
    super();
    this.state = {
      plants: [],
      input: ""
    }
  }
  // add state with a property called "plants" - initialize as an empty array

  componentDidMount() {
    axios.get(`http://localhost:3333/plants`)
    .then(response => {
      console.log("response from server", response.data)
      this.setState({
        plants: response.data.plantsData
      })
    })
    .catch(error => {
      console.log("Unable to get data", error)
    })
  }

  // filter stretch

  filteringPlants = (plants) => {
    return plants.filter(plant => {
      if (!this.state.input) {
        return plant
      }
      if(plant.name.toLowerCase().includes(this.state.input.toLowerCase())) {
        return plant
      }
    })
  }

  handleInput = (event) => {
    this.setState({
      input: event.target.value
    })
  }

  // when the component mounts:
  //   - fetch data from the server endpoint - http://localhost:3333/plants
  //   - set the returned plants array to this.state.plants

  
/*********  DON'T CHANGE ANYTHING IN THE RENDER FUNCTION *********/
// need to change some for stretch
  render() {
    return (
      <main className="plant-list">
      <input onChange={this.handleInput} type="text" placeholder="Search plants" />
        {this.filteringPlants(this.state.plants).map((plant) => (
          <div className="plant-card" key={plant.id}>
            <img className="plant-image" src={plant.img} alt={plant.name} />
            <div className="plant-details">
              <h2 className="plant-name">{plant.name}</h2>
              <p className="plant-scientific-name">{plant.scientificName}</p>
              <p>{plant.description}</p>
              <div className="plant-bottom-row">
                <p>${plant.price}</p>
                <p>☀️ {plant.light}</p>
                <p>💦 {plant.watering}x/month</p>
              </div>
              <button
                className="plant-button"
                onClick={() => this.props.addToCart(plant)}
              >
                Add to cart
              </button>
            </div>
          </div>
        ))}
      </main>
    );
  }
}
