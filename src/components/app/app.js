import React, { Component } from 'react';

import Header from '../header';
import RandomPlanet from '../random-planet';
import ErrorBoundry from '../error-boundry';
import { SwapiServiceProvider } from '../swapi-service-context';
import {
  PersonList,
  PlanetList,
  StarshipList,
  PersonDetails,
  PlanetDetails,
  StarshipDetails,
} from '../sw-components';

import './app.css';

class App extends Component {
  state = {
    showRandomPlanet: true,
  };

  toggleRandomPlanet = () => {
    this.setState((state) => {
      return { showRandomPlanet: !state.showRandomPlanet };
    });
  };

  render() {
    const planet = this.state.showRandomPlanet ? <RandomPlanet /> : null;

    return (
      <ErrorBoundry>
        <SwapiServiceProvider>
          <div className="stardb-app">
            <Header />
            {planet}

            <div className="row mb2 button-row">
              <button
                className="toggle-planet btn btn-warning btn-lg"
                onClick={this.toggleRandomPlanet}
              >
                Toggle Random Planet
              </button>
            </div>

            <PersonDetails itemId={11} />

            <PlanetDetails itemId={11} />

            <StarshipDetails itemId={11} />

            <PersonList />

            <PlanetList />

            <StarshipList />
          </div>
        </SwapiServiceProvider>
      </ErrorBoundry>
    );
  }
}

export default App;
