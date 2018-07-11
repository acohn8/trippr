import React from 'react';
import Bookmark from './Bookmark';
import { Item, Header, Grid, Loader, Icon, Button } from 'semantic-ui-react';
import distance from '@turf/distance';

import Map from '../Map/Map';
import MapDirections from '../Map/MapDirections';
import MapDirectionsFilter from '../Map/MapDirectionsFilter';

class BookmarksContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { bookmarks: [], destination: '', directionsType: 'driving' };
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

  setDirectionType = (event, data) => {
    let directionsType;
    if (data.value === 1 || typeof data.value === 'undefined') {
      directionsType = 'driving';
    } else if (data.value === 2) {
      directionsType = 'walking';
    } else if (data.value === 3) {
      directionsType = 'cycling';
    }
    this.setState({ directionsType: directionsType });
  };

  render() {
    {
      return this.state.bookmarks.length === this.props.bookmarks.length ? (
        <div>
          <Header as="h2" block>
            Bookmarks
          </Header>
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
                <div>
                  <Button basic as="a" onClick={this.removeDestination}>
                    <Icon name="arrow left" />
                    Map overview
                  </Button>
                  <Header as="h2">
                    Directions to {this.state.destination.name}
                    <Header.Subheader>{this.state.directionsType}</Header.Subheader>
                  </Header>
                  <MapDirectionsFilter setDirectionType={this.setDirectionType} />
                  <MapDirections
                    userLocation={[this.props.longitude, this.props.latitude]}
                    destination={this.state.destination}
                    removeDestination={this.removeDestination}
                    directionsType={this.state.directionsType}
                  />
                </div>
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
