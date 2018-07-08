import React from 'react';
import { Card, Icon, Image, List } from 'semantic-ui-react';
import _ from 'lodash';
import YelpBusinessPage from './YelpBusinessPage';

const YelpSearchCard = (props) => {
  const result = props.result;
  return (
    <Card>
      <YelpBusinessPage id={result.id} />
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
        <Card.Header>{result.name}</Card.Header>
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
      <Card.Content extra>{`${Math.round(result.distance * 10) / 10} miles`}</Card.Content>
    </Card>
  );
};

export default YelpSearchCard;
