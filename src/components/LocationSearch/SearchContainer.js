import React from "react";
import { Grid, Segment } from "semantic-ui-react";

import SearchBar from "./SearchBar";
import SearchHeader from "./SearchHeader";

const SearchContainer = props => (
  <Grid columns="equal">
    <Grid.Column />
    <Grid.Column width={8}>
      <Segment>
        <SearchHeader />
        <SearchBar saveLocation={props.saveLocation} history={props.history} />
      </Segment>
    </Grid.Column>
    <Grid.Column />
  </Grid>
);

export default SearchContainer;
