import React from "react";
import { Card, Icon, Image } from "semantic-ui-react";
import Moment from "react-moment";

class UserTrips extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Card.Group>
        {this.props.trips.map(trip => {
          return (
            <Card>
              <Image src={trip.image} />
              <Card.Content>
                <Card.Header>
                  <a>{trip.city}</a>
                </Card.Header>
                <Card.Meta>
                  <Moment date={trip.start_date} format="ddd MMM D, YYYY" />
                </Card.Meta>
                <Card.Description>
                  <Icon name="food" />
                  10 Restraunts Bookmarked
                </Card.Description>
              </Card.Content>
              <Card.Content extra>
                <a>Delete</a>
              </Card.Content>
            </Card>
          );
        })}
      </Card.Group>
    );
  }
}

export default UserTrips;
