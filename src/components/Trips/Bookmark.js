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
          <Image
            floated="right"
            size="mini"
            src={this.props.bookmark.image_url}
          />
          <Card.Header>{this.props.bookmark.name}</Card.Header>
          <Card.Meta>
            {this.props.bookmark.categories
              .map(catObj => {
                return catObj.alias;
              })
              .join(", ")}
          </Card.Meta>
          <Card.Description>
            {this.props.bookmark.location.display_address.join(" ")}
          </Card.Description>
        </Card.Content>
      </Card>
    );
  }
}

export default Bookmark;
