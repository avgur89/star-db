import React, { Component } from 'react';

import ErrorButton from '../error-button/error-button';
import Spinner from '../spinner';

import './item-details.css';

export const Record = ({ item, field, label }) => {
  return (
    <li className="list-group-item">
      <span className="term">{label}</span>
      <span>{item[field]}</span>
    </li>
  );
};

export default class ItemDetails extends Component {
  state = {
    item: null,
    image: null,
    loading: false,
  };

  componentDidMount() {
    this.updateItem();
  }

  componentDidUpdate(prevProps) {
    if (this.props.itemId !== prevProps.itemId) {
      this.updateItem();
    }
  }

  updateItem = async () => {
    const { itemId, getData, getImageUrl } = this.props;

    if (!itemId) {
      return;
    }

    this.setState({ loading: true });
    const item = await getData(itemId);

    this.setState({
      item,
      image: getImageUrl(item),
      loading: false,
    });
  };

  render() {
    const { item, image, loading } = this.state;

    if (!item) {
      return <span>Select a item from a list</span>;
    }

    if (loading) {
      return <Spinner />;
    }

    const { name } = item;

    return (
      <div className="item-details card">
        <img className="item-image" src={image} alt={`${name}-pic`} />

        <div className="card-body">
          <h4>{name}</h4>
          <ul className="list-group list-group-flush">
            {React.Children.map(this.props.children, (child) => {
              return React.cloneElement(child, { item });
            })}
          </ul>
          <ErrorButton />
        </div>
      </div>
    );
  }
}
