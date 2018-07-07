import React from 'react';
import { Grid, Segment } from 'semantic-ui-react';

import SearchBar from './SearchBar';
import SearchHeader from './SearchHeader';

const SearchContainer = props => (
  <Segment>
    <Grid centered columns="equal">
      <Grid.Column width={8}>
        <SearchHeader />
        <SearchBar saveLocation={props.saveLocation} history={props.history} />
      </Grid.Column>
    </Grid>
  </Segment>
);

export default SearchContainer;
