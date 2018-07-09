import React from 'react';
import { Message } from 'semantic-ui-react';

const Error = ({ message }) => (
  <Message negative>
    <Message.Header>Uh oh...</Message.Header>
    <p>{message}</p>
  </Message>
);

export default Error;
