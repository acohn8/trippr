import React from "react";

class Trip extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      trip: this.props.trips.find(trip => {
        return trip.id === this.props.match.params.tripId;
      })
    };
  }

  render() {
    return <div>{this.state.trip.city}</div>;
  }
}

export default Trip;
