import React from 'react';
import { List, Icon } from 'semantic-ui-react';

const MapDirectionList = ({ step }) => {
  const miles = Math.round(step.distance * 0.000621371192 * 10) / 10;
  const minutes = Math.round(step.duration / 60);
  return (
    <List.Item>
      <Icon name="map signs" color="olive" />
      <List.Content>
        <List.Header>{step.maneuver.instruction}</List.Header>
        <List.Description>{`${minutes} minutes (${miles} miles)`}</List.Description>
      </List.Content>
    </List.Item>
  );
};

export default MapDirectionList;
