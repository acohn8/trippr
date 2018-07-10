import React from 'react';
import { Form, Radio } from 'semantic-ui-react';

class MapDirectionsFilter extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: 1 };
  }

  handleChange = (e, { value }) => {
    this.setState({ value: value }, () => this.props.setDirectionType(this.state.value));
  };

  render() {
    const { value } = this.state;
    return (
      <Form.Group inline>
        <Form.Field
          control={Radio}
          label="Driving"
          value={1}
          checked={value === 1}
          onChange={this.handleChange}
        />
        <Form.Field
          control={Radio}
          label="Walking"
          value={2}
          checked={value === 2}
          onChange={this.handleChange}
        />
        <Form.Field
          control={Radio}
          label="Cycling"
          value={3}
          checked={value === 3}
          onChange={this.handleChange}
        />
      </Form.Group>
    );
  }
}

export default MapDirectionsFilter;
