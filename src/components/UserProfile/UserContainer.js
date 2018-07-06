import React from "react";
import UserTrips from "./UserTrips";
import RailsApi from "./RailsApi";

class UserContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      trips: []
    };
  }

  componentDidMount() {
    RailsApi.getTrips().then(trips => this.setState({ trips: trips }));
  }

  render() {
    return (
      <div>
        <UserTrips trips={this.state.trips} />
      </div>
    );
  }
}

export default UserContainer;
