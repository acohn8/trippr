import React from 'react';
import { List, Icon } from 'semantic-ui-react';

const MapDirectionList = ({ step }) => (
  <List.Item>
    <Icon name="map signs" />
    <List.Content>
      <List.Description>{step.maneuver.instruction}</List.Description>
    </List.Content>
  </List.Item>
);

export default MapDirectionList;
