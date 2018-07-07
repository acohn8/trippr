import React from 'react';
import { Card, Icon, Image, List, Label } from 'semantic-ui-react';

const YelpSearchCard = ({ result }) => (
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
        <Icon color="yellow" name="star" />
        <Icon color="yellow" name="star" />
        <Icon color="yellow" name="star" />
        <Icon color="yellow" name="star" />
        <Icon color="yellow" name="star half full" />
      </Card.Meta>
      <List>
        <List.Item>
          <List.Icon name="pin" verticalAlign="middle" />
          <List.Content>
            <List.Header>Address</List.Header>
            <List.Description>{`${result.address1} ${result.city}`}</List.Description>
          </List.Content>
        </List.Item>
        <List.Item>
          <List.Icon name="phone" verticalAlign="middle" />
          <List.Content>
            <List.Header>Phone</List.Header>
            <List.Description>{result.phone}</List.Description>
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
