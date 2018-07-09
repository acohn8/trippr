import React from "react";

class Trip extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      trip: []
    };
  }

  componentDidMount = () => {
    this.setState({
      trip: this.props.trips.find(trip => {
        return trip.id == this.props.match.params.tripId;
      })
    });
  };

  render() {
    console.log(this.props.trips);
    return <div>{this.state.trip.city}</div>;
  }
}

export default Trip;
