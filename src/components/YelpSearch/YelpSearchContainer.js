import React from 'react';
import { Grid, Card, Segment, Loader, Form, Item } from 'semantic-ui-react';
import YelpHeader from './YelpHeader';
import YelpSearchCard from './YelpSearchCard';
import YelpCategoryFilter from './YelpCategoryFilter';
import distance from '@turf/distance';

class YelpSearchContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { results: [], shownBusiness: '', loading: false };
  }

  setResults = results => {
    const sortedResults = results.slice();
    sortedResults.map(result => {
      const to = [result.coordinates.longitude, result.coordinates.latitude];
      const from = this.props.location[0].coords;
      const options = { units: 'miles' };
      const userDistance = distance(from, to, options);
      result.distance = userDistance;
    });
    sortedResults.sort((a, b) => a.distance - b.distance);
    this.setState({ results: sortedResults, loading: false });
  };

  getYelpResults = category => {
    this.setState({ loading: true });
    fetch(
      `https://cryptic-headland-94862.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=${category}&latitude=${
        this.props.location[0].coords[1]
      }&longitude=${this.props.location[0].coords[0]}`,
      {
        headers: {
          authorization:
            'Bearer B0_o-WOtonclsraT47gpBMjFd_jGrcgkYkl6O74pf4ETwW_GBcfXgSdCbXjffWEsF2gYeFA54QnyG3sKi48covsP2qsu5wrBivNEHNqdUaS1rGcScv0Es8a8OXY_W3Yx',
        },
      },
    )
      .then(res => res.json())
      .then(json => this.setResults(json.businesses));
  };

  showBusinessPage = business => {
    this.setState({ shownBusiness: business });
  };

  render() {
    return (
      <Segment>
        <Grid centered columns="equal">
          <Grid.Column width={8}>
            <YelpHeader location={this.props.location} finalizeSelection={this.finalizeSelection} />
            <YelpCategoryFilter getYelpResults={this.getYelpResults} />
            {this.state.loading === true && <Loader active inline="centered" />}
          </Grid.Column>
          <Grid.Row columns={1}>
            <Grid.Column>
              <Item.Group divided>
                {this.state.results.map(result => (
                  <YelpSearchCard
                    result={result}
                    showBusinessPage={this.showBusinessPage}
                    key={result.id}
                  />
                ))}
              </Item.Group>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    );
  }
}

export default YelpSearchContainer;
