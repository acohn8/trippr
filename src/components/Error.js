import React from 'react';
import { Message } from 'semantic-ui-react';

const Error = props => (
  <Message color={props.color}>
    <Message.Header>Uh oh...</Message.Header>
    <p>{props.message}</p>
  </Message>
);

export default Error;
