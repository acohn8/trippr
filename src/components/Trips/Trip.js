import React from 'react';
import { Segment, Icon, Image, Button, Grid, Item, Header } from 'semantic-ui-react';
import Moment from 'react-moment';
import BookmarksContainer from './BookmarksContainer';
import YelpSearchContainer from '../YelpSearch/YelpSearchContainer';

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
                  <Item.Extra>
                    <Button floated="right" onClick={this.handleClick} primary>
                      {this.state.showBookmarks ? 'Add Restaurants' : 'View Bookmarks'}
                      <Icon name="right chevron" />
                    </Button>
                  </Item.Extra>
                </Item.Content>
              </Item>
            </Item.Group>
            <Grid.Row columns={1}>
              <Grid.Column>
                {this.state.showBookmarks ? (
                  <BookmarksContainer bookmarks={this.state.bookmarks} />
                ) : (
                  <YelpSearchContainer
                    latitude={this.state.trip.address_latitude}
                    longitude={this.state.trip.address_longitude}
                    city={this.state.trip.city}
                    bookmark={this.bookmark}
                    image={this.state.trip.image}
                  />
                )}
              </Grid.Column>
            </Grid.Row>
          </Grid.Column>
        </Grid>
      </Segment>
    );
  }
}

export default Trip;
