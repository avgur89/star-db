import React, { Component, Fragment } from 'react';
import swapiService from '../../services/swap-service';
import Spinner from '../spinner';
import ErrorIndicator from '../error-indicator';

import './random-planet.css';

class RandomPlanet extends Component {
  state = {
    planet: {},
    loading: true,
    error: null,
  };

  onError = (error) => {
    this.setState({ error: true, loading: false });
  };

  updatePlanet = async () => {
    try {
      const id = Math.floor(Math.random() * 25) + 2;
      const planet = await swapiService.getPlanet(id);

      this.setState({ planet, loading: false, onError: false });
    } catch (error) {
      this.onError(error);
    }
  };

  componentDidMount() {
    this.updatePlanet();
  }

  render() {
    const { planet, loading, error } = this.state;

    const hasData = !(loading || error);
    const errorMessage = error ? <ErrorIndicator /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = hasData ? <PlanetView planet={planet} /> : null;

    return (
      <div className="random-planet jumbotron rounded">
        {errorMessage}
        {spinner}
        {content}
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
