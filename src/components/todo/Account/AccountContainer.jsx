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
import { getTodoListFullRequest } from '../../../store/actions/todo';

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
    this.props.getTodoListFull();
  }

  // componentDidUpdate = prevProps => {
  //   console.log(prevProps)
  //   console.log(this.props)
  //   // if (prevProps.location.pathname !== this.props.location.pathname) {
  //   //   this.props.getTodoList(localStorage.getItem('uid')); 
  //   // }
  //   // this.props.todoList = [];

  //   const { getTodoList } = this.props;
  //   getTodoList(localStorage.getItem('uid'));
  //   this.props.getTodoListFull();
  // }

  render() {
    const {
      isAuth,
      todoList,
      isFetching,
      currentFilter,
      todoListFull
    } = this.props;

    if (!isAuth) {
      return <Redirect to="/login" />;
    }

    console.log(todoList)

    return (
      <Account
        todoList={todoList}
        isFetching={isFetching}
        currentFilter={currentFilter}
        todoListFull={todoListFull && Object.keys(todoListFull)}
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
    todoListFull: store.todo.listFull,
  }
}

const mapDispatchToState = dispatch => ({
  getTodoList: uid => (
    dispatch(getTodoListRequest(uid))
  ),
  getTodoListFull: () => (
    dispatch(getTodoListFullRequest())
  ),
});

export default connect(mapStateToProps, mapDispatchToState)(AccountContainer);
