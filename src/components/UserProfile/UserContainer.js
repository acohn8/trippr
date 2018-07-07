import React from 'react';
import UserTrips from './UserTrips';

class UserContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <UserTrips trips={this.props.trips} />;
  }
}

export default UserContainer;
