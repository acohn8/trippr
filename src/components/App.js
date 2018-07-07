import React from "react";
import { Grid, Container } from "semantic-ui-react";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";

import Nav from "./Nav";
import RailsApi from "./RailsApi";
import SearchContainer from "./LocationSearch/SearchContainer";
import UserContainer from "./UserProfile/UserContainer";
import NewTripContainer from "./TripCreation/NewTripContainer";
import YelpSearchContainer from "./YelpSearch/YelpSearchContainer";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newTripLocation: "",
      trips: []
    };
  }

  setTripLocationState = userLocation => {
    this.setState({
      newTripLocation: {
        coords: userLocation.features["0"].center,
        name: userLocation.features["0"].text
      }
    });
  };

  saveTrip = formData => {
    let tripData = { ...formData, city: this.state.newTripLocation.name };
    RailsApi.postTrip(tripData)
      .then(res => res.json())
      .then(trip =>
        this.setState({
          trips: [...this.state.trips, trip]
        })
      );
    this.props.history.push("/yelp-search");
  };

  componentDidMount() {
    RailsApi.getTrips().then(trips => this.setState({ trips: trips }));
  }

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
                <SearchContainer
                  saveLocation={this.setTripLocationState}
                  history={props.history}
                />
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
            path="/yelp-search"
            render={props => {
              return <YelpSearchContainer />;
            }}
          />
          <Route
            path="/new-trip"
            render={props => {
              return (
                <NewTripContainer
                  location={this.state.newTripLocation}
                  saveTrip={this.saveTrip}
                />
              );
            }}
          />
        </Switch>
      </div>
    );
  }
}
export default withRouter(App);
