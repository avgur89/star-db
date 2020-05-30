import React from 'react';
import { withRouter } from 'react-router-dom';
import { StarshipList } from '../sw-components';

const StarshipPage = ({ history }) => {
  return <StarshipList onItemSelected={(id) => history.push(id)} />;
};

export default withRouter(StarshipPage);
