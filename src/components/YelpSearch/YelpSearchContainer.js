import React from 'react';
import { Grid, Card, Header } from 'semantic-ui-react';
import YelpSearchBar from './YelpSearchBar';
import YelpHeader from './YelpHeader';
import YelpSearchCard from './YelpSearchCard';

const cards = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}];

class YelpSearchContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { userSelection: '' };
    console.log(this.props);
  }

  finalizeSelection = value => {
    // console.log(value);
    // this.setState({ userSelection: value });
  };

  render() {
    return (
      <div>
        <Grid.Column>
          <Grid.Row>
            <YelpHeader location={this.props.location} finalizeSelection={this.finalizeSelection} />
          </Grid.Row>
          <Grid.Row>
            <YelpSearchBar location={this.props.location} />
          </Grid.Row>
        </Grid.Column>
        <Grid.Row>
          <Header as="h2">Results</Header>
          <Card.Group itemsPerRow={5}>{cards.map(card => <YelpSearchCard />)}</Card.Group>
        </Grid.Row>
      </div>
    );
  }
  // componentDidMount() {
  //   fetch(
  //     'https://api.yelp.com/v3/autocomplete?text=del&latitude=37.786882&longitude=-122.399972',
  //     {
  //       headers: {
  //         authorization:
  //           'Bearer B0_o-WOtonclsraT47gpBMjFd_jGrcgkYkl6O74pf4ETwW_GBcfXgSdCbXjffWEsF2gYeFA54QnyG3sKi48covsP2qsu5wrBivNEHNqdUaS1rGcScv0Es8a8OXY_W3Yx',
  //       },
  //     },
  //   )
  //     .then(res => res.json())
  //     .then(json => console.log(json));
  // }
  // render() {
  //   return <div />;
  // }
}

export default YelpSearchContainer;
