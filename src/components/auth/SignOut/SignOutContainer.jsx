import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { signOut } from '../../../store/actions/user';
import { setTodoListFilter } from '../../../store/actions/todo';
import { ALL } from '../../../store/constants/filterTypes';
import SignOut from './SignOut';

class SignOutContainer extends Component {
  static propTypes = {
    handleSignOut: PropTypes.func.isRequired,
  };

  handleClick = (ev) => {
    ev.preventDefault();
    const { handleSignOut } = this.props;

    handleSignOut();
  };

  render() {
    return (
      <SignOut
        handleClick={this.handleClick}
      />
    );
  }
}

const mapDispatchToProps = dispatch => ({
  handleSignOut: () => {
    dispatch(signOut());
    dispatch(setTodoListFilter(ALL));
  },
});

export default connect(null, mapDispatchToProps)(SignOutContainer);
