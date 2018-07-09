import React from "react";
import { Route, Switch, withRouter } from "react-router-dom";

import Nav from "./Nav";
import RailsApi from "./RailsApi";
import SearchContainer from "./LocationSearch/SearchContainer";
import UserTrips from "./Trips/UserTrips";
import Trip from "./Trips/Trip";

import NewTripContainer from "./TripCreation/NewTripContainer";
import YelpSearchContainer from "./YelpSearch/YelpSearchContainer";
import Error from "./Error";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newTripLocation: [],
      trips: [],
      tripsLoaded: false,
      error: false
    };
  }

  componentDidMount() {
    RailsApi.getTrips().then(trips =>
      this.setState({ trips: trips, tripsLoaded: true, error: false })
    );
  }

  setTripLocationState = userLocation => {
    // this.getWikiDataID(userLocation);
    this.setState(
      {
        newTripuserLocation: {
          coords: userLocation.center,
          name: userLocation.text,
          error: false
        }
      },
      this.props.history.push("/new-trip")
    );
  };

  // getWikiDataID = location => {
  //   const wikiDataId = location.features.find(
  //     feature => typeof feature.properties.wikidata !== 'undefined',
  //   ).properties.wikidata;
  //   console.log(wikiDataId);
  // };

  saveTrip = formData => {
    let tripData = { ...formData, city: this.state.newTripLocation.name };
    RailsApi.postTrip(tripData)
      .then(res => res.json())
      .then(trip => {
        this.setState(
          {
            trips: [...this.state.trips, trip],
            error: false
          },
          () => {
            this.props.history.push(
              `trips/${this.state.trips[this.state.trips.length - 1].id}`
            );
          }
        );
      });
  };

  locationError = () => {
    this.setState({ error: true }), this.props.history.push("/home");
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
                    <Error
                      message={"Location could not be found, search again"}
                      color={"red"}
                    />
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
            exact
            path="/trips"
            render={props => {
              return <UserTrips trips={this.state.trips} />;
            }}
          />
          <Route
            path="/trips/:tripId"
            render={props => {
              return (
                <div>
                  {this.state.tripsLoaded ? (
                    <Trip trips={this.state.trips} {...props} />
                  ) : (
                    <div />
                  )}
                </div>
              );
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
              return (
                <YelpSearchContainer location={this.state.newTripLocation} />
              );
            }}
          />
        </Switch>
      </div>
    );
  }
}
export default withRouter(App);
