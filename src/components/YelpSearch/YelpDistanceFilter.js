import React from 'react';
import { Dropdown, Form, Radio } from 'semantic-ui-react';

const options = [
  { key: 'oneMile', text: '1 mile', value: 1 },
  { key: 'threeMiles', text: '3 miles', value: 2 },
  { key: 'wholeArea', text: 'Whole area', value: 3 },
];

class YelpDistanceFilter extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: 1 };
  }

  handleChange = (e, { value }) => {
    this.setState({ value }, () => this.props.filterDistance(this.state.value));
  };

  render() {
    const { value } = this.state;
    return (
      <Form.Group inline>
        <label>Radius</label>
        <Form.Field
          control={Radio}
          label="1 mile"
          value={1}
          checked={value === 1}
          onChange={this.handleChange}
        />
        <Form.Field
          control={Radio}
          label="2 miles"
          value={2}
          checked={value === 2}
          onChange={this.handleChange}
        />
        <Form.Field
          control={Radio}
          label="Whole area"
          value={3}
          checked={value === 3}
          onChange={this.handleChange}
        />
      </Form.Group>
    );
  }
}

export default YelpDistanceFilter;
