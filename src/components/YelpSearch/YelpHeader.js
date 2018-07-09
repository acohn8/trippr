import React from 'react';
import { Header, Image, Grid, Divider } from 'semantic-ui-react';

const YelpHeader = props => (
  <Header as="h2" content={`Find the best food in and around ${props.city}`} />
);

export default YelpHeader;
