import React from 'react';
import { Menu, Button } from 'semantic-ui-react';
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
      <Menu inverted size="large" color="blue">
        <Menu.Item
          as={Link}
          to={`/`}
          name="Home"
          active={activeItem === 'home'}
          onClick={this.handleItemClick}
        />
        {/* <Menu.Item
          as={Link}
          to={`/trips`}
          name="trips"
          active={activeItem === "trips"}
          onClick={this.handleItemClick}
        /> */}
        <Menu.Menu position="right">
          <Menu.Item>
            <Button as={Link} to={`/login`} onClick={this.props.logoutUser} primary>
              {this.props.user ? 'Logout' : 'Login'}
            </Button>
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    );
  }
}
export default Nav;
