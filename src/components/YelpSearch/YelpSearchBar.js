import React from 'react';
import { Input, Form } from 'semantic-ui-react';

class YelpSearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { searchTerm: '' };
  }

  handleChange = e => {
    this.setState({ searchTerm: e.target.value });
  };

  handleSubmit = () => {
    this.fetchSearchData();
  };

  fetchSearchData = () => {
    fetch(
      `https://cryptic-headland-94862.herokuapp.com/https://api.yelp.com/v3/autocomplete?text=del${
        this.state.searchTerm
      }&latitude=${this.props.location[0].coords[1]}&longitude=${this.props.location[0].coords[0]}`,
      {
        headers: {
          authorization:
            'Bearer B0_o-WOtonclsraT47gpBMjFd_jGrcgkYkl6O74pf4ETwW_GBcfXgSdCbXjffWEsF2gYeFA54QnyG3sKi48covsP2qsu5wrBivNEHNqdUaS1rGcScv0Es8a8OXY_W3Yx',
        },
      },
    )
      .then(res => res.json())
      .then(json => console.log(json));
  };

  render() {
    console.log(this.props.location);
    return (
      <Form onSubmit={this.handleSubmit}>
        <Input
          fluid
          icon="search"
          placeholder="Search..."
          onChange={this.handleChange}
          value={this.state.searchTerm}
        />
      </Form>
    );
  }
}

export default YelpSearchBar;
