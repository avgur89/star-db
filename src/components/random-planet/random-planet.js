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

  componentDidMount() {
    const { updateInterval } = this.props;
    this.updatePlanet();
    this.interval = setInterval(this.updatePlanet, updateInterval);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  onError = () => {
    this.setState({ error: true, loading: false });
  };

  updatePlanet = async () => {
    try {
      const id = Math.floor(Math.random() * 18) + 1;
      const planet = await swapiService.getPlanet(id);

      this.setState({ planet, loading: false, error: false });
    } catch (error) {
      this.onError();
    }
  };

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

RandomPlanet.defaultProps = {
  updateInterval: 3000,
};

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
