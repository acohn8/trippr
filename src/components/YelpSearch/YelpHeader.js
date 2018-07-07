import React from 'react';
import { Header, Icon, Grid } from 'semantic-ui-react';

const YelpHeader = props => (
  <Grid.Row>
    <Header as="h1">
      <Icon name="food" />
      <Header.Content>
        What do you want to eat?
        <Header.Subheader>
          Enter a restaurant or cusine to get the best food in and around {props.location.name}
        </Header.Subheader>
      </Header.Content>
    </Header>
  </Grid.Row>
);

export default YelpHeader;
