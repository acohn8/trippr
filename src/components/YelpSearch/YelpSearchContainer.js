import React from 'react';
import { Grid, Loader, Item, Divider, Header, Sticky } from 'semantic-ui-react';
import distance from '@turf/distance';

import YelpSearchCard from './YelpSearchCard';
import YelpCategoryFilter from './YelpCategoryFilter';
import Error from '../Error';
import Map from '../Map/Map';
import MapDirections from '../Map/MapDirections';

class YelpSearchContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [],
      loading: false,
      complete: false,
      filteredResults: [],
      searchDistance: '',
      destination: '',
    };
  }

  setResults = results => {
    const sortedResults = results.slice();
    sortedResults.map(result => {
      const to = [result.coordinates.longitude, result.coordinates.latitude];
      const from = [this.props.longitude, this.props.latitude];
      const options = { units: 'miles' };
      const userDistance = distance(from, to, options);
      result.distance = userDistance;
    });
    sortedResults.sort((a, b) => b.rating - a.rating);
    const initialResults = sortedResults.filter(result => result.distance <= 1).slice(0, 5);
    this.setState({
      results: sortedResults,
      loading: false,
      complete: true,
      error: false,
      filteredResults: initialResults,
      searchDistance: 'The best within a mile',
      destination: '',
    });
  };

  getYelpResults = category => {
    this.setState({
      loading: true,
    });
    fetch(
      `https://cryptic-headland-94862.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=${category}&latitude=${
        this.props.latitude
      }&longitude=${this.props.longitude}`,
      {
        headers: {
          authorization:
            'Bearer B0_o-WOtonclsraT47gpBMjFd_jGrcgkYkl6O74pf4ETwW_GBcfXgSdCbXjffWEsF2gYeFA54QnyG3sKi48covsP2qsu5wrBivNEHNqdUaS1rGcScv0Es8a8OXY_W3Yx',
        },
      },
    )
      .catch(this.handleError)
      .then(res => res.json())
      .then(json => this.setResults(json.businesses));
  };

  handleError = () => {
    this.setState({ error: true });
  };

  filterDistance = data => {
    let filteredResults;
    let searchDistance;
    if (data === 1 || typeof data === 'undefined') {
      filteredResults = this.state.results.filter(result => result.distance <= 1).slice(0, 5);
      searchDistance = 'The best within a mile';
    } else if (data === 2) {
      filteredResults = this.state.results.filter(result => result.distance <= 3).slice(0, 5);
      searchDistance = 'The best within three miles';
    } else if (data === 3) {
      filteredResults = this.state.results.slice(0, 5);
      searchDistance = 'The best in the area';
    }
    this.setState({
      filteredResults: filteredResults,
      searchDistance: searchDistance,
      destination: '',
    });
  };

  showDirections = target => {
    this.setState({ destination: target });
  };

  removeDestination = () => {
    this.setState({ destination: '' });
  };

  render() {
    return (
      <Grid columns={1}>
        <Grid.Column>
          {this.state.error === true ||
            (typeof this.state.results === 'undefined' && (
              <Error message={'Location not found. Please select a trip'} color={'red'} />
            ))}
          {this.state.complete === true &&
            this.state.filteredResults.length === 0 && (
              <Error
                message={'No results found, please adjust your distance filter or search again.'}
                color={'brown'}
              />
            )}
          <Header as="h3" content={`Find the best food in and around ${this.props.city}`} />
          <YelpCategoryFilter
            getYelpResults={this.getYelpResults}
            filterDistance={this.filterDistance}
          />
        </Grid.Column>
        {this.state.loading === true && <Loader active inline="centered" />}
        {this.state.filteredResults.length > 0 &&
          this.state.loading === false && (
            <Grid columns={2}>
              <Grid.Column>
                <Item.Group divided>
                  <Header as="h2">{this.state.searchDistance}</Header>
                  {this.state.filteredResults.map(result => (
                    <YelpSearchCard
                      result={result}
                      key={result.id}
                      bookmark={this.props.bookmark}
                      showDirections={this.showDirections}
                    />
                  ))}
                </Item.Group>
              </Grid.Column>
              <Grid.Column>
                {this.state.destination === '' ? (
                  <Map
                    points={this.state.filteredResults}
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
          )}
      </Grid>
    );
  }
}

export default YelpSearchContainer;
