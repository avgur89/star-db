import React from 'react';
import { withData } from '../hoc';
import swapiService from '../../services/swap-service';

import './item-list.css';

const ItemList = (props) => {
  const { data, children: renderLabel, onItemSelected } = props;

  const items = data.map((item) => {
    const { id } = item;
    const label = renderLabel(item);

    return (
      <li
        className="list-group-item"
        key={id}
        onClick={() => onItemSelected(id)}
      >
        {label}
      </li>
    );
  });

  return <ul className="item-list list-group">{items}</ul>;
};

const { getAllPeople } = swapiService;

export default withData(ItemList, getAllPeople);
