import React from 'react';
import { Grid, Card, Segment } from 'semantic-ui-react';
import YelpSearchBar from './YelpSearchBar';
import YelpHeader from './YelpHeader';
import YelpSearchCard from './YelpSearchCard';

class YelpSearchContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { results: [] };
  }

  setResults = results => {
    this.setState({ results });
  };

  render() {
    return (
      <Segment>
        <Grid centered columns="equal">
          <Grid.Column width={8}>
            <YelpHeader location={this.props.location} finalizeSelection={this.finalizeSelection} />
            <YelpSearchBar location={this.props.location} setResults={this.setResults} />
          </Grid.Column>
          <Grid.Row columns={1}>
            <Grid.Column>
              <Card.Group stackable itemsPerRow={5}>
                {this.state.results.length > 0 &&
                  this.state.results.map(result => (
                    <YelpSearchCard result={result} key={result.id} />
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
