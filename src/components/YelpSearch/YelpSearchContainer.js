import React from 'react';
import { Grid } from 'semantic-ui-react';

class YelpSearchContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <Grid.Column>this.props.location.name</Grid.Column>;
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
