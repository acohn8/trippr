import React from "react";
import UserTrips from "./UserTrips";
import RailsApi from "./RailsApi";
import { Grid, Image } from "semantic-ui-react";

class UserContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      trips: []
    };
  }

  componentDidMount = () => {
    RailsApi.getTrips().then(trips => this.setState({ trips: trips }));
  };

  render() {
    return <UserTrips trips={this.state.trips} />;
  }
}

export default UserContainer;
