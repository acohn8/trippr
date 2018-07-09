import React from 'react';
import { Grid, Segment, Loader, Item, Divider } from 'semantic-ui-react';
import distance from '@turf/distance';

import YelpHeader from './YelpHeader';
import YelpSearchCard from './YelpSearchCard';
import YelpCategoryFilter from './YelpCategoryFilter';
import Error from '../Error';

class YelpSearchContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { results: [], shownBusiness: '', loading: false, complete: false };
  }

  setResults = results => {
    const sortedResults = results.slice();
    sortedResults.map(result => {
      const to = [result.coordinates.longitude, result.coordinates.latitude];
      const from = this.props.location.coords;
      const options = { units: 'miles' };
      const userDistance = distance(from, to, options);
      result.distance = userDistance;
    });
    sortedResults.sort((a, b) => b.rating - a.rating);
    this.setState({ results: sortedResults, loading: false, complete: true, error: false });
  };

  getYelpResults = category => {
    this.setState({ loading: true, complete: false, error: false });
    fetch(
      `https://cryptic-headland-94862.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=${category}&latitude=${
        this.props.location.coords[1]
      }&longitude=${this.props.location.coords[0]}`,
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

  showBusinessPage = business => {
    this.setState({ shownBusiness: business });
  };

  render() {
    const closeResults = this.state.results.filter(result => result.distance <= 1);
    const furtherResults = this.state.results.filter(
      result => result.distance > 1 && result.distance <= 3,
    );
    const areaResults = this.state.results.filter(result => result.distance > 3);
    return (
      <Segment>
        <Grid centered columns="equal">
          <Grid.Column width={8}>
            {this.state.error === true && (
              <Error message={'Location not found. Please select a trip'} color={'red'} />
            )}
            {this.state.complete === true &&
              this.state.results.length === 0 && (
                <Error message={'No results found, please search again.'} color={'brown'} />
              )}
            <YelpHeader location={this.props.location} finalizeSelection={this.finalizeSelection} />
            <YelpCategoryFilter getYelpResults={this.getYelpResults} />
            {this.state.loading === true && <Loader active inline="centered" />}
          </Grid.Column>
          <Grid.Row columns={1}>
            <Grid.Column>
              {this.state.complete === true && this.state.results.length > 0 && <Divider section />}
              {closeResults.length > 0 && (
                <Item.Group divided>
                  <h3>Near you</h3>
                  {closeResults.map(result => (
                    <YelpSearchCard
                      result={result}
                      showBusinessPage={this.showBusinessPage}
                      key={result.id}
                    />
                  ))}
                </Item.Group>
              )}
              {furtherResults.length > 0 && (
                <Item.Group divided>
                  <h3>A little further</h3>
                  {furtherResults.map(result => (
                    <YelpSearchCard
                      result={result}
                      showBusinessPage={this.showBusinessPage}
                      key={result.id}
                    />
                  ))}
                </Item.Group>
              )}
              {areaResults.length > 0 && (
                <Item.Group divided>
                  <h3>Furthest</h3>
                  {areaResults.map(result => (
                    <YelpSearchCard
                      result={result}
                      showBusinessPage={this.showBusinessPage}
                      key={result.id}
                    />
                  ))}
                </Item.Group>
              )}
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    );
  }
}

export default YelpSearchContainer;
