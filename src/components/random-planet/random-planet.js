import React, { Component } from 'react';
import swapiService from '../../services/swap-service';

import './random-planet.css';

class RandomPlanet extends Component {
  state = {
    planet: {},
  };

  onPlanetLoaded = (planet) => {
    this.setState({ planet });
  };

  updatePlanet = async () => {
    const id = Math.floor(Math.random() * 25) + 2;
    const planet = await swapiService.getPlanet(id);

    this.onPlanetLoaded(planet);
  };

  componentDidMount() {
    this.updatePlanet();
  }

  render() {
    const {
      planet: { id, name, population, rotation_period, diameter },
    } = this.state;

    return (
      <div className="random-planet jumbotron rounded">
        <img
          className="planet-image"
          src={`https://starwars-visualguide.com/assets/img/planets/${id}.jpg`}
          alt={name}
        />
        <div>
          <h4>{name}</h4>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <span className="term">Population</span>
              <span>{population}</span>
            </li>
            <li className="list-group-item">
              <span className="term">Rotation Period</span>
              <span>{rotation_period}</span>
            </li>
            <li className="list-group-item">
              <span className="term">Diameter</span>
              <span>{diameter}</span>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default RandomPlanet;
