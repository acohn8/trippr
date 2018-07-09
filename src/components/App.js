import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';

import Nav from './Nav';
import RailsApi from './RailsApi';
import SearchContainer from './LocationSearch/SearchContainer';
import UserContainer from './UserProfile/UserContainer';
import NewTripContainer from './TripCreation/NewTripContainer';
import YelpSearchContainer from './YelpSearch/YelpSearchContainer';
import Error from './Error';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { newTripLocation: [], trips: [], error: false };
  }

  componentDidMount() {
    RailsApi.getTrips().then(trips => this.setState({ trips: trips, error: false }));
  }

  setTripLocationState = userLocation => {
    this.setState({
      newTripLocation: [
        {
          coords: userLocation.features['0'].center,
          name: userLocation.features['0'].text,
          error: false,
        },
      ],
    });
  };

  saveTrip = formData => {
    let tripData = { ...formData, city: this.state.newTripLocation.name };
    RailsApi.postTrip(tripData)
      .then(res => res.json())
      .then(trip =>
        this.setState({
          trips: [...this.state.trips, trip],
          error: false,
        }),
      )
      .then(this.props.history.push('/add-venues'));
  };

  locationError = () => {
    this.setState({ error: true }), this.props.history.push('/home');
  };

  render() {
    return (
      <div className="ui container">
        <Route
          render={props => {
            return <Nav location={this.state.newTripLocation.name} />;
          }}
        />
        <Switch>
          <Route
            path="/home"
            render={props => {
              return (
                <div>
                  {this.state.error === true && (
                    <Error message={'Location could not be found, search again'} color={'red'} />
                  )}
                  <SearchContainer
                    saveLocation={this.setTripLocationState}
                    history={props.history}
                    locationError={this.locationError}
                  />
                </div>
              );
            }}
          />

          <Route
            path="/trips"
            render={props => {
              return <UserContainer trips={this.state.trips} />;
            }}
          />
          <Route
            path="/new-trip"
            render={props => {
              return (
                <NewTripContainer
                  location={this.state.newTripLocation}
                  saveTrip={this.saveTrip}
                  history={props.history}
                />
              );
            }}
          />
          <Route
            path="/add-venues"
            render={props => {
              return <YelpSearchContainer location={this.state.newTripLocation} />;
            }}
          />
        </Switch>
      </div>
    );
  }
}
export default withRouter(App);
