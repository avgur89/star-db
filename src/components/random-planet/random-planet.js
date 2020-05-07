import React, { Component, Fragment } from 'react';
import swapiService from '../../services/swap-service';
import Spinner from '../spinner';

import './random-planet.css';

class RandomPlanet extends Component {
  state = {
    planet: {},
    loading: true,
  };

  onPlanetLoaded = (planet) => {
    this.setState({ planet, loading: false });
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
    const { planet, loading } = this.state;

    return (
      <div className="random-planet jumbotron rounded">
        {loading ? <Spinner /> : <PlanetView planet={planet} />}
      </div>
    );
  }
}

const PlanetView = ({ planet }) => {
  const { id, name, population, rotationPeriod, diameter } = planet;

  return (
    <Fragment>
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
            <span>{rotationPeriod}</span>
          </li>
          <li className="list-group-item">
            <span className="term">Diameter</span>
            <span>{diameter}</span>
          </li>
        </ul>
      </div>
    </Fragment>
  );
};

export default RandomPlanet;
