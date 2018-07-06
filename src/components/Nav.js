import React, { Component } from 'react';
import { Menu, Segment } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.state = { activeItem: 'home' };
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { activeItem } = this.state;

    return (
      <Segment inverted color="blue">
        <Menu inverted pointing secondary color="blue">
          {this.props.location !== '' ? <Menu.Item header name={this.props.location} /> : null}
          <Menu.Item
            as={Link}
            to={`/home`}
            name="home"
            active={activeItem === 'home'}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            as={Link}
            to={`/trips`}
            name="trips"
            active={activeItem === 'trips'}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            as={Link}
            to={`/bookmarks`}
            name="bookmarks"
            active={activeItem === 'bookmarks'}
            onClick={this.handleItemClick}
          />
        </Menu>
      </Segment>
    );
  }
}
export default Nav;
