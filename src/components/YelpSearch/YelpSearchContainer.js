import React from 'react';
import { Grid, Card, Header } from 'semantic-ui-react';
import YelpSearchBar from './YelpSearchBar';
import YelpHeader from './YelpHeader';

class YelpSearchContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Grid.Column>
        <Grid.Row>
          <YelpHeader location={this.props.location} finalizeSelection={this.finalizeSelection} />
        </Grid.Row>
        <Grid.Row>
          <YelpSearchBar location={this.props.location} />
        </Grid.Row>
      </Grid.Column>
    );
  }
}

export default YelpSearchContainer;
