import React from 'react';
import Bookmark from './Bookmark';
import { Card, Header, Grid } from 'semantic-ui-react';

class BookmarksContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Grid.Row>
        <Header as="h2">Bookmarked Restraunts</Header>
        <Card.Group>
          {this.props.bookmarks.map(bookmark => <Bookmark bookmark={bookmark} />)}
        </Card.Group>
      </Grid.Row>
    );
  }
}

export default BookmarksContainer;
