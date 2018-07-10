import React from "react";
import { Button, Checkbox, Form, Grid, Header } from "semantic-ui-react";
import RailsApi from "../RailsApi";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
  }

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

  login = e => {
    e.preventDefault();
    if (this.props.newUser) {
      console.log("register", this.state);
      RailsApi.addUser({
        email: this.state.email,
        password: this.state.password
      }).then(res => console.log(res));
    } else {
      console.log("login", this.state);
      RailsApi.login({
        auth: { email: this.state.email, password: this.state.password }
      }).then(res => {
        console.log(res);
        localStorage.setItem("token", res.jwt);
      });
    }
  };

  render() {
    return (
      <Form onSubmit={this.login}>
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
          {this.props.newUser ? "Register" : "Login"}
        </Button>
      </Form>
    );
  }
}

export default Login;
