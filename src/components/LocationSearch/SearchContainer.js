import React from 'react';
import { Grid } from 'semantic-ui-react';

import SearchBar from './SearchBar';
import SearchHeader from './SearchHeader';

const SearchContainer = props => (
  // <Segment>
  <Grid centered columns="equal">
    <Grid.Column width={8}>
      <SearchHeader />
      <SearchBar
        saveLocation={props.saveLocation}
        locationError={props.locationError}
        history={props.history}
      />
    </Grid.Column>
  </Grid>
  // </Segment>
);

export default SearchContainer;
