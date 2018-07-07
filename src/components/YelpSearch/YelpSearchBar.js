import React from 'react';
import _ from 'lodash';
import { Input, Form, Segment } from 'semantic-ui-react';

class YelpSearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      locationFound: false,
      loading: false,
    };
  }

  componentWillUnmount() {
    this.setState({
      search: '',
      locationFound: false,
      loading: false,
    });
  }

  searchforLocation = () => {
    if (this.state.search.length > 0) {
      this.fetchLocationFrag();
    } else {
      this.setState({ search: '' });
    }
  };

  fetchLocationFrag = () => {
    fetch(
      `https://cryptic-headland-94862.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=${
        this.state.search
      }&latitude=${this.props.location[0].coords[1]}&longitude=${this.props.location[0].coords[0]}`,
      {
        headers: {
          authorization:
            'Bearer B0_o-WOtonclsraT47gpBMjFd_jGrcgkYkl6O74pf4ETwW_GBcfXgSdCbXjffWEsF2gYeFA54QnyG3sKi48covsP2qsu5wrBivNEHNqdUaS1rGcScv0Es8a8OXY_W3Yx',
        },
      },
    )
      .then(res => res.json())
      .then(json => this.props.setResults(json.businesses.slice(0, 15)));
  };

  handleChange = event => {
    this.setState({ search: event.target.value }, _.debounce(this.searchforLocation, 200));
  };

  render() {
    return (
      <Segment basic>
        <Form onSubmit={this.handleSubmit}>
          <Form.Field>
            <Input
              icon
              placeholder="Search..."
              onChange={this.handleChange}
              value={this.state.search}
            >
              <input />
            </Input>
          </Form.Field>
        </Form>
      </Segment>
    );
  }
}

export default YelpSearchBar;
