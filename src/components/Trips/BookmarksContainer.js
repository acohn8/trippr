import React from "react";
import Bookmark from "./Bookmark";
import { Card, Header, Button } from "semantic-ui-react";

class BookmarksContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Header as="h3">Bookmarked Restraunts</Header>
        <Card.Group>
          <Bookmark />
          <Bookmark />
          <Bookmark />
          <Bookmark />
        </Card.Group>
      </div>
    );
  }
}

export default BookmarksContainer;
