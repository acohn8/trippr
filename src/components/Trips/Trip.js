import React from 'react';
import { Segment, Icon, Divider, Button, Grid, Item, Header } from 'semantic-ui-react';
import Moment from 'react-moment';
import BookmarksContainer from './BookmarksContainer';
import YelpSearchContainer from '../YelpSearch/YelpSearchContainer';
import RailsApi from '../RailsApi';

class Trip extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      trip: [],
      showBookmarks: false,
      bookmarks: [],
    };
  }

  componentDidMount = () => {
    RailsApi.getTrip(this.props.match.params.tripId).then(trip =>
      this.setState({ trip: trip, bookmarks: trip.bookmarks }),
    );
  };

  handleClick = () => {
    this.setState({
      showBookmarks: !this.state.showBookmarks,
    });
  };

  bookmark = yelpResult => {
    RailsApi.postYelpRestaurantBookmark(yelpResult, this.state.trip.id)
      .then(res => res.json())
      .then(json =>
        this.setState(
          {
            ...this.state,
            showBookmarks: true,
            bookmarks: [...this.state.bookmarks, json],
          },
          () => this.props.updateTrips(),
        ),
      );
  };

  render() {
    return (
      <Segment>
        <Grid centered>
          <Grid.Column>
            <Item.Group relaxed>
              <Item>
                <Item.Image size="small" src={this.state.trip.image} />
                <Item.Content verticalAlign="bottom">
                  <Item.Header>
                    <Header as="h1">{this.state.trip.city}</Header>
                  </Item.Header>
                  <Item.Meta>
                    <span>
                      {<Moment format="MMMM Do YYYY">{this.state.trip.start_date}</Moment>} to{' '}
                      {<Moment format="MMMM Do YYYY">{this.state.trip.end_date}</Moment>}
                    </span>
                  </Item.Meta>
                  {this.state.bookmarks.length > 0 && (
                    <Item.Extra>
                      <Button floated="right" onClick={this.handleClick} primary>
                        {this.state.showBookmarks ? 'Add Restaurants' : 'View Bookmarks'}
                        <Icon name="right chevron" />
                      </Button>
                    </Item.Extra>
                  )}
                </Item.Content>
              </Item>
            </Item.Group>
          </Grid.Column>
        </Grid>
        <Divider section />
        {this.state.showBookmarks ? (
          <BookmarksContainer
            bookmarks={this.state.bookmarks}
            latitude={this.state.trip.address_latitude}
            longitude={this.state.trip.address_longitude}
          />
        ) : (
          <YelpSearchContainer
            latitude={this.state.trip.address_latitude}
            longitude={this.state.trip.address_longitude}
            city={this.state.trip.city}
            bookmark={this.bookmark}
            image={this.state.trip.image}
          />
        )}
      </Segment>
    );
  }
}

export default Trip;
