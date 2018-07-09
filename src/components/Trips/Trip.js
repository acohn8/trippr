import React from "react";
import { Segment, Image, Header, Divider, Button } from "semantic-ui-react";
import Moment from "react-moment";
import BookmarksContainer from "./BookmarksContainer";

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
    return (
      <Segment>
        <Image src={this.state.trip.image} size="small" floated="right" />
        <div>
          <Header size="huge">{this.state.trip.city}</Header>
        </div>
        <p>
          <Moment date={this.state.trip.start_date} format="ddd MMM D, YYYY " />
          - <Moment date={this.state.trip.end_date} format="ddd MMM D, YYYY" />
        </p>
        <Button primary>Add Restraunts</Button>
        <Divider />
        <BookmarksContainer />
      </Segment>
    );
  }
}

export default Trip;
