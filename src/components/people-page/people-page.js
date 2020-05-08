import React, { Component } from 'react';
import swapiService from '../../services/swap-service';
import Row from '../row';
import ErrorBoundry from '../error-boundry';
import ItemList from '../item-list';
import ItemDetails, { Record } from '../item-details';

import './people-page.css';

class PeoplePage extends Component {
  state = {
    selectedPerson: null,
  };

  onPersonSelected = (id) => {
    this.setState({ selectedPerson: id });
  };

  render() {
    const { getAllPeople, getPerson, getPersonImage } = swapiService;

    const itemList = (
      <ItemList onItemSelected={this.onPersonSelected} getData={getAllPeople}>
        {(i) => `${i.name} (${i.birthYear})`}
      </ItemList>
    );

    const itemDetails = (
      <ItemDetails
        itemId={this.state.selectedPerson}
        getData={getPerson}
        getImageUrl={getPersonImage}
      >
        <Record field="gender" label="Gender" />
        <Record field="eyeColor" label="Eye Color" />
      </ItemDetails>
    );

    return (
      <ErrorBoundry>
        <Row left={itemList} right={itemDetails} />
      </ErrorBoundry>
    );
  }
}

export default PeoplePage;
