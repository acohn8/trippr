import React from 'react';
import { Grid } from 'semantic-ui-react';

import AddressSearchBar from './AddressSearchBar';
import TripHeader from './TripHeader';

const TripContainer = props => (
  <Grid.Column>
    <TripHeader />
    <AddressSearchBar saveLocation={props.saveLocation} history={props.history} />
  </Grid.Column>
);

export default TripContainer;
