import React from "react";

class UserTrips extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        {this.props.trips.map(trip => {
          trip.city;
        })}
      </div>
    );
  }
}

export default UserTrips;
