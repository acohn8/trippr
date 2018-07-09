import React from "react";
import { Header, Icon, Grid, Divider } from "semantic-ui-react";

const YelpHeader = props => (
  <Header as="h2">
    <Header.Content>
      What do you want to eat?
      <Header.Subheader>
        <Icon name="food" />
        Enter a restaurant or cusine to find the best food in and around{" "}
        {props.city}
      </Header.Subheader>
    </Header.Content>
  </Header>
);

export default YelpHeader;
