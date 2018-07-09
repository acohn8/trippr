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
        <Header as="h2">Bookmarked Restraunts</Header>
        <Card.Group>
          {this.props.bookmarks.map(bookmark => {
            return <Bookmark bookmark={bookmark} />;
          })}
        </Card.Group>
      </div>
    );
  }
}

export default BookmarksContainer;
