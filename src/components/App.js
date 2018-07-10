import React from "react";
import md5 from "js-md5";
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
    this.updateTrips();
  }

  updateTrips = () => {
    RailsApi.getTrips().then(trips =>
      this.setState({ trips: trips, tripsLoaded: true, error: false })
    );
  };

  setTripLocationState = userLocation => {
    this.getWikiDataID(userLocation);
    this.setState(
      {
        newTripLocation: {
          coords: userLocation.center,
          name: userLocation.text,
          error: false
        }
      },
      this.props.history.push("/new-trip")
    );
  };

  getWikiDataID = location => {
    let wikiDataId;
    if (
      location.properties.hasOwnProperty("wikidata") &&
      location.properties.landmark !== true
    ) {
      wikiDataId = location.properties.wikidata;
    } else {
      wikiDataId = location.context.find(feature =>
        feature.hasOwnProperty("wikidata")
      ).wikidata;
    }
    console.log(wikiDataId);
    fetch(
      `https://cryptic-headland-94862.herokuapp.com/https://www.wikidata.org/w/api.php?action=wbgetclaims&entity=${wikiDataId}&property=P18&format=json`
    )
      .then(res => res.json())
      .then(json =>
        this.createImage(json.claims.P18["0"].mainsnak.datavalue.value)
      );
  };

  createImage = name => {
    const formattedName = name.split(" ").join("_");
    const mdSum = md5(formattedName).slice(0, 2);
    const link = `https://upload.wikimedia.org/wikipedia/commons/${mdSum.slice(
      0,
      1
    )}/${mdSum}/${formattedName}`;
    this.setState({ image: link });
  };

  saveTrip = formData => {
    let tripData = {
      ...formData,
      city: this.state.newTripLocation.name,
      address_latitude: this.state.newTripLocation.coords[1],
      address_longitude: this.state.newTripLocation.coords[0],
      image: this.state.image,
      status: true
    };
    RailsApi.postTrip(tripData).then(trip => {
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
            exact
            path="/"
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
              return (
                <UserTrips
                  trips={this.state.trips}
                  updateTrips={this.updateTrips}
                  image={this.state.image}
                />
              );
            }}
          />
          <Route
            path="/trips/:tripId"
            render={props => {
              return (
                <div>
                  {this.state.tripsLoaded ? (
                    <Trip
                      trips={this.state.trips}
                      {...props}
                      updateTrips={this.updateTrips}
                    />
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
