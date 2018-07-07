import React from 'react';
import { Card, Icon, Image, List } from 'semantic-ui-react';
import _ from 'lodash';
import distance from '@turf/distance';

const YelpSearchCard = (props) => {
  const result = props.result;
  const to = [result.coordinates.longitude, result.coordinates.latitude];
  const from = props.coords;
  const options = { units: 'miles' };
  const userDistance = distance(from, to, options);
  return (
    <Card>
      <Image
        src={result.image_url}
        label={{
          as: 'a',
          color: 'olive',
          icon: 'bookmark',
          ribbon: true,
        }}
      />
      <Card.Content>
        <Card.Header>
          <a href={result.url}>{result.name}</a>
        </Card.Header>

        <Card.Meta>
          {_.times(Math.round(result.rating), () => <Icon color="yellow" name="star" />)}
        </Card.Meta>
        <List>
          <List.Item>
            <List.Icon name="pin" verticalAlign="middle" />
            <List.Content>
              <List.Header>Address</List.Header>
              <List.Description>
                {`${result.location.display_address[0]}\n${result.location.display_address[1]}`}
              </List.Description>
            </List.Content>
          </List.Item>
          <List.Item>
            <List.Icon name="phone" verticalAlign="middle" />
            <List.Content>
              <List.Header>Phone</List.Header>
              <List.Description>{result.display_phone}</List.Description>
            </List.Content>
          </List.Item>
        </List>
      </Card.Content>
      <Card.Content extra>
        {Math.round(userDistance * 10) / 10} <br />
        miles away
      </Card.Content>
    </Card>
  );
};

export default YelpSearchCard;
