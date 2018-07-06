import React from 'react';
import { Grid, Container } from 'semantic-ui-react';

import Nav from './Nav';
import TripContainer from './TripSearch/TripContainer';

const App = () => (
  <div>
    <Nav />
    <Grid relaxed centered columns={2}>
      <Grid.Row centered>
        <TripContainer />
      </Grid.Row>
    </Grid>
  </div>
);

export default App;
