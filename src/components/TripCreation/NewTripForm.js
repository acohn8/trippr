import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import { Form } from 'semantic-ui-react';

class NewTripForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: null,
      endDate: null,
    };
  }

  handleStartDate = date => {
    this.setState({
      startDate: date,
    });
  };

  handleEndDate = date => {
    this.setState({
      endDate: date,
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    let formData = {
      start_date: this.state.startDate,
      end_date: this.state.endDate,
    };
    this.props.saveTrip(formData);
  };

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Group>
          <Form.Field
            label="Start Date"
            control={DatePicker}
            placeholderText="Start Date"
            selected={this.state.startDate}
            onChange={this.handleStartDate}
          />
          <Form.Field
            label="End Date"
            control={DatePicker}
            placeholderText="End Date"
            selected={this.state.endDate}
            onChange={this.handleEndDate}
          />
        </Form.Group>
        <Form.Group widths="equal" />
        <Form.Button type="submit">Save</Form.Button>
      </Form>
    );
  }
}

export default NewTripForm;
