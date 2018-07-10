import React from 'react';
import Login from './Login';
import { Grid } from 'semantic-ui-react';

const UserContainer = props => (
  <Grid verticalAlign="middle" centered>
    <Grid.Column width={8}>
      <Login setUser={props.setUser} />
    </Grid.Column>
  </Grid>
);

export default UserContainer;
