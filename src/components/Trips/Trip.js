import React from 'react';
import { Segment, Image, Header, Divider, Button } from 'semantic-ui-react';
import Moment from 'react-moment';
import BookmarksContainer from './BookmarksContainer';
import YelpSearchContainer from '../YelpSearch/YelpSearchContainer';

class Trip extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      trip: [],
      showBookmarks: true,
      bookmarks: [],
    };
  }

  componentDidMount = () => {
    this.setState({
      trip: this.props.trips.find(trip => {
        return trip.id == this.props.match.params.tripId;
      }),
    });
  };

  handleClick = () => {
    this.setState({
      showBookmarks: !this.state.showBookmarks,
    });
  };

  bookmark = yelpResult => {
    console.log('Yelp Result', yelpResult);
    this.setState(
      {
        ...this.state,
        showBookmarks: true,
        bookmarks: [...this.state.bookmarks, yelpResult],
      },
      () => console.log(this.state),
    );
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
        <Button onClick={this.handleClick} primary>
          {this.state.showBookmarks ? 'Add Restaurants' : 'View Bookmarks'}
        </Button>
        <Divider />
        {this.state.showBookmarks ? (
          <BookmarksContainer bookmarks={this.state.bookmarks} />
        ) : (
          <YelpSearchContainer
            latitude={this.state.trip.address_latitude}
            longitude={this.state.trip.address_longitude}
            city={this.state.trip.city}
            bookmark={this.bookmark}
          />
        )}
      </Segment>
    );
  }
}

export default Trip;
