import React from 'react';

import './header.css';

const Header = () => {
  return (
    <div className="header d-flex">
      <h3>
        <span>StarDB</span>
      </h3>
      <ul className="d-flex">
        <li>
          <span>People</span>
        </li>
        <li>
          <span>Planets</span>
        </li>
        <li>
          <span>Starships</span>
        </li>
      </ul>
    </div>
  );
};

export default Header;
