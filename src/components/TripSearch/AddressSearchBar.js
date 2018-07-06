import React from 'react';
import { Form, Input, Icon, Segment, List } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import _ from 'lodash';
import AddressSearchResults from './AddressSearchResults';

class AddressSearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      results: [],
      locationFound: false,
      loading: false,
    };
  }

  componentDidUpdate() {
    if (this.state.locationFound === true) {
      this.setState({
        search: '',
        locationFound: false,
        loading: false,
        results: [],
      });
    }
  }

  componentWillUnmount() {
    this.completeLoad();
  }

  searchforLocation = () => {
    if (this.state.search.length > 1) {
      this.fetchLocationFrag();
    } else {
      this.setState({ results: [] });
    }
  };

  fetchLocationFrag = () => {
    fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${
        this.state.search
      }.json?access_token=pk.eyJ1IjoiYWRhbWNvaG4iLCJhIjoiY2pod2Z5ZWQzMDBtZzNxcXNvaW8xcGNiNiJ9.fHYsK6UNzqknxKuchhfp7A&country=us&autocomplete=true`,
    )
      .then(res => res.json())
      .then(json => this.setState({ results: json.features.slice(0, 5) }));
  };

  fetchSearchLocation = () => {
    fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${
        this.state.search
      }.json?access_token=pk.eyJ1IjoiYWRhbWNvaG4iLCJhIjoiY2pod2Z5ZWQzMDBtZzNxcXNvaW8xcGNiNiJ9.fHYsK6UNzqknxKuchhfp7A&country=us`,
    )
      .then(res => res.json())
      .then(geoData => this.props.saveLocation(geoData))
      .then(this.props.history.push('/search'));
  };

  completeLoad = () => {
    this.setState({
      results: [],
      locationFound: true,
    });
  };

  handleChange = event => {
    this.setState({ search: event.target.value }, _.debounce(this.searchforLocation, 200));
  };

  startGeolocate = () => {
    this.setState({ loading: true }, this.geolocate);
  };

  geolocate = () => {
    navigator.geolocation.getCurrentPosition(position => {
      this.setState(
        { search: `${position.coords.longitude}, ${position.coords.latitude}` },
        this.fetchSearchLocation,
      );
    });
  };

  getLocationFromList = element => {
    this.setState({ search: element.result.id, loading: true }, this.fetchSearchLocation);
  };

  handleSubmit = event => {
    event.preventDefault();
    this.setState({ loading: true }, this.fetchSearchLocation);
  };

  render() {
    return (
      <Segment basic>
        <Form onSubmit={this.handleSubmit}>
          <Form.Field>
            {this.state.loading === true ? (
              <Input loading placeholder="Search..." />
            ) : (
              <Input
                icon
                placeholder="Search..."
                onChange={this.handleChange}
                value={this.state.search}
              >
                <input />
                {
                  <Icon
                    name="location arrow"
                    color="olive"
                    inverted
                    circular
                    link
                    onClick={this.startGeolocate}
                  />
                }
              </Input>
            )}
          </Form.Field>
        </Form>
        {this.state.locationFound === false &&
          this.state.results.map(result => (
            <List selection key={result.id}>
              <AddressSearchResults result={result} select={this.getLocationFromList} />
            </List>
          ))}
      </Segment>
    );
  }
}

export default AddressSearchBar;
