import React from 'react';
import { Form, Radio, Button } from 'semantic-ui-react';

const MapDirectionsFilter = props => (
  <Button.Group basic size="large" widths="3">
    <Button icon="car" value={1} onClick={props.setDirectionType} />
    <Button icon="male" value={2} onClick={props.setDirectionType} />
    <Button icon="bicycle" value={3} onClick={props.setDirectionType} />
  </Button.Group>
);

export default MapDirectionsFilter;
