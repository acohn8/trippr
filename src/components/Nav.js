import React, { Component } from 'react';
import { Menu, Segment } from 'semantic-ui-react';

class Nav extends React.Component {
  state = { activeItem: 'home' };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { activeItem } = this.state;

    return (
      <Segment inverted color="blue">
        <Menu inverted pointing secondary color="blue">
          <Menu.Item name="home" active={activeItem === 'home'} onClick={this.handleItemClick} />
          <Menu.Item name="trips" active={activeItem === 'trips'} onClick={this.handleItemClick} />
          <Menu.Item
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
