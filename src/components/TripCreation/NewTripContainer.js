import React from "react";
import { Header, Grid, Segment, Icon } from "semantic-ui-react";

import NewTripForm from "./NewTripForm";

class NewTripContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Grid columns="equal">
        <Grid.Column />
        <Grid.Column width={8}>
          <Segment>
            <Grid.Row>
              <Header as="h1">
                <Icon name="plane" />
                <Header.Content>
                  {this.props.location.name}
                  <Header.Subheader>Enter your trip dates</Header.Subheader>
                </Header.Content>
              </Header>
              <NewTripForm
                location={this.props.location}
                saveTrip={this.props.saveTrip}
                history={this.props.history}
              />
            </Grid.Row>
          </Segment>
        </Grid.Column>
        <Grid.Column />
      </Grid>
    );
  }
}

export default NewTripContainer;
