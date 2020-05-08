import React, { Component } from 'react';
import Spinner from '../spinner';

import './item-list.css';

class ItemList extends Component {
  state = {
    itemList: null,
  };

  componentDidMount() {
    this.getItemList();
  }

  getItemList = async () => {
    const { getData } = this.props;
    const itemList = await getData();

    this.setState({ itemList });
  };

  renderItems = (arr) => {
    return arr.map((item) => {
      const { id } = item;
      const label = this.props.children(item);

      return (
        <li
          className="list-group-item"
          key={id}
          onClick={() => this.props.onItemSelected(id)}
        >
          {label}
        </li>
      );
    });
  };

  render() {
    const { itemList } = this.state;

    if (!itemList) {
      return <Spinner />;
    }

    const items = this.renderItems(itemList);

    return <ul className="item-list list-group">{items}</ul>;
  }
}

export default ItemList;
