import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { signUpRequest, clearError } from '../../../store/actions/user';
import SignUp from './SignUp';
import { MAIN, LOGIN } from '../../../routes';
import { getAuthState, getUserFetchingState, getUserError } from '../../../store/selectors';

class SignUpContainer extends Component {
  static propTypes = {
    handleSignUp: PropTypes.func.isRequired,
    isAuth: PropTypes.bool.isRequired,
    error: PropTypes.string.isRequired,
    isFetching: PropTypes.bool.isRequired,
    clearErrorMessage: PropTypes.func.isRequired,
  };

  componentDidMount() {
    const { clearErrorMessage } = this.props;
    clearErrorMessage();
  }

  handleClick = (ev, email, password) => {
    ev.preventDefault();
    const { handleSignUp } = this.props;

    handleSignUp(email, password);
  };

  render() {
    const { isAuth, error, isFetching } = this.props;

    if (isAuth) {
      return <Redirect to={MAIN} />;
    }

    return (
      <SignUp
        error={error}
        handleClick={this.handleClick}
        buttonText="Sign Up"
        linkTo={LOGIN}
        linkText="Sign In"
        isFetching={isFetching}
      />
    );
  }
}

const mapStateToProps = store => ({
  isAuth: getAuthState(store),
  isFetching: getUserFetchingState(store),
  error: getUserError(store),
});

const mapDispatchToState = dispatch => ({
  handleSignUp: (email, password) => (
    dispatch(signUpRequest(email, password))
  ),
  clearErrorMessage: () => (
    dispatch(clearError())
  ),
});

export default connect(mapStateToProps, mapDispatchToState)(SignUpContainer);
