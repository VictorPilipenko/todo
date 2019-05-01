import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { getTodoListRequest } from '../../../store/actions/todo';
import Account from './Account';
import {
  getFilteredTodoList,
  getFilterState,
  getAuthState,
  getTodoFetchingState,
} from '../../../store/selectors';

class AccountContainer extends Component {
  static propTypes = {
    isAuth: PropTypes.bool.isRequired,
    getTodoList: PropTypes.func.isRequired,
    todoList: PropTypes.arrayOf(PropTypes.object).isRequired,
    isFetching: PropTypes.bool.isRequired,
    currentFilter: PropTypes.string.isRequired,
  };

  componentDidMount = () => {
    const { getTodoList } = this.props;
    getTodoList(localStorage.getItem('uid'));
  }

  componentDidUpdate = prevProps => {
    console.log(prevProps.location.pathname)
    console.log(this.props.location.pathname)
    if (prevProps.location.pathname !== this.props.location.pathname) {
      this.props.getTodoList(localStorage.getItem('uid')); 
    }
  }

  render() {
    const {
      isAuth,
      todoList,
      isFetching,
      currentFilter,
    } = this.props;

    if (!isAuth) {
      return <Redirect to="/login" />;
    }

    return (
      <Account
        todoList={todoList}
        isFetching={isFetching}
        currentFilter={currentFilter}
      />
    );
  }
}

const mapStateToProps = store => {
  console.log(store)
  return {
    isAuth: getAuthState(store),
    isFetching: getTodoFetchingState(store),
    todoList: getFilteredTodoList(store),
    currentFilter: getFilterState(store),
  }
}

const mapDispatchToState = dispatch => ({
  getTodoList: uid => (
    dispatch(getTodoListRequest(uid))
  ),
});

export default connect(mapStateToProps, mapDispatchToState)(AccountContainer);
