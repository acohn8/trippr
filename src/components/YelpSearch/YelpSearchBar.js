import React from 'react';
import _ from 'lodash';
import { Input, Form, Segment } from 'semantic-ui-react';

class YelpSearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      locationFound: false,
      loading: false,
    };
  }

  componentWillUnmount() {
    this.setState({
      search: '',
      locationFound: false,
      loading: false,
    });
  }

  handleChange = event => {
    this.setState({ search: event.target.value });
  };

  handleSubmit = () => {
    this.props.getYelpResults(this.state.search);
  };

  render() {
    return (
      <Form fluid onSubmit={this.handleSubmit}>
        <Form.Field>
          <label>Search for a something specific</label>
          <Input
            fluid
            placeholder="Search..."
            value={this.state.search}
            onChange={this.handleChange}
          />
        </Form.Field>
      </Form>
    );
  }
}

export default YelpSearchBar;
