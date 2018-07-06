import React from 'react';
import { Grid, Container } from 'semantic-ui-react';

import Nav from './Nav';
import TripContainer from './TripSearch/TripContainer';
import api from '../api';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { location: '' };
  }

  saveLocation = userLocation => {
    this.setState({
      location: {
        coords: userLocation.features['0'].center,
        name: userLocation.features['0'].text,
      },
    });
  };

  render() {
    return (
      <div>
        <Nav />
        <Grid relaxed centered columns={2}>
          <Grid.Row centered>
            <TripContainer saveLocation={this.saveLocation} />
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}
export default App;
