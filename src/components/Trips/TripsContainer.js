import React from "react";
import { Route, Switch } from "react-router-dom";

import UserTrips from "./UserTrips";
import Trip from "./Trip";

class TripsContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Switch>
        <Route
          exact
          path="/trips/"
          render={props => <UserTrips trips={this.props.trips} {...props} />}
        />
        <Route
          exact
          path="/trips/:tripId"
          render={props => <Trip trips={this.props.trips} {...props} />}
        />
      </Switch>
    );
  }
}

export default TripsContainer;
