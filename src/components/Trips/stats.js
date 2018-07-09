import React from "react";

class Stats extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Statistic.Group widths="two">
        <Statistic>
          <Statistic.Value>
            <Icon name="plane" />
            {this.props.trips.length}
          </Statistic.Value>
          <Statistic.Label>Upcoming Trips</Statistic.Label>
        </Statistic>
        <Statistic>
          <Statistic.Value>
            <Icon name="food" />
            51
          </Statistic.Value>
          <Statistic.Label>Saved Restraunts</Statistic.Label>
        </Statistic>
      </Statistic.Group>
    );
  }
}

export default Stats;
