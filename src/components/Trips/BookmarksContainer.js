import React from 'react';
import Bookmark from './Bookmark';
import { Item, Header, Grid, Loader } from 'semantic-ui-react';
import distance from '@turf/distance';

import Map from '../Map/Map';
import MapDirections from '../Map/MapDirections';

class BookmarksContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { bookmarks: [], destination: '' };
  }

  componentDidMount() {
    this.setState({ loading: true }, this.fetchBookmarks);
  }

  fetchBookmarks = () => {
    this.props.bookmarks.forEach(bookmark => {
      fetch(
        `https://cryptic-headland-94862.herokuapp.com/https://api.yelp.com/v3/businesses/${
          bookmark.api_id
        }`,
        {
          headers: {
            authorization:
              'Bearer B0_o-WOtonclsraT47gpBMjFd_jGrcgkYkl6O74pf4ETwW_GBcfXgSdCbXjffWEsF2gYeFA54QnyG3sKi48covsP2qsu5wrBivNEHNqdUaS1rGcScv0Es8a8OXY_W3Yx',
          },
        },
      )
        .then(res => res.json())
        .then(json => this.getBookmarkInfo(json));
    });
  };

  getBookmarkInfo(newBookmark) {
    const to = [newBookmark.coordinates.longitude, newBookmark.coordinates.latitude];
    const from = [this.props.longitude, this.props.latitude];
    const options = { units: 'miles' };
    const userDistance = distance(from, to, options);
    newBookmark.distance = userDistance;
    const newBookmarks = [...this.state.bookmarks, newBookmark];
    this.setState({ bookmarks: newBookmarks, loading: false });
  }

  showDirections = target => {
    this.setState({ destination: target });
  };

  removeDestination = () => {
    this.setState({ destination: '' });
  };

  render() {
    {
      return this.state.bookmarks.length === this.props.bookmarks.length ? (
        <div>
          <Header as="h2">Bookmarks</Header>
          <Grid columns={2}>
            <Grid.Column>
              <Item.Group divided>
                {this.state.bookmarks.map(result => (
                  <Bookmark result={result} showDirections={this.showDirections} />
                ))}
              </Item.Group>
            </Grid.Column>
            <Grid.Column>
              {this.state.destination === '' ? (
                <Map
                  points={this.state.bookmarks}
                  userLocation={[this.props.longitude, this.props.latitude]}
                />
              ) : (
                <MapDirections
                  userLocation={[this.props.longitude, this.props.latitude]}
                  destination={this.state.destination}
                  removeDestination={this.removeDestination}
                />
              )}
            </Grid.Column>
          </Grid>
        </div>
      ) : (
        <Loader active inline="centered" />
      );
    }
  }
}

{
  /* {this.state.destination === '' ? (
          ) : (
            <MapDirections
              userLocation={[this.props.longitude, this.props.latitude]}
              destination={this.state.destination}
              removeDestination={this.removeDestination}
            />
          )} */
}

export default BookmarksContainer;
