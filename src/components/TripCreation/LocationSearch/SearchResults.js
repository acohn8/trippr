import React from "react";
import { List } from "semantic-ui-react";

const SearchResults = props => {
  const result = props.result;
  return (
    <List.Item key={result.id} onClick={() => props.select(props)}>
      <List.Icon
        name="map marker alternate"
        size="large"
        verticalAlign="middle"
        color="blue"
      />
      <List.Content>
        <List.Header>{result.text}</List.Header>
        <List.Description>
          {result.place_name
            .split(",")
            .filter(place => place !== result.text)
            .join(", ")}
        </List.Description>
      </List.Content>
    </List.Item>
  );
};

export default SearchResults;
