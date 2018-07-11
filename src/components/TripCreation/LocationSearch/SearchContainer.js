import React from "react";
import { Grid, Segment } from "semantic-ui-react";
import SearchBar from "./SearchBar";
import SearchHeader from "./SearchHeader";

const SearchContainer = props => (
  <Segment>
    <SearchHeader />
    <SearchBar saveLocation={props.saveLocation} />
  </Segment>
);

export default SearchContainer;
