import React from 'react';
import { Grid, Card, Segment, Loader, Form } from 'semantic-ui-react';
import YelpSearchBar from './YelpSearchBar';
import YelpHeader from './YelpHeader';
import YelpSearchCard from './YelpSearchCard';
import YelpCategoryFilter from './YelpCategoryFilter';
import YelpSort from './YelpSort';

class YelpSearchContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { results: [], loading: false };
  }

  setResults = results => {
    this.setState({ results: results, loading: false });
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

  sortResults = (event, data) => {
    this.setState({ loading: true }, this.sortResultsByRating);
  };

  sortResultsByRating = () => {
    const resultsToSort = this.state.results.slice();
    const sorted = resultsToSort.sort((a, b) => b.rating - a.rating);
    this.setState({ results: sorted, loading: false });
  };

  render() {
    return (
      <Segment>
        <Grid centered columns="equal">
          <Grid.Column width={8}>
            <YelpHeader location={this.props.location} finalizeSelection={this.finalizeSelection} />
            <YelpCategoryFilter getYelpResults={this.getYelpResults} />
            {this.state.results.length > 0 && <YelpSort sortResults={this.sortResults} />}
            {this.state.loading === true && <Loader active inline="centered" />}
          </Grid.Column>
          <Grid.Row columns={1}>
            <Grid.Column>
              <Card.Group stackable itemsPerRow={5}>
                {this.state.results.map(result => (
                  <YelpSearchCard
                    result={result}
                    coords={this.props.location[0].coords}
                    key={result.id}
                  />
                ))}
              </Card.Group>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    );
  }
}

export default YelpSearchContainer;
