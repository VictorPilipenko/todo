import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { Redirect } from "react-router";
import { connect } from "react-redux";
import { compose } from "recompose";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

//components
import SignUpLink from "../../components/SignUpLink";
import PasswordForgetLink from "../../components/PasswordForgetLink";
import SocialLogin from "../../components/SocialLogin";

//default
import {
  signIn,
  signInWithGoogle,
  signInWithFacebook,
  signInWithTwitter,
  resetState
} from "./actions";

//utils
import { isUserLogin } from "../../utils/webhelper";
import * as routes from "../../utils/routes";
import firebaseLog from "../../assets/firebase.svg";
import "./SignIn.css";

const INITIAL_STATE = {
  email: "",
  password: "",
  error: null
};

const updateByPropertyName = (propertyName, value) => () => ({
  [propertyName]: value
});

class SignInPage extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  componentWillUnmount() {
    this.props.onResetState();
  }

  doSignInWithEmailAndPassword = event => {
    const { email, password } = this.state;
    this.props.onSignIn(email, password);
    event.preventDefault();
  };

  render() {
    if (isUserLogin()) {
      return <Redirect to={routes.HOME} />;
    }

    const { email, password } = this.state;
    const isInvalid = password === "" || email === "";
    return (
      <div className="SignIn">
        <Paper elevation={4} className="paper">
          <form onSubmit={this.doSignInWithEmailAndPassword}>
            <img src={firebaseLog} alt="" width="100" height="100" />
            <Typography variant="headline" component="h1">
              Please sign in
            </Typography>
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
                id="password"
                label="Password"
                type="password"
                className="textField"
                autoComplete="current-password"
                margin="normal"
                value={password}
                onChange={event =>
                  this.setState(
                    updateByPropertyName("password", event.target.value)
                  )
                }
              />
            </div>
            <div>
              <SocialLogin
                signInWithGoogle={this.props.onSignInWithGoogle}
                signInWithFacebook={this.props.onSignInWithFacebook}
                signInWithTwitter={this.props.onSignInWithTwitter}
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
                Sign in
              </Button>
            </div>
            <div className="error">
              {this.props.error && this.props.error.message}
            </div>
          </form>
        </Paper>
        <PasswordForgetLink />
        <SignUpLink />
      </div>
    );
  }
}

SignInPage.propTypes = {
  onSignIn: PropTypes.func,
  onSignInWithGoogle: PropTypes.func,
  onSignInWithFacebook: PropTypes.func,
  onSignInWithTwitter: PropTypes.func,
  authUser: PropTypes.object,
  err: PropTypes.object,
  onResetState: PropTypes.func
};

const mapStateToProps = state => ({
  authUser: state.app.authUser,
  error: state.signIn.err
});

const mapDispatchToProps = dispatch => ({
  onSignIn: (email, password) => dispatch(signIn(email, password)),
  onSignInWithGoogle: () => dispatch(signInWithGoogle()),
  onSignInWithFacebook: () => dispatch(signInWithFacebook()),
  onSignInWithTwitter: () => dispatch(signInWithTwitter()),
  onResetState: () => dispatch(resetState())
});

export default compose(
  withRouter,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(SignInPage);
