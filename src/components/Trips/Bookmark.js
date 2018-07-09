import React from "react";
import { Card, Image, Button } from "semantic-ui-react";

class Bookmark extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Card>
        <Card.Content>
          <Image floated="right" size="mini" src={this.props.bookmark.image} />
          <Card.Header>{this.props.bookmark.title}</Card.Header>
          <Card.Meta>{this.props.bookmark.description}</Card.Meta>
          <Card.Description>{this.props.bookmark.address}</Card.Description>
        </Card.Content>
      </Card>
    );
  }
}

export default Bookmark;
