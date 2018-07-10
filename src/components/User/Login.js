import React from "react";
import {
  Button,
  Checkbox,
  Form,
  Grid,
  Header,
  Divider,
  Segment
} from "semantic-ui-react";

import Error from "../Error";
import RailsApi from "../RailsApi";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      newUser: true,
      loginError: false
    };
  }

  changeUserState = () => {
    this.setState({
      newUser: !this.state.newUser
    });
  };

  handleEmail = e => {
    e.preventDefault();
    this.setState({
      email: e.target.value
    });
  };

  handlePassword = e => {
    e.preventDefault();
    this.setState({
      password: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    if (this.state.email && this.state.password) {
      this.setState(
        {
          loginError: false
        },
        () => {
          this.state.newUser ? this.createUser() : this.loginUser();
        }
      );
    }
  };

  loginUser = () => {
    RailsApi.login({
      auth: { email: this.state.email, password: this.state.password }
    }).then(res => {
      localStorage.setItem("token", res.jwt);
      RailsApi.getUser().then(json => this.props.setUser(json));
    });
  };

  createUser = () => {
    RailsApi.addUser({
      user: {
        email: this.state.email,
        password: this.state.password
      }
    }).then(res => {
      if (res.status === 202) {
        this.loginUser();
      } else {
        this.setState({
          loginError: true
        });
      }
    });
  };

  render() {
    return (
      <Segment>
        <Header as="h1">
          {this.state.newUser ? "Create New Account" : "Sign In"}
        </Header>
        <Form onSubmit={this.handleSubmit}>
          {this.state.error ? (
            <Error message={"Email is taken, please try again"} color={"red"} />
          ) : null}
          <Form.Field>
            <label>Email</label>
            <input
              placeholder="Email"
              value={this.state.email}
              onChange={this.handleEmail}
            />
          </Form.Field>
          <Form.Field>
            <label>Password</label>
            <input
              placeholder="Password"
              type="password"
              value={this.state.password}
              onChange={this.handlePassword}
            />
          </Form.Field>
          <Button primary fluid type="submit">
            {this.state.newUser ? "Register" : "Login"}
          </Button>
        </Form>
        <Divider horizontal />
        <Divider horizontal>
          {this.state.newUser ? "Current User?" : "New User?"}
        </Divider>
        <Button secondary fluid onClick={this.changeUserState}>
          {this.state.newUser ? "Sign In" : "Sign Up"}
        </Button>
      </Segment>
    );
  }
}

export default Login;
