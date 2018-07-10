import React from "react";
import { Message } from "semantic-ui-react";

const Error = props => (
  <Message color={props.color}>
    <p>{props.message}</p>
  </Message>
);

export default Error;
