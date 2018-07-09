import React from 'react';
import { Link } from 'react-router-dom';

import { Card, Icon, Image, Statistic } from 'semantic-ui-react';
import Moment from 'react-moment';

class UserTrips extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Card.Group>
        {this.props.trips.map(trip => (
          <Card>
            <Image src={trip.image} />
            <Card.Content>
              <Card.Header>
                <Link to={`/trips/${trip.id}`}>{trip.city}</Link>
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
        ))}
      </Card.Group>
    );
  }
}

export default UserTrips;
