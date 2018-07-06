import React from 'react';
import { Grid, Container } from 'semantic-ui-react';
import { Route, Switch, Redirect } from 'react-router-dom';

import Nav from './Nav';
import TripContainer from './TripSearch/TripContainer';
import UserContainer from './UserProfile/UserContainer';
import YelpSearchContainer from './YelpSearch/YelpSearchContainer';

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
      <div className="ui container">
        <Route
          render={props => {
            return <Nav location={this.state.location.name} />;
          }}
        />
        <Switch>
          <Route
            path="/home"
            render={props => {
              return <TripContainer saveLocation={this.saveLocation} history={props.history} />;
            }}
          />
          <Route
            path="/search"
            render={props => {
              return <YelpSearchContainer saveLocation={this.saveLocation} />;
            }}
          />
          <Route
            path="/trips"
            render={props => {
              return <UserContainer />;
            }}
          />
        </Switch>
      </div>
    );
  }
}
export default App;
