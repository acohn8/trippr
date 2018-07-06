import React from "react";
import UserTrips from "./UserTrips";
import { Grid, Image } from "semantic-ui-react";

class UserContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <UserTrips trips={this.props.trips} />;
  }
}

export default UserContainer;
