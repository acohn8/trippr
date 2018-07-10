import React from "react";
import Login from "./Login";
import { Button, Header, Grid, Divider, Segment } from "semantic-ui-react";

class UserContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newUser: true
    };
  }

  changeUserState = () => {
    this.setState({
      newUser: !this.state.newUser
    });
  };

  render() {
    return (
      <Grid verticalAlign="middle" centered>
        <Grid.Column width={8}>
          <Segment>
            <Header as="h1">
              {this.state.newUser ? "Create New Account" : "Sign In"}
            </Header>
            <Login newUser={this.state.newUser} />
            <Divider horizontal />
            <Divider horizontal>
              {this.state.newUser ? "Current User?" : "New User?"}
            </Divider>
            <Button secondary fluid onClick={this.changeUserState}>
              {this.state.newUser ? "Sign In" : "Sign Up"}
            </Button>
          </Segment>
        </Grid.Column>
      </Grid>
    );
  }
}

export default UserContainer;
