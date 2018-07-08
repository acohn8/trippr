import React from 'react';
import { Dropdown, Menu } from 'semantic-ui-react';

const options = [{ key: 1, text: 'Distance', value: 1 }, { key: 2, text: 'Rating', value: 2 }];

const YelpSort = props => (
  <Menu compact>
    <Dropdown text="Sort" options={options} simple item onChange={props.sortResults} />
  </Menu>
);

export default YelpSort;
