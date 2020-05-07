import React, { Component, Fragment } from 'react';
import swapiService from '../../services/swap-service';
import Spinner from '../spinner';
import ErrorIndicator from '../error-indicator';

import './item-list.css';

export default class ItemList extends Component {
  state = {
    peopleList: null,
    loading: true,
    error: null,
  };

  getPeople = async () => {
    try {
      const people = await swapiService.getAllPeople();

      this.setState({ peopleList: people, loading: false, error: false });
    } catch (error) {
      this.setState({ error: true, loading: false });
    }
  };

  componentDidMount() {
    this.getPeople();
  }

  renderItems = (people) => {
    return (
      <ul className="item-list list-group">
        {people.map(({ id, name }) => {
          return (
            <li
              className="list-group-item"
              key={id}
              onClick={() => this.props.onItemSelected(id)}
            >
              {name}
            </li>
          );
        })}
      </ul>
    );
  };

  render() {
    const { peopleList, loading, error } = this.state;
    const hasData = !(loading || error);
    const spinner = loading ? <Spinner /> : null;
    const errorMessage = error ? <ErrorIndicator /> : null;
    const content = hasData ? this.renderItems(peopleList) : null;

    return (
      <Fragment>
        {spinner}
        {errorMessage}
        {content}
      </Fragment>
    );
  }
}
