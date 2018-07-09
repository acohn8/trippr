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
            src="https://s3-media4.fl.yelpcdn.com/bphoto/Mr9ZgIhQOrJAaQt_vl2S4A/o.jpg"
          />
          <Card.Header>Restraunt Name</Card.Header>
          <Card.Meta>Cuisine</Card.Meta>
          <Card.Description>Short description</Card.Description>
        </Card.Content>
      </Card>
    );
  }
}

export default Bookmark;
