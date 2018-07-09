import React from "react";
import { Form, Input, Icon, Segment, List } from "semantic-ui-react";
import _ from "lodash";
import SearchResults from "./SearchResults";

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      results: [],
<<<<<<< HEAD
      loading: false
=======
      // loading: false,
>>>>>>> 85ad64c5b88bcd8ffe1cec54d41ef73686e026ed
    };
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
      }.json?access_token=pk.eyJ1IjoiYWRhbWNvaG4iLCJhIjoiY2pod2Z5ZWQzMDBtZzNxcXNvaW8xcGNiNiJ9.fHYsK6UNzqknxKuchhfp7A&country=us&autocomplete=true`
    )
      .then(res => res.json())
      .then(json => this.setState({ results: json.features.slice(0, 5) }));
  };

<<<<<<< HEAD
  fetchSearchLocation = () => {
    fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${
        this.state.search
      }.json?access_token=pk.eyJ1IjoiYWRhbWNvaG4iLCJhIjoiY2pod2Z5ZWQzMDBtZzNxcXNvaW8xcGNiNiJ9.fHYsK6UNzqknxKuchhfp7A&country=us`
    )
      .then(res => res.json())
      .then(geoData => this.props.saveLocation(geoData))
      .catch(this.handleError)
      .then(this.props.history.push("/new-trip"));
  };
=======
  // fetchSearchLocation = () => {
  //   fetch(
  //     `https://api.mapbox.com/geocoding/v5/mapbox.places/${
  //       this.state.search.id
  //     }.json?access_token=pk.eyJ1IjoiYWRhbWNvaG4iLCJhIjoiY2pod2Z5ZWQzMDBtZzNxcXNvaW8xcGNiNiJ9.fHYsK6UNzqknxKuchhfp7A&country=us`,
  //   )
  //     .then(res => res.json())
  //     .then(geoData => this.props.saveLocation(geoData))
  //     .catch(this.handleError)
  //     .then(this.props.history.push('/new-trip'));
  // };
>>>>>>> 85ad64c5b88bcd8ffe1cec54d41ef73686e026ed

  handleError = () => {
    this.setState(
      {
        search: "",
        results: [],
<<<<<<< HEAD
        loading: false
=======
        // loading: false,
>>>>>>> 85ad64c5b88bcd8ffe1cec54d41ef73686e026ed
      },
      this.props.locationError()
    );
  };

  handleChange = event => {
    this.setState(
      { search: event.target.value },
      _.debounce(this.searchforLocation, 100)
    );
  };

  // startGeolocate = () => {
  //   this.setState({ loading: true }, this.geolocate);
  // };

<<<<<<< HEAD
  geolocate = () => {
    navigator.geolocation.getCurrentPosition(position => {
      this.setState(
        { search: `${position.coords.longitude}, ${position.coords.latitude}` },
        this.fetchSearchLocation
      );
    });
  };

  getLocationFromList = element => {
    this.setState(
      { search: element.result.id, loading: true },
      this.fetchSearchLocation
    );
=======
  // geolocate = () => {
  //   navigator.geolocation.getCurrentPosition(position => {
  //     this.setState(
  //       { search: `${position.coords.longitude}, ${position.coords.latitude}` },
  //       this.fetchSearchLocation,
  //     );
  //   });
  // };

  getLocationFromList = element => {
    this.props.saveLocation(element.result);
>>>>>>> 85ad64c5b88bcd8ffe1cec54d41ef73686e026ed
  };

  render() {
    return (
      <Segment basic>
        <Form>
          {/* <Form onSubmit={this.handleSubmit}> */}
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
                  // <Icon
                  //   name="location arrow"
                  //   color="olive"
                  //   inverted
                  //   circular
                  //   link
                  //   onClick={this.startGeolocate}
                  // />
                }
              </Input>
            )}
          </Form.Field>
        </Form>
        {this.state.results.map(result => (
          <List selection key={result.id}>
            <SearchResults result={result} select={this.getLocationFromList} />
          </List>
        ))}
      </Segment>
    );
  }
}

export default SearchBar;
