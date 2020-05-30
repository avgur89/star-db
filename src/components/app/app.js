// Core
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// Instruments
import { SwapiServiceProvider } from '../swapi-service-context';
import swapiService from '../../services/swap-service';

// Components
import Header from '../header';
import RandomPlanet from '../random-planet';
import ErrorBoundry from '../error-boundry';
import {
  PeoplePage,
  PlanetPage,
  StarshipPage,
  SecretPage,
  LoginPage,
} from '../pages';

import './app.css';
import { StarshipDetails } from '../sw-components';

class App extends Component {
  state = {
    isLoggedIn: false,
  };

  onLogin = () => this.setState({ isLoggedIn: true });

  render() {
    const { isLoggedIn } = this.state;

    return (
      <ErrorBoundry>
        <SwapiServiceProvider value={swapiService}>
          <Router>
            <div className="stardb-app">
              <Header isLoggedIn={isLoggedIn} />
              <RandomPlanet />

              <Switch>
                <Route
                  path="/"
                  exact
                  render={() => <h2>Welcome to StarDB</h2>}
                />
                <Route path="/people/:id?" component={PeoplePage} />
                <Route path="/planets" component={PlanetPage} />
                <Route path="/starships" exact component={StarshipPage} />
                <Route
                  path="/starships/:id"
                  render={({ match }) => {
                    const { id } = match.params;
                    return <StarshipDetails itemId={id} />;
                  }}
                />
                <Route
                  path="/login"
                  render={() => (
                    <LoginPage isLoggedIn={isLoggedIn} onLogin={this.onLogin} />
                  )}
                />
                <Route
                  path="/secret"
                  render={() => <SecretPage isLoggedIn={isLoggedIn} />}
                />
                <Route render={() => <h2>Page Not Found</h2>} />
              </Switch>
            </div>
          </Router>
        </SwapiServiceProvider>
      </ErrorBoundry>
    );
  }
}

export default App;
