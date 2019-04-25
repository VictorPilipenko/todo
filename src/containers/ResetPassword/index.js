import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { compose } from "recompose";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

//components
import SignUpLink from "../../components/SignUpLink";

//utils
import "./ResetPassword.css";
import { resetPassword } from "./actions";

const updateByPropertyName = (propertyName, value) => () => ({
  [propertyName]: value
});

const INITIAL_STATE = {
  email: "",
  error: null
};

class ResetPassword extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { email } = this.state;
    this.props.onResetPassword(email);
    this.setState(() => ({ ...INITIAL_STATE }));
    event.preventDefault();
  };

  render() {
    const { email } = this.state;
    const isInvalid = email === "";
    return (
      <div className="ResetPassword">
        <Paper elevation={4} className="paper">
          <form onSubmit={this.onSubmit}>
            <Typography variant="headline" component="h1">
              Reset your password
            </Typography>
            <div>
              <TextField
                label="Email Address"
                className="textField"
                margin="normal"
                value={this.state.email}
                onChange={event =>
                  this.setState(
                    updateByPropertyName("email", event.target.value)
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
                Reset my password
              </Button>
            </div>
            <div className="error">
              {this.props.error && <p>{this.props.error.message}</p>}
            </div>
          </form>
        </Paper>
        <SignUpLink />
      </div>
    );
  }
}
ResetPassword.propTypes = {
  onResetPassword: PropTypes.func
};

const mapDispatchToProps = dispatch => ({
  onResetPassword: email => dispatch(resetPassword(email))
});

const mapStateToProps = state => ({
  authUser: state.app.authUser,
  error: state.resetPassword.err
});

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(ResetPassword);
