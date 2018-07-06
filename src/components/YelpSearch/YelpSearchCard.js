import React from 'react';
import { Card, Icon, Image, List, Label } from 'semantic-ui-react';

const YelpSearchCard = () => (
  <Card>
    <Image
      src="http://s3-media2.fl.yelpcdn.com/bphoto/MmgtASP3l_t4tPCL1iAsCg/o.jpg"
      label={{
        as: 'a',
        color: 'olive',
        icon: 'bookmark',
        ribbon: true,
      }}
    />
    <Card.Content>
      <Card.Header>
        <a href="https://www.yelp.com/biz/four-barrel-coffee-san-francisco">Four Barrel Coffee</a>
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
            <List.Description>375 Valencia St San Francisco, CA 94103</List.Description>
          </List.Content>
        </List.Item>
        <List.Item>
          <List.Icon name="phone" verticalAlign="middle" />
          <List.Content>
            <List.Header>Phone</List.Header>
            <List.Description>(415)252-0800</List.Description>
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
