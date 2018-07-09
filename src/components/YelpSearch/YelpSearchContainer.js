import React from "react";
import {
  Grid,
  Segment,
  Loader,
  Item,
  Divider,
  Header,
  Card
} from "semantic-ui-react";
import distance from "@turf/distance";

import YelpHeader from "./YelpHeader";
import YelpSearchCard from "./YelpSearchCard";
import YelpCategoryFilter from "./YelpCategoryFilter";
import Error from "../Error";

class YelpSearchContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [],
      loading: false,
      complete: false,
      filteredResults: [],
      searchDistance: ""
    };
  }

  setResults = results => {
    const sortedResults = results.slice();
    sortedResults.map(result => {
      const to = [result.coordinates.longitude, result.coordinates.latitude];
      const from = [this.props.longitude, this.props.latitude];
      const options = { units: "miles" };
      const userDistance = distance(from, to, options);
      result.distance = userDistance;
    });
    sortedResults.sort((a, b) => b.rating - a.rating);
    const initialResults = sortedResults
      .filter(result => result.distance <= 1)
      .slice(0, 5);
    this.setState({
      results: sortedResults,
      loading: false,
      complete: true,
      error: false,
      filteredResults: initialResults,
      searchDistance: "The best within a mile"
    });
  };

  getYelpResults = category => {
    this.setState({
      results: [],
      loading: false,
      complete: false,
      filteredResults: [],
      searchDistance: ""
    });
    fetch(
      `https://cryptic-headland-94862.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=${category}&latitude=${
        this.props.latitude
      }&longitude=${this.props.longitude}`,
      {
        headers: {
          authorization:
            "Bearer B0_o-WOtonclsraT47gpBMjFd_jGrcgkYkl6O74pf4ETwW_GBcfXgSdCbXjffWEsF2gYeFA54QnyG3sKi48covsP2qsu5wrBivNEHNqdUaS1rGcScv0Es8a8OXY_W3Yx"
        }
      }
    )
      .catch(this.handleError)
      .then(res => res.json())
      .then(json => this.setResults(json.businesses));
  };

  handleError = () => {
    this.setState({ error: true });
  };

  filterDistance = (event, data) => {
    let filteredResults;
    let searchDistance;
    if (data.value === 1 || typeof data.value === "undefined") {
      filteredResults = this.state.results
        .filter(result => result.distance <= 1)
        .slice(0, 5);
      searchDistance = "The best within a mile";
    } else if (data.value === 2) {
      filteredResults = this.state.results
        .filter(result => result.distance <= 3)
        .slice(0, 5);
      searchDistance = "The best within three miles";
    } else if (data.value === 3) {
      filteredResults = this.state.results.slice(0, 5);
      searchDistance = "The best in the area";
    }
    this.setState({
      filteredResults: filteredResults,
      searchDistance: searchDistance
    });
  };

  bookmark = yelpResults => {
    console.log("Yelp Result", yelpResults);
  };

  render() {
    return (
      <div>
        <div>
          {this.state.error === true && (
            <Error
              message={"Location not found. Please select a trip"}
              color={"red"}
            />
          )}
          {this.state.complete === true &&
            this.state.filteredResults.length === 0 && (
              <Error
                message={
                  "No results found, please adjust your distance filter or search again."
                }
                color={"brown"}
              />
            )}
          <YelpHeader
            city={this.props.city}
            finalizeSelection={this.finalizeSelection}
          />
          <YelpCategoryFilter
            getYelpResults={this.getYelpResults}
            filterDistance={this.filterDistance}
          />
          {this.state.loading === true && <Loader active inline="centered" />}
        </div>
        <div>
          <div>
            {this.state.filteredResults.length > 0 && (
              <Item.Group>
                <Header as="h2">{this.state.searchDistance}</Header>
                {this.state.filteredResults.map(result => (
                  <YelpSearchCard
                    result={result}
                    key={result.id}
                    bookmark={this.props.bookmark}
                  />
                ))}
              </Item.Group>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default YelpSearchContainer;
