import React from "react";
import { Menu, Button, Divider } from "semantic-ui-react";
import { Link } from "react-router-dom";

class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.state = { activeItem: "home" };
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  logout = () => {
    localStorage.removeItem("token");
    this.location.reload();
  };

  render() {
    const { activeItem } = this.state;

    return (
      <div>
        {this.props.user ? (
          <Menu inverted size="large" color="blue">
            <Menu.Item>{this.props.user.email}</Menu.Item>
            <Menu.Item
              as={Link}
              to={`/`}
              name="Trips"
              active={activeItem === "home"}
              onClick={this.handleItemClick}
            />
            <Menu.Item
              as={Link}
              to={`/create-trip`}
              name="Create Trip"
              active={activeItem === "trips"}
              onClick={this.handleItemClick}
            />
            <Menu.Menu position="right">
              <Menu.Item>
                <Button onClick={this.logout} as={Link} to={`/`} primary>
                  {this.props.user ? "Logout" : "Login"}
                </Button>
              </Menu.Item>
            </Menu.Menu>
          </Menu>
        ) : (
          <Menu inverted size="large" color="blue">
            <Menu.Item name="Trippr" active={true} />{" "}
          </Menu>
        )}
        <Divider horizontal />
      </div>
    );
  }
}
export default Nav;
