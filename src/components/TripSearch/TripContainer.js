import React from 'react';
import { Grid } from 'semantic-ui-react';

import AddressSearchBar from './AddressSearchBar';
import TripHeader from './TripHeader';

const TripContainer = () => (
  <Grid.Column>
    <TripHeader />
    <AddressSearchBar />
  </Grid.Column>
);

export default TripContainer;
