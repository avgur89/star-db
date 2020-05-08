import React, { Component, Fragment } from 'react';
import swapiService from '../../services/swap-service.js';
import Spinner from '../spinner';
import ErrorMessage from '../error-indicator';

import './person-details.css';

class PersonDetails extends Component {
  state = {
    person: null,
    loading: false,
    error: null,
  };

  componentDidMount() {
    this.updatePerson();
  }

  componentDidUpdate(prevProps) {
    if (this.props.personId !== prevProps.personId) {
      this.updatePerson();
    }
  }

  updatePerson = async () => {
    try {
      const { personId } = this.props;

      if (!personId) {
        return;
      }

      this.setState({ loading: true });
      const person = await swapiService.getPerson(personId);
      this.setState({ person, loading: false });
    } catch (error) {
      this.setState({ error: true, loading: false });
    }
  };

  render() {
    const { person, loading, error } = this.state;
    const hasData = !(loading || error);
    const spinner = loading ? <Spinner /> : null;

    if (!person && !error) {
      return <span>Select a person from a list</span>;
    }

    if (error) {
      return <ErrorMessage />;
    }

    const { id, name, gender, eyeColor, birthYear } = person;

    return (
      <Fragment>
        {spinner}
        {hasData ? (
          <div className="person-details card">
            <img
              className="person-image"
              src={`https://starwars-visualguide.com/assets/img/characters/${id}.jpg`}
              alt={name}
            />

            <div className="card-body">
              <h4>{name}</h4>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <span className="term">Gender</span>
                  <span>{gender}</span>
                </li>
                <li className="list-group-item">
                  <span className="term">Birth Year</span>
                  <span>{birthYear}</span>
                </li>
                <li className="list-group-item">
                  <span className="term">Eye Color</span>
                  <span>{eyeColor}</span>
                </li>
              </ul>
            </div>
          </div>
        ) : null}
      </Fragment>
    );
  }
}

export default PersonDetails;
