import React from 'react';
import { Header, Icon, Grid } from 'semantic-ui-react';

const TripHeader = () => (
  <Grid.Row>
    <Header as="h1">
      <Icon name="plane" />
      <Header.Content>
        Where are you going?
        <Header.Subheader>Enter a city or address to get started</Header.Subheader>
      </Header.Content>
    </Header>
  </Grid.Row>
);

export default TripHeader;
