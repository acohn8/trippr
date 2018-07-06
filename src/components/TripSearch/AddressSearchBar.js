import React from 'react';
import { Button, Form } from 'semantic-ui-react';

const AddressSearchBar = () => (
  <Form>
    <Form.Field>
      <input placeholder="Address or city" />
    </Form.Field>
    <Button type="submit">Submit</Button>
  </Form>
);

export default AddressSearchBar;
