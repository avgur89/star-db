// Core
import React, { Component } from 'react';

// Instruments
import { SwapiServiceProvider } from '../swapi-service-context';
import swapiService from '../../services/swap-service';

// Components
import Header from '../header';
import RandomPlanet from '../random-planet';
import ErrorBoundry from '../error-boundry';
import { PeoplePage, PlanetPage, StarshipPage } from '../pages';

import './app.css';

class App extends Component {
  render() {
    return (
      <ErrorBoundry>
        <SwapiServiceProvider value={swapiService}>
          <div className="stardb-app">
            <Header />
            <RandomPlanet />
            <PeoplePage />
            <PlanetPage />
            <StarshipPage />
          </div>
        </SwapiServiceProvider>
      </ErrorBoundry>
    );
  }
}

export default App;
