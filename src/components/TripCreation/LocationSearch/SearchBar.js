import React from "react";
import { Form, Input, Icon, Segment, List } from "semantic-ui-react";
import _ from "lodash";
import SearchResults from "./SearchResults";
import Error from "../../Error";

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      results: [],

      error: false
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
      }.json?access_token=pk.eyJ1IjoiYWRhbWNvaG4iLCJhIjoiY2pod2Z5ZWQzMDBtZzNxcXNvaW8xcGNiNiJ9.fHYsK6UNzqknxKuchhfp7A&country=us`
    )
      .then(res => res.json())
      .then(json => this.setState({ results: json.features.slice(0, 5) }));
  };

  locationError = () => {
    this.setState({ error: true }), this.props.history.push("/home");
  };

  handleError = () => {
    this.setState(
      {
        search: "",
        results: []
        // loading: false,
      },
      this.locationError()
    );
  };

  handleChange = event => {
    this.setState(
      { search: event.target.value },
      _.debounce(this.searchforLocation, 100)
    );
  };

  getLocationFromList = element => {
    console.log(element);
    this.props.saveLocation(element.result);
  };

  render() {
    return (
      <Segment basic>
        {this.state.error ? (
          <Error
            message={"Location could not be found, search again"}
            color={"red"}
          />
        ) : null}
        <Form>
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
