import React from 'react';
import { Dropdown } from 'semantic-ui-react';

const options = [
  { key: 'oneMile', text: '1 mile', value: 1 },
  { key: 'threeMiles', text: '3 miles', value: 2 },
  { key: 'wholeArea', text: 'Whole area', value: 3 },
];

const YelpDistanceFilter = props => (
  <Dropdown
    text="Filter Distance"
    icon="filter"
    floating
    labeled
    button
    className="icon"
    onChange={props.filterDistance}
    options={options}
  />
);

export default YelpDistanceFilter;
