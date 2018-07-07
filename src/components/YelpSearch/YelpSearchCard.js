import React from 'react';
import { Card, Icon, Image, List } from 'semantic-ui-react';
import _ from 'lodash';

const YelpSearchCard = ({ result }) => (
  <Card>
    {console.log(result)}
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
              {`${result.location.address1} ${result.location.city}`}
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
      .1 miles away<br />
    </Card.Content>
  </Card>
);

export default YelpSearchCard;
