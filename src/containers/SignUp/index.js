import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { compose } from "recompose";
import { withRouter } from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

//default
import { createUser } from "./actions";

//utils
import * as routes from "../../utils/routes";
import "./SignUp.css";

const updateByPropertyName = (propertyName, value) => () => ({
  [propertyName]: value
});

const INITIAL_STATE = {
  username: "",
  email: "",
  passwordOne: "",
  passwordTwo: "",
  error: null
};

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.authUser !== null) {
      nextProps.history.push(routes.HOME);
    }
  }

  onSubmit = event => {
    const { username, email, passwordOne } = this.state;
    this.props.onCreateUser(email, username, passwordOne);
    event.preventDefault();
  };

  render() {
    const { username, email, passwordOne, passwordTwo, error } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === "" ||
      username === "" ||
      email === "";

    return (
      <div className="SignUp">
        <Paper elevation={4} className="paper">
          <form onSubmit={this.onSubmit}>
            <div>
              <Typography variant="headline" component="h1">
                Create new account
              </Typography>
            </div>
            <div>
              <TextField
                id="username"
                label="Username"
                className="textField"
                margin="normal"
                value={username}
                onChange={event =>
                  this.setState(
                    updateByPropertyName("username", event.target.value)
                  )
                }
              />
            </div>
            <div>
              <TextField
                id="email"
                label="Email Address"
                className="textField"
                margin="normal"
                value={email}
                onChange={event =>
                  this.setState(
                    updateByPropertyName("email", event.target.value)
                  )
                }
              />
            </div>
            <div>
              <TextField
                id="passwordOne"
                label="Password"
                type="password"
                className="textField"
                autoComplete="current-password"
                margin="normal"
                value={passwordOne}
                onChange={event =>
                  this.setState(
                    updateByPropertyName("passwordOne", event.target.value)
                  )
                }
              />
            </div>
            <div>
              <TextField
                id="passwordtwo"
                label="Password"
                type="password"
                className="textField"
                autoComplete="current-password"
                margin="normal"
                value={passwordTwo}
                onChange={event =>
                  this.setState(
                    updateByPropertyName("passwordTwo", event.target.value)
                  )
                }
              />
            </div>
            <div>
              <br />
              <Button
                variant="raised"
                color="default"
                size="large"
                disabled={isInvalid}
                className="submit"
                type="submit"
              >
                Sign Up
              </Button>
            </div>
            <div className="error">{error && error.message}</div>
          </form>
        </Paper>
      </div>
    );
  }
}
SignUp.propTypes = {
  onCreateUser: PropTypes.func
};

const mapStateToProps = state => ({
  authUser: state.app.authUser
});

const mapDispatchToProps = dispatch => ({
  onCreateUser: (email, username, password) =>
    dispatch(createUser(email, username, password))
});

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(SignUp);
