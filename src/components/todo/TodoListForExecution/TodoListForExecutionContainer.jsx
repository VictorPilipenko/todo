import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { getTodoListFullRequest } from '../../../store/actions/todo';
import TodoListForExecution from './TodoListForExecution';
import {
  getFilterState,
  getAuthState,
  getTodoFetchingState,
} from '../../../store/selectors';

class TodoListForExecutionContainer extends Component {
  static propTypes = {
    isAuth: PropTypes.bool.isRequired,
    getTodoList: PropTypes.func.isRequired,
    isFetching: PropTypes.bool.isRequired,
    currentFilter: PropTypes.string.isRequired,
  };

  componentDidMount() {
    const { getTodoList } = this.props;
    getTodoList();
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
      <TodoListForExecution
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
    todoList: store.todo.listFull,
    currentFilter: getFilterState(store),
  }
}

const mapDispatchToState = dispatch => ({
  getTodoList: () => (
    dispatch(getTodoListFullRequest())
  ),
});

export default connect(mapStateToProps, mapDispatchToState)(TodoListForExecutionContainer);
